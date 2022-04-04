import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { Container } from "@mui/material";
import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import Carousel from "react-material-ui-carousel";
import { useDispatch, useSelector } from "react-redux";
import { clearError, getProduct } from "../../actions/productAction";
import Footer from "../Layout/Header/Footer";
import Header from "../Layout/Header/Header";
import Loader from "../Layout/Loader/Loader";
import MetaData from "../Layout/MetaData";
import Testimonial from "../Testimonial/Testimonial";
import Categories from "./Categories";
import "./Home.scss";
import Offer from "./Offer.js";
import Product from "./ProductCard.js";
import Services from "./Services.js";

function Home() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products, productCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    dispatch(getProduct());
  }, [dispatch, error, alert]);

  const carouselImage = [
    {
      id: 1,
      url: "https://i.ibb.co/YQ767yH/header1.png",
      title: "Don't miss amazing",
      title2: " Grocery deals",
      info: "Sign up and get  80% Discount",
    },
    {
      id: 2,
      url: "https://i.ibb.co/RGKm6Qs/header.png",
      title: "Fresh Vegetables",
      title2: " Big Discount",
      info: "Save up to 50% off on your first order",
    },
  ];

  window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="home">
          <MetaData title="TUDO STORE" />
          <Header />

          {/* Header Carousel */}
          <div className="headerCarousel">
            <Carousel>
              {carouselImage &&
                carouselImage.map((item, i) => (
                  <div className="caroHeader">
                    <Container maxwidth="lg">
                      <div className="content">
                        <h2>{item.title}</h2>
                        <h2>{item.title2}</h2>
                        <h4>{item.info}</h4>
                        <div className="subscribe">
                          <div>
                            <RocketLaunchIcon className="icon" />
                            <input
                              type="email"
                              name="email"
                              id="email"
                              placeholder="Your email address"
                            />
                          </div>
                          <button>Subscribe</button>
                        </div>
                      </div>
                    </Container>

                    <img
                      className="CarouselImage"
                      key={item.id}
                      src={item.url}
                      alt={`${i}Slide`}
                    />
                  </div>
                ))}
            </Carousel>
          </div>

          <Container maxwidth="xl">
            <h2 className="featuredHeading">Our Featured Products</h2>
            <p>Browse The Collection of Top Products</p>

            <div className="products" id="container">
              {products &&
                products?.map((p) => <Product key={p} product={p} />)}
            </div>
          </Container>

          <Container maxwidth="xl">
            <h2 className="featuredHeading">Mens Most New Collection</h2>
            <p>Browse The Mens Collection</p>
            <div className="newCollection">
              <div className="left">
                <div className="new">
                  <h4>New Arrival</h4>
                  <h5>Men's</h5>
                  <h6>Sports Shoe's</h6>
                  <p>30% Discount</p>
                  <button>Order Now</button>
                </div>
              </div>
              <div className="right">
                <div className="new">
                  <h4>New Trending</h4>
                  <h5>Smart</h5>
                  <h6>Watches</h6>
                  <p>20% Discount</p>
                  <button>Order Now</button>
                </div>
              </div>
            </div>
          </Container>
          {/* Categories */}
          <Categories />
          {/* Services */}
          <Services />

          {/* Offer */}
          <Offer />
          {/* Testimonial */}
          <Testimonial />
          {/* Testimonial */}

          <Footer />
        </div>
      )}
    </>
  );
}

export default Home;
