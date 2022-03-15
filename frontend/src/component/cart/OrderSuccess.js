import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import React from "react";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div>
      <div className="orderSuccess">
        <CheckCircleIcon />
        <p>Your order has been placed successfully</p>
        <Link to="/orders">View Order</Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
