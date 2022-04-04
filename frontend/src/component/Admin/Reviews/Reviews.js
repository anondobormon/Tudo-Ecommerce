import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  deleteReviews,
  getAllReview,
} from "../../../actions/productAction";
import { DELETE_REVIEW_RESET } from "../../../constants/productConstants";
import Loader from "../../Layout/Loader/Loader";
import MetaData from "../../Layout/MetaData";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

const Reviews = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [productId, setProductId] = useState("");
  const { error, reviews, loading } = useSelector(
    (state) => state.productReviews
  );
  const {
    error: deletedError,
    isDeleted,
    loading: deleteLoading,
  } = useSelector((state) => state.review);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    if (productId.length === 24) {
      dispatch(getAllReview(productId));
    }

    if (isDeleted) {
      alert.success("Review Deleted Successfully");
      dispatch({ type: DELETE_REVIEW_RESET });
    }

    if (deletedError) {
      alert.error(deletedError);
      dispatch(clearError());
    }
  }, [error, alert, dispatch, isDeleted, deletedError, productId]);

  const columns = [
    { field: "id", headerName: "Review Id", minWidth: 200, flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 300,
      flex: 0.6,
    },
    {
      field: "comment",
      headerName: "Comment",
      minWidth: 300,
      flex: 0.6,
    },
    {
      field: "rating",
      headerName: "Rating",
      minWidth: 150,
      flex: 0.1,
      renderCell: (params) => {
        return (
          <div className="role">
            <p className={params.getValue(params.id, "rating")}>
              {params.getValue(params.id, "rating")}
            </p>
          </div>
        );
      },
    },

    {
      field: "actions",
      flex: 0.5,
      headerName: "Actions",
      type: "number",
      minWidth: 120,
      sortable: false,
      renderCell: (params) => {
        return (
          <div className="actions">
            <button
              className="deletebtn"
              onClick={() =>
                deleteReviewHandler(params.getValue(params.id, "id"))
              }
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReviews(reviewId, productId));
  };

  const rows = [];

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        name: item.name,
      });
    });

  //Get all reviews
  const reviewHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReview(productId));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <MetaData title={"All Users - Admin"} />

          <div className="usrList">
            <Sidebar />
            <div className="userListContainer">
              {deleteLoading && <Loader />}

              <Navbar />
              <div className="dataTable">
                <h2 className="userListHeading">All Reviews</h2>

                <form
                  action="createProductForm"
                  encType="multipart/form-data"
                  onSubmit={reviewHandler}
                >
                  <div className="left">
                    <h2>User Details</h2>
                    <div className="items">
                      <label htmlFor="id">Product Id</label>
                      <div className="item">
                        <SpellcheckIcon />
                        <input
                          type="text"
                          placeholder="Enter product id"
                          required
                          id="id"
                          value={productId}
                          onChange={(e) => setProductId(e.target.value)}
                        />
                      </div>
                    </div>
                    <button type="submit" disabled={loading ? true : false}>
                      Search
                    </button>
                  </div>
                </form>

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

export default Reviews;
