const Product = require("../models/productModel");
const Category = require("../models/categoryModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");

//Create Product -- ADMIN
exports.creatProduct = catchAsyncErrors(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];
  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });
    imagesLinks.push({ public_id: result.public_id, url: result.secure_url });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const product = await Product.create(req.body);
  res.status(200).json({
    success: true,
    product,
  });
});

//GET ALL PRODUCTS
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 9;
  const productCount = await Product.countDocuments();
  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

  const product = await apiFeatures.query;
  res.status(200).json({
    success: true,
    product,
    productCount,
    resultPerPage,
  });
});

//GET ALL PRODUCTS (Admin)
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});

//GET PRODUCT DETAILS
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found!", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});

//UPDATE PRODUCT -- ADMIN
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  console.log(req.params.id, req.body);
  let product = Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found!", 404));
  }

  // Images Start Here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary

    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
});

//DELETE PRODUCT -- ADMIN -

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found!", 404));
  }

  //Deleting coludinary product
  for (let i = 0; i < product.images.length; i++) {
    const result = await cloudinary.v2.uploader.destroy(
      product.images[i].public_id
    );
  }

  await product.remove();
  res.status(200).json({
    success: true,
    message: "Product deleted successfully!",
  });
});

// Create New Review or Update the review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get All Reviews of a product
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete Review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});

//Create Category
exports.createCategory = catchAsyncErrors(async (req, res, next) => {
  let allCategories = await Category.find();

  const isCategory = allCategories.find(
    (rev) => rev.title.toString() === req.body.title.toString()
  );

  let subTitle =
    isCategory &&
    isCategory.subTitle.find(
      (title) => title.letTitle.toString() === req.body.subTitle[0].letTitle
    );

  if (!isCategory) {
    req.body.user = req.user.id;

    await Category.create(req.body);
    res.status(200).json({
      success: true,
    });
  }

  if (isCategory && !subTitle) {
    isCategory.subTitle.push(req.body.subTitle[0]);
    await isCategory.save({
      validateBeforeSave: false,
    });

    res.status(200).json({
      success: true,
    });
  } else {
    return next(new ErrorHandler("Category Already Exists", 404));
  }
});

//Delete Category
exports.deleteCategory = catchAsyncErrors(async (req, res, next) => {
  let categories = await Category.findById(req.body.id);

  if (!categories) {
    return next(new ErrorHandler("Category not found", 404));
  }
  if (categories && req.body.subId) {
    let title = await categories.subTitle.find(
      (cate) => cate._id.toString() === req.body.subId
    );

    if (!title) {
      return next(new ErrorHandler("Category not found", 404));
    }

    let sub = await categories.subTitle.filter(
      (cate) => cate._id.toString() !== req.body.subId
    );

    if (sub) {
      const result = await Category.findByIdAndUpdate(
        req.body.id,
        {
          subTitle: sub,
        },
        {
          new: true,
          runValidators: true,
          useFindAndModify: false,
        }
      );

      res.status(200).json({
        success: true,
        result,
      });
    }
  }
  if (categories && !req.body.subId) {
    const result = await categories.remove();
    res.status(200).json({
      success: true,
      result,
    });
  } else {
    return next(new ErrorHandler("Category not found", 404));
  }
});

//Get Category list

exports.getCategory = catchAsyncErrors(async (req, res, next) => {
  const categories = await Category.find();

  if (!categories) {
    return next(new ErrorHandler("Category not found", 404));
  }
  res.status(200).json({
    success: true,
    categories,
  });
});

//Get single Category
exports.getSingleCategory = catchAsyncErrors(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new ErrorHandler("Category not found", 404));
  }
  res.status(200).json({
    success: true,
    category,
  });
});
