const express = require("express");
const {
  getAllProducts,
  creatProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getAdminProducts,
  getProductReviews,
  deleteReview,
  deleteCategory,
  createCategory,
  getSingleCategory,
  getCategory,
} = require("../controllers/productController");
const { updateUserRole, deleteUser } = require("../controllers/userController");
const { isAuthenticatedUser, authorizedRole } = require("../middleware/auth");

const router = express.Router();

//GET ALL PRODUCTS
router.route("/products").get(getAllProducts);

router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizedRole("admin"), getAdminProducts);

//GET A PRODUCT DETAILS
router.route("/product/:id").get(getProductDetails);

//CREATE A NEW PRODUCT -- ADMIN
router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authorizedRole("admin"), creatProduct);

//UPDATE A PRODUCT -- ADMIN
router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizedRole("admin"), updateProduct);

//DELETE A PRODUCT -- ADMIN
router
  .route("/admin/product/:id")
  .delete(isAuthenticatedUser, authorizedRole("admin"), deleteProduct);

//Review
router.route("/review").put(isAuthenticatedUser, createProductReview);

router
  .route("/admin/reviews")
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteReview);

//Create category
router
  .route("/admin/category/new")
  .post(isAuthenticatedUser, authorizedRole("admin"), createCategory);

//Get category
router
  .route("/admin/category")
  .get(isAuthenticatedUser, authorizedRole("admin"), getCategory);
//Get single category
router
  .route("/admin/category/:id")
  .get(isAuthenticatedUser, authorizedRole("admin"), getSingleCategory);

//Delete category
router
  .route("/admin/category/delete")
  .delete(isAuthenticatedUser, authorizedRole("admin"), deleteCategory);

module.exports = router;
