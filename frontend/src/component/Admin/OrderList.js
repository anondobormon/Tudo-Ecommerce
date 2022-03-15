import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteOrder, getAllOrders } from "../../actions/orderAction";
import { clearError } from "../../actions/productAction";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";
import MetaData from "../Layout/MetaData";
import "./ProductList.css";
import Sidebar from "./Sidebar";

const OrderList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, orders } = useSelector((state) => state.allOrders);
  console.log(orders);
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
  }, [error, alert, dispatch, isDeleted]);

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
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      type: "number",
      minWidth: 150,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteOrderHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </>
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
    <div>
      <MetaData title={"All Products - Admin"} />
      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h2 id="productListHeading">ALL PRODUCTS</h2>

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
  );
};

export default OrderList;
