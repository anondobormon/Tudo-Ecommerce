import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Container, Dialog, DialogContent, Rating } from "@mui/material";
import parse from "html-react-parser";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import Carousel from "react-material-ui-carousel";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addItemsToCart } from "../../actions/cartAction";
import {
  clearError,
  getProductDetails,
  newReview,
} from "../../actions/productAction";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import Footer from "../Layout/Header/Footer";
import Header from "../Layout/Header/Header";
import Loader from "../Layout/Loader/Loader";
import MetaData from "../Layout/MetaData";
import SubHeader from "../Layout/SubHeader/SubHeader";
import "./ProductDetails.scss";
import RelatedProduct from "./RelatedProduct";
import ReviewCard from "./ReviewCard.js";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, product, error } = useSelector(
    (state) => state.productDetails
  );
  const { user } = useSelector((state) => state.user);

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");

  const increaseQuantity = () => {
    if (product.stock <= quantity) return;
    let qty = quantity + 1;
    setQuantity(qty);
  };
  const decreaseQuantity = () => {
    if (1 >= quantity) return;
    let qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    alert.success("Item added in cart!");
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearError());
    }
    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert, reviewError, success]);

  const options = {
    edit: false,
    color: "rgba(20,20,20, 0.2)",
    activeColor: "tomato",
    value: product.ratings,
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 25,
  };
  const submitReviewToggle = () => {
    setOpen(!open);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();
    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);
    myForm.set("avatar", user?.avatar.url);

    dispatch(newReview(myForm));
    setOpen(false);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <MetaData title={`${product.name} -- TUDO STORE`} />
          <Header />
          <SubHeader />
          <Container>
            <div className="productDetails">
              <div className="details-1">
                <Carousel className="carousel">
                  {product.images &&
                    product.images.map((item, i) => (
                      <img
                        className="CarouselImage"
                        key={item.url}
                        src={item.url}
                        alt={`${i}Slide`}
                      />
                    ))}
                </Carousel>
              </div>
              <div className="details-2">
                <div className="detailsBlock-1">
                  <p>Product # {product._id}</p>
                  <h2>{product.name}</h2>
                </div>
                <div className="detailsBlock-2">
                  <ReactStars {...options} />
                  <span>({product.numOfReviews} Reviews)</span>
                </div>
                <div className="detailsBlock-3">
                  <p className="description">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Ab, eius esse quod quaerat, quidem delectus ducimus debitis
                    dolorum quo inventore doloremque vitae optio, accusantium
                    aliquid. Laboriosam ex nam quas iure.
                  </p>
                  <div className="price">
                    <h3>$ {product.price + (product.price * 100) / 10}</h3>
                    <h2>$ {product.price}</h2>
                  </div>
                  <div className="detailsBlock-3-1">
                    <div className="detailsBlock-3-1-1">
                      <button onClick={decreaseQuantity}>
                        <RemoveIcon className="icon" />
                      </button>
                      <input
                        readOnly
                        type="number"
                        name=""
                        id=""
                        value={quantity}
                      />
                      <button onClick={increaseQuantity}>
                        <AddIcon className="icon" />
                      </button>
                    </div>
                    <p className="stock">
                      Status:
                      <b
                        className={
                          product.stock < 1 ? " stockedOut" : "stocked"
                        }
                      >
                        {product.stock < 1 ? "Out of Stock" : "In Stock"}
                      </b>
                    </p>
                    <button
                      className="cartBtn"
                      disabled={product.stock < 1 ? true : false}
                      onClick={addToCartHandler}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* //Product Description */}
            <div className="productDescription">
              <h3 className="desHeading">Description:</h3>
              <p className="fullDesc">
                {product.description
                  ? parse(product.description)
                  : "Description not Available"}
              </p>
            </div>
            <hr />

            {/* //reviews */}
            <div className="reviews">
              <h3 className="reviewHeading">Reviews</h3>
              {product.reviews && product.reviews[0] ? (
                <div className="review">
                  {product.reviews &&
                    product.reviews.map((review) => (
                      <ReviewCard review={review} />
                    ))}
                </div>
              ) : (
                <p className="noReviews">No Reviews Yet !</p>
              )}
              <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button>
            </div>

            {/* Modal */}
            <Dialog
              className="dialog"
              open={open}
              onClose={submitReviewToggle}
              aria-describedby="alert-dialog-slide-description"
            >
              <h2 className="dialogTitle">Submit Review</h2>
              <DialogContent className="submitDialog">
                <Rating
                  onChange={(e) => setRating(e.target.value)}
                  value={rating}
                  size="large"
                />

                <textarea
                  cols="20"
                  rows="10"
                  placeholder="Write your comment about this product."
                  className="submitDialogTextArea"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </DialogContent>
              <div className="action">
                <button
                  className="cancel"
                  color="secondary"
                  onClick={submitReviewToggle}
                >
                  Cancel
                </button>
                <button className="submit" onClick={reviewSubmitHandler}>
                  Submit
                </button>
              </div>
            </Dialog>
            {/* Modal */}

            {/* Related Product */}
            <RelatedProduct />
          </Container>
          <Footer />
        </div>
      )}
    </>
  );
}

export default ProductDetails;
