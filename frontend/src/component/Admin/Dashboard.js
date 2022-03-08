import React from "react";
import "./Dashboard.css";
import Sidebar from "./Sidebar.js";

const Dashboard = () => {
  return (
    <div>
      <div className="dashboard">
        <Sidebar />
        <div className="dashboardContainer"></div>
      </div>
    </div>
  );
};

export default Dashboard;
