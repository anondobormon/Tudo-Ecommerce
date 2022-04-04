import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  clearError,
  deleteUser,
  getAllUsers,
} from "../../../actions/userAction";
import { DELETE_USER_RESET } from "../../../constants/userConstants";
import Loader from "../../Layout/Loader/Loader";
import MetaData from "../../Layout/MetaData";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import "./UserList.scss";

const UserList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, users, loading } = useSelector((state) => state.allUsers);
  const {
    error: deletedError,
    isDeleted,
    loading: deleteLoading,
  } = useSelector((state) => state.profile);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    if (isDeleted) {
      alert.success("User Deleted Successfully");
      dispatch({ type: DELETE_USER_RESET });
    }

    if (deletedError) {
      alert.error(deletedError);
      dispatch(clearError());
    }

    dispatch(getAllUsers());
  }, [error, alert, dispatch, isDeleted, deletedError]);

  const columns = [
    { field: "id", headerName: "User Id", minWidth: 200, flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 300,
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
      field: "role",
      headerName: "Role",
      minWidth: 150,
      flex: 0.1,
      renderCell: (params) => {
        return (
          <div className="role">
            <p className={params.getValue(params.id, "role")}>
              {params.getValue(params.id, "role")}
            </p>
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 350,
      flex: 0.1,
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
            <Link
              className="view"
              to={`/admin/user/${params.getValue(params.id, "id")}`}
            >
              View
            </Link>

            <button
              className="deletebtn"
              onClick={() =>
                deleteUserHandler(params.getValue(params.id, "id"))
              }
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  const rows = [];

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
        image: item.avatar?.url,
      });
    });

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
                <h2 className="userListHeading">All Users</h2>

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

export default UserList;
