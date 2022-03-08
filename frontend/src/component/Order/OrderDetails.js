import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { clearError, getOrderDetails } from "../../actions/orderAction";
import Footer from "../Layout/Header/Footer";
import Header from "../Layout/Header/Header";
import Loader from "../Layout/Loader/Loader";
import MetaData from "../Layout/MetaData";
import "./OrderDetails.css";

const OrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  console.log(order);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    dispatch(getOrderDetails(id));
  }, [dispatch, alert, id]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <MetaData title="Order Details" />
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <h1>Order #{order && order._id}</h1>
              <p>Shipping Info</p>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>
                    Name:<span>{order.user && order.user.name}</span>{" "}
                  </p>
                </div>
                <div>
                  <p>
                    Phone:
                    <span>
                      {order.shippingInfo && order.shippingInfo.phoneNo}
                    </span>{" "}
                  </p>{" "}
                </div>
                <div>
                  <p>
                    Address:
                    <span>
                      {order.shippingInfo &&
                        `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                    </span>
                  </p>{" "}
                </div>
              </div>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>
                <div>
                  <p>Amount:</p>{" "}
                  <span>{order.totalPrice && order.totalPrice}</span>
                </div>
              </div>
              <p>Order Status</p>

              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.orderStatus && order.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.orderStatus && order.orderStatus}
                  </p>
                </div>
              </div>
            </div>
            <div className="orderDetailsCartItems">
              <p>Order Items</p>
              <div className="orderDetailsCartItemsContainer">
                {order.orderItems &&
                  order.orderItems.map((item) => (
                    <div key={item.product}>
                      <img src={item.image} alt="Product" />
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                      <span>
                        {item.quantity + " X " + item.price} ={" "}
                        <b>{item.price * item.quantity}</b>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <Footer />
        </>
      )}
    </div>
  );
};

export default OrderDetails;
