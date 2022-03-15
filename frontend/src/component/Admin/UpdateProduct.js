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
import MetaData from "../Layout/MetaData";
import "./NewProduct.css";
import Sidebar from "./Sidebar";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const params = useParams();

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);
  console.log(updateError);
  const { error, product } = useSelector((state) => state.productDetails);

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
    <div>
      <MetaData title="Update Product" />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          <form
            action="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateProductHandler}
          >
            <h2>Create Product</h2>
            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <DescriptionIcon />
              <textarea
                name=""
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="10"
              ></textarea>
            </div>

            <div>
              <AccountTreeIcon />
              <select
                name=""
                id=""
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

            <div>
              <StorageIcon />
              <input
                type="number"
                value={stock}
                placeholder="Stock"
                onChange={(e) => setStock(e.target.value)}
                required
              />
            </div>
            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                onChange={updateProductImageChange}
                multiple
                accept="image/*"
              />
            </div>
            <div id="createProductFormImage">
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Product Preview" />
                ))}
            </div>
            <div id="createProductFormImage">
              {imagePreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
