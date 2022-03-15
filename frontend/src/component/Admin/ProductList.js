import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  clearError,
  deleteProduct,
  getAdminProducts,
} from "../../actions/productAction";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";
import MetaData from "../Layout/MetaData";
import "./ProductList.css";
import Sidebar from "./Sidebar";

const ProductList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, products } = useSelector((state) => state.products);
  const { error: deletedError, isDeleted } = useSelector(
    (state) => state.product
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
      alert.success("Product Deleted Successfully");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
    dispatch(getAdminProducts());
  }, [error, alert, dispatch, isDeleted]);

  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 200, flex: 0.5 },
    { field: "name", headerName: "Name", minWidth: 350, flex: 1 },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "price",
      headerName: "Price",
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
            <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteProductHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  const rows = [];

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.stock,
        price: item.price,
        name: item.name,
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

export default ProductList;
