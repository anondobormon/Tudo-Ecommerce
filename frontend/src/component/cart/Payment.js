import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { Container } from "@mui/material";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearError, createOrder } from "../../actions/orderAction";
import Footer from "../Layout/Header/Footer";
import Header from "../Layout/Header/Header";
import MetaData from "../Layout/MetaData";
import SubHeader from "../Layout/SubHeader/SubHeader";
import RelatedProduct from "../product/RelatedProduct";
import CheckOutSteps from "./CheckOutSteps";
import "./Payment.scss";

const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const payBtn = useRef(null);
  const dispatch = useDispatch();
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharge,
    totalPrice: orderInfo.totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      );
      const client_secret = data.client_secret;

      if (!stripe || !elements) return;
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });
      if (result.error) {
        payBtn.current.disabled = false;
        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          dispatch(createOrder(order));
          navigate("/order/success");
        } else {
          alert.error("There some issue occur while processing payment");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      alert.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
  }, [dispatch, error, alert]);

  return (
    <>
      <MetaData title="Payment" />
      <Header />
      <SubHeader />
      <Container>
        <CheckOutSteps activeStep={2} />
        <div className="paymentContainer">
          <form
            action=""
            onSubmit={(e) => submitHandler(e)}
            className="paymentForm"
          >
            <h3>Card Info</h3>
            <div className="input">
              <CreditCardIcon />
              <CardNumberElement className="paymentInput" />
            </div>
            <div className="input">
              <EventIcon />
              <CardExpiryElement className="paymentInput" />
            </div>
            <div className="input">
              <VpnKeyIcon />
              <CardCvcElement className="paymentInput" />
            </div>
            <input
              ref={payBtn}
              className="paymentFormBtn"
              type="submit"
              value={`Pay - ${orderInfo && orderInfo.totalPrice}`}
            />
          </form>
        </div>
        <RelatedProduct />
      </Container>
      <Footer />
    </>
  );
};

export default Payment;
