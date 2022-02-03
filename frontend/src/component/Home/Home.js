import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../actions/productAction";
import Footer from "../Layout/Header/Footer";
import Header from "../Layout/Header/Header";
import Loader from "../Layout/Loader/Loader";
import MetaData from "../Layout/MetaData";
import "./Home.css";
import Product from "./Product.js";

function Home() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products, productCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }

    dispatch(getProduct());
  }, [dispatch, error, alert]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <MetaData title="TUDO STORE" />
          <Header />
          <div className="banner">
            <p>Welcome to TUDO Store.</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>
            <a href="#container">
              <button>Scroll</button>
            </a>
          </div>

          <h2 className="featuredHeading">Featured Products</h2>

          <div className="container" id="container">
            {products && products?.map((p) => <Product key={p} product={p} />)}
          </div>

          <Footer />
        </div>
      )}
    </>
  );
}

export default Home;
