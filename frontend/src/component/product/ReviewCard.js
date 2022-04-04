import React from "react";
import ReactStars from "react-rating-stars-component";
import "./ReviewCard.scss";

function ReviewCard({ review }) {
  const options = {
    edit: false,
    color: "rgba(20,20,20, 0.2)",
    activeColor: "#29a56c",
    value: review.rating,
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 25,
  };
  return (
    <div className="reviewCard">
      <img src={review.image} alt="User" />
      <div className="reviewInfo">
        <p>{review.name}</p>
        <ReactStars {...options} />
        <span>{review.comment}</span>
      </div>
    </div>
  );
}

export default ReviewCard;
