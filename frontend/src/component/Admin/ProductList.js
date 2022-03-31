import { Rating } from "@mui/material";
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
import Loader from "../Layout/Loader/Loader";
import MetaData from "../Layout/MetaData";
import Navbar from "./Navbar";
import "./ProductList.scss";
import Sidebar from "./Sidebar";

const ProductList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, products, loading } = useSelector((state) => state.products);
  const {
    error: deletedError,
    isDeleted,
    loading: deleteLoading,
  } = useSelector((state) => state.product);
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
  }, [error, alert, dispatch, isDeleted, deletedError]);

  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 200, flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 0.6,

      renderCell: (params) => {
        return (
          <div className="cellWrapper">
            <div className="image">
              <img src={params.getValue(params.id, "image")} alt="" />
            </div>
            <div className="name">{params.getValue(params.id, "name")}</div>
          </div>
        );
      },
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.1,
    },
    {
      field: "ratings",
      headerName: "Ratings",
      type: "number",
      minWidth: 150,
      flex: 0.2,
      renderCell: (params) => {
        <Rating
          name="size-small"
          defaultValue={params.getValue(params.id, "ratings")}
          size="small"
        />;
      },
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 270,
      flex: 0.15,
    },
    {
      field: "actions",
      flex: 0.5,
      headerName: "Actions",
      type: "number",
      minWidth: 150,
      sortable: false,
      renderCell: (params) => {
        return (
          <div className="actions">
            <Link
              className="edit"
              to={`/admin/product/${params.getValue(params.id, "id")}`}
            >
              Edit
            </Link>

            <button
              className="deletebtn"
              onClick={() =>
                deleteProductHandler(params.getValue(params.id, "id"))
              }
            >
              Delete
            </button>
          </div>
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
        image: item.images[0].url,
        ratings: item.ratings,
      });
    });

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <MetaData title={"All Products - Admin"} />

          <div className="productList">
            <Sidebar />
            <div className="productListContainer">
              {deleteLoading && <Loader />}

              <Navbar />
              <div className="dataTable">
                <h2 className="productListHeading">All Products</h2>

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

export default ProductList;
