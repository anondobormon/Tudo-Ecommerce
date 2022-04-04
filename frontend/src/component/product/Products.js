import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearError, getProduct } from "../../actions/productAction";
import ProductCard from "../Home/ProductCard";
import Footer from "../Layout/Header/Footer";
import Header from "../Layout/Header/Header";
import Loader from "../Layout/Loader/Loader";
import MetaData from "../Layout/MetaData";
import SubHeader from "../Layout/SubHeader/SubHeader";
import "./Product.scss";
import Search from "./Search";

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhone",
];

function Products() {
  const dispatch = useDispatch();
  const { keyword } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 30000]);
  const [category, setCategory] = useState("");
  const alert = useAlert();

  const { products, loading, productsCount, resultPerPage, error } =
    useSelector((state) => state.products);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    dispatch(getProduct(keyword, currentPage, price, category));
  }, [dispatch, keyword, currentPage, price, category, alert, error]);

  //Filter out with price
  const priceHandler = (event, newValue) => {
    setPrice(newValue);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <MetaData title="PRODUCTS -- TUDO STORE" />
          <Header />
          <SubHeader />
          <Container>
            <div className="productHeader">
              <h2 className="productsHeading">All Products</h2>
              <div className="search">
                <Search />
              </div>
            </div>

            <div className="products">
              <div className="filterBox">
                <Box className="cateBox">
                  <h2 className="cateTitle">Filter Products by</h2>
                </Box>
                <Box className="box">
                  <h2 className="title">Price</h2>
                  <Slider
                    value={price}
                    onChange={priceHandler}
                    valueLabelDisplay="auto"
                    min={0}
                    max={3000}
                  />
                </Box>
                <Box className="box">
                  <h2 className="title">Category</h2>
                  <ul className="categoryBox">
                    {categories.map((category) => (
                      <li
                        className="category_link"
                        key={category}
                        onClick={() => setCategory(category)}
                      >
                        {category}
                      </li>
                    ))}
                  </ul>
                </Box>
              </div>
              <div className="product">
                {products &&
                  products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
              </div>
            </div>
            <hr />
            {resultPerPage < productsCount && (
              <div className="paginationBox">
                <p className="qty">Product Showing 08 out of 120</p>
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={resultPerPage}
                  totalItemsCount={productsCount}
                  onChange={setCurrentPageNo}
                  nextPageText={<ChevronRightIcon className="icon" />}
                  prevPageText={<ChevronLeftIcon className="icon" />}
                  firstPageText={
                    <KeyboardDoubleArrowLeftIcon className="icon" />
                  }
                  lastPageText={
                    <KeyboardDoubleArrowRightIcon className="icon" />
                  }
                  itemClass="page-item"
                  linkClass="page-link"
                  activeClass="pageItemActive"
                  activeLinkClass="pageLinkActive"
                />
              </div>
            )}
          </Container>
          <Footer />
        </div>
      )}
    </>
  );
}

export default Products;
