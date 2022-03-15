import AccountTreeIcon from "@mui/icons-material/AccountTree";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DescriptionIcon from "@mui/icons-material/Description";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import StorageIcon from "@mui/icons-material/Storage";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearError, createProduct } from "../../actions/productAction";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
import MetaData from "../Layout/MetaData";
import "./NewProduct.css";
import Sidebar from "./Sidebar";

const NewProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, success } = useSelector((state) => state.newProduct);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
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
    if (error) {
      console.log(error);
      alert.error(error.message);
      dispatch(clearError());
    }
    if (success) {
      alert.success("Product Created Successfully");
      setImages([]);
      setImagePreview([]);
      setName("");
      setPrice(0);
      setCategory("");
      setStock(0);
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, error, alert, success]);

  const createProductSubmitHandler = (e) => {
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

    dispatch(createProduct(myForm));
  };
  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagePreview([]);

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
      <MetaData title="New Product" />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          <form
            action="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
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
                name=""
                id=""
                placeholder="Stock"
                onChange={(e) => setStock(e.target.value)}
                required
              />
            </div>
            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                onChange={createProductImagesChange}
                multiple
                accept="image/*"
              />
            </div>
            <div id="createProductFormImage">
              {imagePreview.map((image, index) => (
                <img key={index} src={image} alt="Avatar Preview" />
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

export default NewProduct;
