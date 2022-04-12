import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import AddCardIcon from "@mui/icons-material/AddCard";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import StoreMallDirectoryOutlinedIcon from "@mui/icons-material/StoreMallDirectoryOutlined";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Sidebar.scss";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/">TUDO</Link>
      </div>

      <div className="center">
        <p className="title">MAIN</p>
        <NavLink
          style={({ isActive }) => {
            return {
              color: isActive ? "#7451f8" : "",
              backgroundColor: isActive ? "#e2daff" : "",
            };
          }}
          to={`/admin/dashboard`}
        >
          <DashboardIcon className="icon" /> <span>Dashboard</span>
        </NavLink>
        <p className="title">LIST</p>

        <NavLink
          style={({ isActive }) => {
            return {
              color: isActive ? "#7451f8" : "",
              backgroundColor: isActive ? "#e2daff" : "",
            };
          }}
          to={`/admin/users`}
        >
          <PersonOutlineOutlinedIcon className="icon" /> <span>Users</span>
        </NavLink>

        <NavLink
          style={({ isActive }) => {
            return {
              color: isActive ? "#7451f8" : "",
              backgroundColor: isActive ? "#e2daff" : "",
            };
          }}
          to={`/admin/products`}
        >
          <CreditCardOutlinedIcon className="icon" />
          <span>Products</span>
        </NavLink>

        <NavLink
          style={({ isActive }) => {
            return {
              color: isActive ? "#7451f8" : "",
              backgroundColor: isActive ? "#e2daff" : "",
            };
          }}
          to={`/admin/orders`}
        >
          <StoreMallDirectoryOutlinedIcon className="icon" />{" "}
          <span>Orders</span>
        </NavLink>

        <NavLink
          style={({ isActive }) => {
            return {
              color: isActive ? "#7451f8" : "",
              backgroundColor: isActive ? "#e2daff" : "",
            };
          }}
          to={`/admin/profile`}
        >
          <AccountCircleOutlinedIcon className="icon" /> <span>Profile</span>
        </NavLink>
        <p className="title">SETTING</p>

        <NavLink
          style={({ isActive }) => {
            return {
              color: isActive ? "#7451f8" : "",
              backgroundColor: isActive ? "#e2daff" : "",
            };
          }}
          to={`/admin/setting`}
        >
          <SettingsOutlinedIcon className="icon" /> <span>Settings</span>
        </NavLink>
        <NavLink
          style={({ isActive }) => {
            return {
              color: isActive ? "#7451f8" : "",
              backgroundColor: isActive ? "#e2daff" : "",
            };
          }}
          to={`/admin/category`}
        >
          <AddCardIcon className="icon" /> <span>Add Category</span>
        </NavLink>

        <NavLink
          style={({ isActive }) => {
            return {
              color: isActive ? "#7451f8" : "",
              backgroundColor: isActive ? "#e2daff" : "",
            };
          }}
          to={`/admin/product`}
        >
          <AddBoxOutlinedIcon className="icon" /> <span>Create Product</span>
        </NavLink>
        <p className="title">USER</p>

        <NavLink
          style={({ isActive }) => {
            return {
              color: isActive ? "#7451f8" : "",
              backgroundColor: isActive ? "#e2daff" : "",
            };
          }}
          to={`/admin/reviews`}
        >
          <RateReviewOutlinedIcon className="icon" />
          <span>Reviews</span>
        </NavLink>

        <Link to="">
          <ExitToAppOutlinedIcon className="icon" /> <span>Logout</span>
        </Link>
      </div>
      <div className="bottom">
        <div className="colorOption"></div>
        <div className="colorOption"></div>
      </div>
    </div>
  );
};

export default Sidebar;
