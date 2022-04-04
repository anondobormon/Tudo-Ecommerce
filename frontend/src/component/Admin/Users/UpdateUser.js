import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  clearError,
  getUserDetails,
  updateUser,
} from "../../../actions/userAction";
import { UPDATE_USER_RESET } from "../../../constants/userConstants";
import Loader from "../../Layout/Loader/Loader";
import MetaData from "../../Layout/MetaData";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import "./NewProduct.scss";

const UpdateUser = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const userId = useParams().id;

  const { loading, error, user } = useSelector((state) => state.userDetails);
  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if ((!user, userId.length === 24)) {
      dispatch(getUserDetails(userId));
    }
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
    if (isUpdated) {
      alert.success("User Profile updated successfully");
      dispatch({ type: UPDATE_USER_RESET });
      dispatch(getUserDetails(userId));
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearError());
    }

    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
  }, [dispatch, error, alert, userId, user, isUpdated, updateError]);

  const updateUserHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("role", role);
    myForm.set("email", email);

    dispatch(updateUser(userId, myForm));
  };

  return (
    <div>
      <MetaData title="New Product" />
      {loading ? (
        <Loader />
      ) : (
        <div className="newProduct">
          <Sidebar />
          <div className="newProductContainer">
            {updateLoading && <Loader />}
            <Navbar />

            <form
              action="createProductForm"
              encType="multipart/form-data"
              onSubmit={updateUserHandler}
            >
              <div className="left">
                <h2>User Details</h2>
                <div className="items">
                  <label htmlFor="name">User Name</label>
                  <div className="item">
                    <SpellcheckIcon />
                    <input
                      type="text"
                      placeholder="Name"
                      required
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="items">
                  <label htmlFor="email">User Email</label>
                  <div className="item">
                    <AttachMoneyIcon />
                    <input
                      placeholder="Email"
                      type="email"
                      required
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="items">
                  <label htmlFor="role">User Role</label>
                  <div className="item">
                    <AttachMoneyIcon />
                    <input
                      type="text"
                      placeholder="Price"
                      required
                      value={role}
                      id="role"
                      onChange={(e) => setRole(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="right">
                <Button
                  id="createProductBtn"
                  type="submit"
                  disabled={loading ? true : false}
                >
                  Create
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateUser;
