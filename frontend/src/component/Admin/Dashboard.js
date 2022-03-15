import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAdminProducts } from "../../actions/productAction";
import "./Dashboard.css";
import Sidebar from "./Sidebar.js";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAdminProducts());
  }, [dispatch]);

  return (
    <div>
      <div className="dashboard">
        <Sidebar />
        <div className="dashboardContainer">
          <h2>Dashboard</h2>
          <div className="dashboardSummery">
            <div>
              <p>Total Amount | 2000 Tk</p>
            </div>
            <div className="dashboardSummeryBox2">
              <Link to="/admin/products">
                <p>Product</p>
                <p>{products && products.length}</p>
              </Link>
              <Link to="/admin/orders">
                <p>Orders</p>
                <p>4</p>
              </Link>
              <Link to="/admin/users">
                <p>Users</p>
                <p>2</p>
              </Link>
            </div>
          </div>
          <div className="lineChart">{/* <Chart /> */}</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
