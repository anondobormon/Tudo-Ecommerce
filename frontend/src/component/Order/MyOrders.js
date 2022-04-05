import { Container } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearError, myOrders } from "../../actions/orderAction";
import { logout } from "../../actions/userAction";
import Footer from "../Layout/Header/Footer";
import Header from "../Layout/Header/Header";
import Loader from "../Layout/Loader/Loader";
import MetaData from "../Layout/MetaData";
import SubHeader from "../Layout/SubHeader/SubHeader";
import ProfileSidebar from "../user/ProfileSidebar";
import "./MyOrders.scss";

const MyOrders = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      minWidth: 250,
      flex: 1,
    },

    {
      field: "itemsQty",
      headerName: "Qty",
      type: "number",
      minWidth: 70,
      flex: 0.3,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 120,
      flex: 0.5,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 120,
      type: "number",
      sortable: false,
      flex: 0.5,

      renderCell: (params) => {
        return (
          <div
            className={`cellWithStatus ${params.getValue(params.id, "status")}`}
          >
            {params.getValue(params.id, "status")}
          </div>
        );
      },
    },
    {
      field: "action",
      flex: 0.3,
      headerName: "Action",
      minWidth: 100,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link
            className="tableLink"
            to={`/order/${params.getValue(params.id, "id")}`}
          >
            View
          </Link>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    dispatch(myOrders());
  }, [alert, error, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    alert.success("Logout successfully");
  };
  return (
    <div>
      <MetaData title={user?.name + "- Orders"} />

      {loading ? (
        <Loader />
      ) : (
        <div>
          <Header />
          <SubHeader />
          <Container>
            <div className="profileContainer">
              <div className="left">
                <div className="avatar">
                  <img src={user?.avatar?.url} alt={user?.name} />
                </div>
                <ProfileSidebar handleLogout={handleLogout} />
                
              </div>
              <div className="right">
                <p id="myOrderHeading">{user?.name}'s Orders</p>

                <DataGrid
                  rows={rows}
                  pageSize={10}
                  columns={columns}
                  disableSelectionOnClick
                  className="myOrderTable"
                  autoHeight
                />
              </div>
            </div>
          </Container>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default MyOrders;
