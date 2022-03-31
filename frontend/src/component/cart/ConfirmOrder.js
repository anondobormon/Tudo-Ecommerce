import { Container } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Layout/Header/Footer";
import Header from "../Layout/Header/Header";
import MetaData from "../Layout/MetaData";
import SubHeader from "../Layout/SubHeader/SubHeader";
import RelatedProduct from "../product/RelatedProduct";
import CheckOutSteps from "./CheckOutSteps";
import "./ConfirmOrder.scss";

const ConfirmOrder = () => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
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
    <div className="confirmOrder">
      <MetaData title="Confirm Order" />
      <Header />
      <SubHeader />

      <Container>
        <h2 className="orderHeading">Order Details</h2>
        <CheckOutSteps activeStep={1} />
        <div className="confirmOrderPage">
          <div className="left">
            <div className="orderDetails">
              <div className="orderBox">
                <h3>Order Information</h3>
                <div className="orderBoxLeft">
                  <div className="avatar">
                    <div>
                      <img src={user?.avatar?.url} alt="" />
                    </div>
                  </div>
                  <div className="items">
                    <div className="item">
                      <p>Name:</p>
                      <span>{user && user.name}</span>
                    </div>
                    <div className="item">
                      <p>Phone:</p>
                      <span>{shippingInfo.phoneNo}</span>
                    </div>
                    <div className="item">
                      <p>Address:</p>
                      <span>{address}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="confirmCartItems">
                <h3>Your Cart Items</h3>
                <div className="confirmCartItemsContainer">
                  {cartItems &&
                    cartItems.map((item) => (
                      <div className="cartInfo" key={item.product}>
                        <div className="cartImg">
                          <img src={item.image} alt="Product" />
                        </div>
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
          <div className="right">
            <div className="orderSummery">
              <h4>Order Summery</h4>
              <div className="orderSummeryFirst">
                <div>
                  <p>Subtotal: </p> <span>$ {subtotal}</span>
                </div>
                <div>
                  <p>Shipping Charge: </p> <span>$ {shippingCharge}</span>
                </div>
                <div>
                  <p>GST: </p> <span>$ {tax}</span>
                </div>
              </div>
              <div className="orderSummeryTotal">
                <p>
                  <b>Total: </b>
                </p>
                <span>$ {totalPrice} </span>
              </div>
              <button onClick={proceedToPayment}>Proceed to Payment</button>
            </div>
          </div>
        </div>

        <RelatedProduct />
      </Container>
      <Footer />
    </div>
  );
};

export default ConfirmOrder;
