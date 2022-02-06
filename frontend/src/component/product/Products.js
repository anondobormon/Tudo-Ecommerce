import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
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
import "./Product.css";

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
  const [price, setPrice] = useState([0, 3000]);
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
    console.log(category);
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
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          <div className="filterBox">
            <Box>
              <Typography variant="subtitle1" gutterBottom component="div">
                Price
              </Typography>
              <Slider
                value={price}
                onChange={priceHandler}
                valueLabelDisplay="auto"
                min={0}
                max={3000}
              />
            </Box>
            <Box>
              <Typography variant="subtitle1" gutterBottom component="div">
                Category
              </Typography>
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

          {resultPerPage < productsCount && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
          <Footer />
        </div>
      )}
    </>
  );
}

export default Products;
