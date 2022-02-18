import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import React from "react";
import { Link } from "react-router-dom";
import "./OrderSuccess.css";

const OrderSuccess = () => {
  return (
    <div>
      <div className="orderSuccess">
        <CheckCircleIcon />
        <p>Your order has been placed successfully</p>
        <Link to="/order/me">View Order</Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
