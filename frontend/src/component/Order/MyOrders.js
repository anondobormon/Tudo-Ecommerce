import LaunchIcon from "@mui/icons-material/Launch";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearError, myOrders } from "../../actions/orderAction";
import Footer from "../Layout/Header/Footer";
import Header from "../Layout/Header/Header";
import Loader from "../Layout/Loader/Loader";
import MetaData from "../Layout/MetaData";
import "./MyOrders.css";

const MyOrders = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "action",
      flex: 0.3,
      headerName: "Action",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            <LaunchIcon />
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

  return (
    <div>
      <MetaData title={user.name + "- Orders"} />

      {loading ? (
        <Loader />
      ) : (
        <div>
          <Header />
          <div className="myOrderPage">
            <DataGrid
              rows={rows}
              pageSize={10}
              columns={columns}
              disableSelectionOnClick
              className="myOrderTable"
              autoHeight
            />

            <p id="myOrderHeading">{user.name}'s Orders</p>
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default MyOrders;
