import AccountTreeIcon from "@mui/icons-material/AccountTree";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DescriptionIcon from "@mui/icons-material/Description";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import StorageIcon from "@mui/icons-material/Storage";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  clearError,
  getProductDetails,
  updateProduct,
} from "../../actions/productAction";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";
import Loader from "../Layout/Loader/Loader";
import MetaData from "../Layout/MetaData";
import Navbar from "./Navbar";
import "./NewProduct.scss";
import Sidebar from "./Sidebar";
import "./UpdateProduct.scss";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const params = useParams();

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);
  const {
    error,
    product,
    loading: productLoading,
  } = useSelector((state) => state.productDetails);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Articles",
    "Camera",
    "SmartPhones",
  ];

  useEffect(() => {
    if (product && product._id !== params.id) {
      dispatch(getProductDetails(params.id));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.stock);
      setOldImages(product.images);
    }

    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearError());
    }
    if (isUpdated) {
      alert.success("Product Updated Successfully");

      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [
    dispatch,
    error,
    alert,
    params,
    isUpdated,
    params.id,
    product,
    updateError,
  ]);

  const updateProductHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("stock", stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });

    dispatch(updateProduct(params.id, myForm));
  };
  const updateProductImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagePreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState == 2) {
          setImagePreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      {productLoading ? (
        <Loader />
      ) : (
        <div>
          <MetaData title="Update Product" />
          <div className="updateProduct">
            <Sidebar />
            <div className="createProductContainer">
              <Navbar />
              <form
                action="createProductForm"
                encType="multipart/form-data"
                onSubmit={updateProductHandler}
              >
                <div className="left">
                  <div className="items">
                    <h2>Create Product</h2>
                    <label htmlFor="pdname">Product Name</label>
                    <div className="item">
                      <SpellcheckIcon />
                      <input
                        type="text"
                        placeholder="Product Name"
                        required
                        id="pdname"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="items">
                    <label htmlFor="price">Product Price</label>
                    <div className="item">
                      <AttachMoneyIcon />
                      <input
                        type="number"
                        placeholder="Price"
                        required
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="items">
                    <label htmlFor="des">Product Description</label>
                    <div className="item des">
                      <DescriptionIcon />
                      <textarea
                        name=""
                        placeholder="Product Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        cols="30"
                        rows="10"
                        id="des"
                      ></textarea>
                    </div>
                  </div>

                  <div className="items">
                    <label htmlFor="cate">Product Category</label>
                    <div className="item">
                      <AccountTreeIcon />
                      <select
                        name=""
                        id="cate"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option value="">Chose Category</option>
                        {categories.map((cate) => (
                          <option key={cate} value={cate}>
                            {" "}
                            {cate}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="items">
                    <label htmlFor="st">Stocked Product</label>
                    <div className="item">
                      <StorageIcon />
                      <input
                        type="number"
                        value={stock}
                        id="st"
                        placeholder="Stock"
                        onChange={(e) => setStock(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="right">
                  <div id="updateProductFormFile">
                    <label htmlFor="file">
                      <img src="https://i.ibb.co/YWyNVJX/up.png" alt="" />
                      <span>Upload</span>
                    </label>
                    <input
                      type="file"
                      name="avatar"
                      onChange={updateProductImageChange}
                      multiple
                      accept="image/*"
                      id="file"
                    />
                  </div>
                  <div className="updateProductFormImage">
                    {oldImages &&
                      oldImages.map((image, index) => (
                        <div className="preview">
                          <img
                            key={index}
                            src={image.url}
                            alt="Old Product Preview"
                          />
                        </div>
                      ))}
                  </div>
                  <div className="updateProductFormImage">
                    {imagePreview.map((image, index) => (
                      <div className="preview">
                        <img key={index} src={image} alt="Product Preview" />
                      </div>
                    ))}
                  </div>

                  <Button
                    id="updateProductBtn"
                    type="submit"
                    disabled={loading ? true : false}
                  >
                    Create
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateProduct;
