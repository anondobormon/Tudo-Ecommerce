import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import "./ProductCard.scss";

function ProductCard({ product }) {
  const options = {
    edit: false,
    color: "rgba(20,20,20, 0.2)",
    activeColor: "tomato",
    value: product.ratings,
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 25,
  };
  return (
    <Link className="productCards" to={`/product/${product._id}`}>
      <div className="productImage">
        <span>20%</span>
        <img src={product.images[0]?.url} alt={product.name} />
      </div>
      <p className="title">{product.name}</p>
      <div className="review">
        <ReactStars {...options} />{" "}
        <span>({product.numOfReviews} Reviews)</span>
      </div>
      <div className="price">
        <span>$ {product.price + (product.price * 10) / 100}</span>
        <p>$ {product.price}</p>
      </div>
      <div className="color">
        <div>
          <span className="colorBox pink"></span>
        </div>
        <div>
          <span className="colorBox sky"></span>
        </div>
        <div>
          <span className="colorBox blue"></span>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
