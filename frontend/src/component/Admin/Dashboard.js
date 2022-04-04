import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearError, getAllOrders } from "../../actions/orderAction";
import { getAdminProducts } from "../../actions/productAction";
import { getAllUsers } from "../../actions/userAction";
import Chart from "./Charts/Chart";
import Featured from "./Charts/Featured";
import "./Dashboard.scss";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar.js";
import Tables from "./Table/Tables";
import Widget from "./Widget/Widget";

const Dashboard = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { products } = useSelector((state) => state.products);
  const { error, orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    dispatch(getAdminProducts());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch, error, alert]);

  let widgetData = {
    user: {
      type: "user",
      qty: users && users.length,
      url: "/admin/users",
    },
    order: {
      type: "order",
      qty: orders?.length,
      url: "/admin/orders",
    },
    earnings: {
      type: "earnings",
      qty:
        orders &&
        Math.floor(orders.reduce((acc, item) => acc + item.totalPrice, 0)),
      url: "/admin/earnings",
    },
    products: {
      type: "products",
      qty: products && products.length,

      url: "/admin/products",
    },
  };

  return (
    <div>
      <div className="dashboard">
        <Sidebar />
        <div className="dashboardContainer">
          <Navbar />
          {/* <h2>Dashboard</h2> */}
          <div className="widgets">
            <Widget info={widgetData.user} />
            <Widget info={widgetData.order} />
            <Widget info={widgetData.earnings} />
            <Widget info={widgetData.products} />
          </div>
          <div className="charts">
            <Featured />
            <Chart />
          </div>
          <div className="listContainer">
            <div className="listTitle">Latest Orders</div>
            {orders && <Tables data={orders} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
