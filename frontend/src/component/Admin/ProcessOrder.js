import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  clearError,
  getOrderDetails,
  updateOrder,
} from "../../actions/orderAction";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";
import Loader from "../Layout/Loader/Loader";
import MetaData from "../Layout/MetaData";
import Navbar from "./Navbar";
import "./ProcessOrder.scss";
import Sidebar from "./Sidebar";

const ProcessOrder = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [orderStatus, setOrderStatus] = useState("");

  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearError());
    }
    if (isUpdated) {
      alert.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }
    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, updateError, isUpdated, id]);

  const updateOrderHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("status", orderStatus);
    console.log(orderStatus);

    dispatch(updateOrder(id, myForm));
  };

  return (
    <div>
      <MetaData title="Process Order" />
      {loading ? (
        <Loader />
      ) : (
        <div className="processOrder">
          <Sidebar />
          <div className="updateOrderContainer">
            <Navbar />
            {order && (
              <div className="updateOrder">
                <div className="left">
                  <div className="box">
                    <h2 className="title">Shipping Info</h2>
                    <div className="info">
                      <p>
                        Name: <span>{order?.user?.name}</span>
                      </p>
                      <p>
                        Email: <span>{order?.user?.email}</span>
                      </p>
                      <p>
                        Phone: <span>+880123456789</span>
                      </p>
                      <p>
                        Address:{" "}
                        <span>
                          `{order?.shippingInfo?.address},
                          {order?.shippingInfo?.city},
                          {order?.shippingInfo?.state},
                          {order?.shippingInfo?.pinCode},
                          {order?.shippingInfo?.country}`
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="box">
                    <h2 className="title">Payment Info</h2>
                    <div className="info">
                      <p>
                        Status:{" "}
                        <span className={order?.paymentInfo?.status}>
                          {" "}
                          {order?.paymentInfo?.status}
                        </span>
                      </p>
                      <p>
                        Total Tax: $<span>{order.taxPrice}</span>
                      </p>
                      <p>
                        Total Amount: $<span>{order.totalPrice}</span>
                      </p>
                    </div>
                  </div>
                  <div className="box">
                    <h2 className="title">Order Status</h2>
                    <div className="info">
                      <p>
                        Status:{" "}
                        <span className={order.orderStatus}>
                          {" "}
                          {order.orderStatus}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="cartItems">
                    <h2 className="title">Your Cart Items</h2>
                    {order.orderItems &&
                      order.orderItems.map((item) => (
                        <div key={item._id} className="cartItem">
                          <div className="itemImg">
                            <img src={item.image} alt="" />
                          </div>
                          <div className="info">
                            <p>{item.name} Pice</p>
                            <p>$ {item.price}</p>
                            <p>{item.quantity}</p>
                            <Link to={`/product/${item.product}`}>View</Link>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="right">
                  <h2 className="title">Update Status</h2>
                  <form action="" onSubmit={updateOrderHandler}>
                    <select onChange={(e) => setOrderStatus(e.target.value)}>
                      <option value="">Choose Status</option>
                      {order.orderStatus === "Processing" && (
                        <option value="Shipped">Shipped</option>
                      )}

                      {order.orderStatus === "Shipped" && (
                        <option value="Delivered">Delivered</option>
                      )}
                    </select>
                    <button
                      type="submit"
                      disabled={
                        loading
                          ? true
                          : false || orderStatus === ""
                          ? true
                          : false
                      }
                    >
                      Change Status
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProcessOrder;
