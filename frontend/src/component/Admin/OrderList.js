import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteOrder, getAllOrders } from "../../actions/orderAction";
import { clearError } from "../../actions/productAction";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";
import Loader from "../Layout/Loader/Loader";
import MetaData from "../Layout/MetaData";
import Navbar from "./Navbar";
import "./OrderList.scss";
import Sidebar from "./Sidebar";

const OrderList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, orders, loading } = useSelector((state) => state.allOrders);
  const { error: deletedError, isDeleted } = useSelector(
    (state) => state.order
  );
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (deletedError) {
      alert.error(deletedError);
      dispatch(clearError());
    }

    if (isDeleted) {
      alert.success("Order Deleted Successfully");
      dispatch({ type: DELETE_ORDER_RESET });
    }
    dispatch(getAllOrders());
  }, [error, alert, dispatch, isDeleted, deletedError]);

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
      flex: 0.2,
      renderCell: (params) => {
        return (
          <div className="orderStatus">
            <span className={`status ${params.getValue(params.id, "status")}`}>
              {params.getValue(params.id, "status")}
            </span>
          </div>
        );
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.2,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.2,
    },
    {
      field: "actions",
      flex: 0.4,
      headerName: "Actions",
      type: "number",
      minWidth: 150,
      sortable: false,
      renderCell: (params) => {
        return (
          <div className="actions">
            <Link
              className="edit"
              to={`/admin/order/${params.getValue(params.id, "id")}`}
            >
              Edit
            </Link>

            <button
              className="deletebtn"
              onClick={() =>
                deleteOrderHandler(params.getValue(params.id, "id"))
              }
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <MetaData title={"All Products - Admin"} />
          <div className="orderList">
            <Sidebar />
            <div className="orderListContainer">
              <Navbar />

              <div className="dataTable">
                <h2>All Orders</h2>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={10}
                  disableSelectionOnClick
                  className="productListTable"
                  autoHeight
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderList;
