import { Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Layout/Header/Footer";
import Header from "../Layout/Header/Header";
import MetaData from "../Layout/MetaData";
import CheckOutSteps from "./CheckOutSteps";
import "./ConfirmOrder.css";

const ConfirmOrder = () => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  console.log(subtotal);
  const shippingCharge = subtotal > 1000 ? 0 : 200;
  const tax = subtotal * 0.18;

  const totalPrice = subtotal + shippingCharge + tax;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharge,
      tax,
      totalPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/process/payment");
  };

  return (
    <div>
      <MetaData title="Confirm Order" />
      <Header />
      <CheckOutSteps activeStep={1} />

      <div className="confirmOrderPage">
        <div>
          <div className="confirmShippingArea">
            <Typography variant="h6" gutterBottom component="div">
              Shipping Info
            </Typography>
            <div className="confirmShippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user && user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
            <div className="confirmCartItems">
              <Typography variant="p" gutterBottom component="div">
                Your Cart Items
              </Typography>
              <div className="confirmCartItemsContainer">
                {cartItems &&
                  cartItems.map((item) => (
                    <div key={item.product}>
                      <img src={item.image} alt="Product" />
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                      <span>
                        {item.quantity} Pcs X {item.price} Tk ={" "}
                        <b>{item.price * item.quantity} Tk</b>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        {/* divider */}
        <div>
          <div className="orderSummery">
            <Typography variant="h6" gutterBottom component="div">
              Order Summery
            </Typography>
            <div>
              <div>
                <p>Subtotal: </p> <span>{subtotal}</span>
              </div>
              <div>
                <p>Shipping Charge: </p> <span>{shippingCharge}</span>
              </div>
              <div>
                <p>GST: </p> <span>{tax}</span>
              </div>
            </div>
            <div className="orderSummeryTotal">
              <p>
                <b>Total: </b>
              </p>
              <span>{totalPrice} Tk</span>
            </div>
            <button onClick={proceedToPayment}>Proceed to Payment</button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ConfirmOrder;
