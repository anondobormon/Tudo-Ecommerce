import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import StorageIcon from "@mui/icons-material/Storage";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  createProduct,
  getAllCategory,
} from "../../actions/productAction";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
import Loader from "../Layout/Loader/Loader";
import MetaData from "../Layout/MetaData";
import Navbar from "./Navbar";
import "./NewProduct.scss";
import Sidebar from "./Sidebar";

const NewProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, success } = useSelector((state) => state.newProduct);
  const { error: categoryError, category } = useSelector(
    (state) => state.getCategory
  );

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [categoryTitle, setCategoryTitle] = useState("");
  const [categorySubTitle, setCategorySubTitle] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);

  useEffect(() => {
    if (error) {
      alert.error(error.message);
      dispatch(clearError());
    }
    if (success) {
      alert.success("Product Created Successfully");
      setImages([]);
      setImagePreview([]);
      setName("");
      setPrice(0);
      setStock(0);
      setDescription("");
      setCategoryTitle("");
      setCategorySubTitle("");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
    if (categoryError) {
      alert.error(error.message);
      dispatch(clearError());
    }
    dispatch(getAllCategory());
  }, [dispatch, error, alert, success, categoryError]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", categoryTitle);
    myForm.set("subCategory", categorySubTitle);
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
        if (reader.readyState === 2) {
          setImagePreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  let subCategory;
  if (categoryTitle) {
    subCategory =
      category && category.find((item) => item.title === categoryTitle);
  }

  const handleText = (e, editor) => {
    setDescription(editor.getData());
  };

  return (
    <div>
      <MetaData title="New Product" />
      <div className="newProduct">
        <Sidebar />
        <div className="newProductContainer">
          {loading && <Loader />}
          <Navbar />

          <form
            action="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <div className="left">
              <h2>Create Product</h2>
              <div className="items">
                <label htmlFor="pdName">Product Name</label>
                <div className="item">
                  <SpellcheckIcon />
                  <input
                    type="text"
                    placeholder="Product Name"
                    required
                    id="pdName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className="items">
                <label htmlFor="price">Price Name</label>
                <div className="item">
                  <AttachMoneyIcon />
                  <input
                    type="number"
                    placeholder="Price"
                    required
                    id="price"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>

              <div className="items">
                <label htmlFor="des">Description</label>
                <div className="item">
                  <CKEditor editor={ClassicEditor} onChange={handleText} />
                </div>
              </div>

              <div className="items">
                <label htmlFor="category">Categories</label>
                <div className="item">
                  <AccountTreeIcon />
                  <select
                    name=""
                    id="category"
                    onChange={(e) => setCategoryTitle(e.target.value)}
                  >
                    <option value="">Chose Category</option>
                    {category &&
                      category.map((cate) => (
                        <option key={cate.title} value={cate.title}>
                          {" "}
                          {cate.title}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              {subCategory && (
                <div className="items">
                  <label htmlFor="category">Categories Subtitle</label>
                  <div className="item">
                    <AccountTreeIcon />
                    <select
                      name=""
                      id="category"
                      onChange={(e) => setCategorySubTitle(e.target.value)}
                    >
                      <option value="">Chose Category Subtitle</option>
                      {subCategory &&
                        subCategory.subTitle.map((cate) => (
                          <option key={cate.letTitle} value={cate.letTitle}>
                            {" "}
                            {cate.letTitle}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              )}

              <div className="items">
                <label htmlFor="stock">Stocks</label>
                <div className="item">
                  <StorageIcon />
                  <input
                    type="number"
                    name=""
                    id="stock"
                    placeholder="Stock"
                    onChange={(e) => setStock(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="right">
              <div id="createProductFormFile">
                <label htmlFor="file">
                  <img src="https://i.ibb.co/YWyNVJX/up.png" alt="" />
                  <span>Upload</span>
                </label>
                <input
                  type="file"
                  required
                  name="avatar"
                  onChange={createProductImagesChange}
                  multiple
                  id="file"
                  accept="image/*"
                />
              </div>
              <div id="createProductFormImage">
                {imagePreview.map((image, index) => (
                  <div className="preview">
                    <img key={index} src={image} alt="Avatar Preview" />
                  </div>
                ))}
              </div>

              <Button
                id="createProductBtn"
                type="submit"
                disabled={
                  loading
                    ? true
                    : false || categoryTitle === ""
                    ? true
                    : false || categorySubTitle === ""
                    ? true
                    : false
                }
              >
                Create
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
