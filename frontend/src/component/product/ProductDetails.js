import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
} from "@mui/material";
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
import "./ProductDetails.css";
import ReviewCard from "./ReviewCard.js";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, product, error } = useSelector(
    (state) => state.productDetails
  );
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
          <div className="productDetails">
            <div className="details-1">
              <Carousel>
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
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <ReactStars {...options} />
                <span>({product.numOfReviews} Reviews)</span>
              </div>
              <div className="detailsBlock-3">
                <h1>{product.price}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input
                      readOnly
                      type="number"
                      name=""
                      id=""
                      value={quantity}
                    />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    disabled={product.stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>
                <p>
                  Status:
                  <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                    {product.stock < 1 ? "Out of Stock" : "In Stock"}
                  </b>
                </p>
              </div>
              <div className="detailsBlock-4">
                Description: <p>{product.description}</p>
              </div>
              <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button>
            </div>
          </div>
          <h3 className="reviewHeading">REVIEWS</h3>

          <Dialog
            open={open}
            onClose={submitReviewToggle}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                className="submitDialogTextArea"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button color="secondary" onClick={submitReviewToggle}>
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler}>Submit</Button>
            </DialogActions>
          </Dialog>

          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => <ReviewCard review={review} />)}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet !</p>
          )}
          <Footer />
        </div>
      )}
    </>
  );
}

export default ProductDetails;
