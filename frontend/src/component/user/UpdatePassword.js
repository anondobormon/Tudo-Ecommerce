import KeyIcon from "@mui/icons-material/Key";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearError, loadUser, updatePassword } from "../../actions/userAction";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import Footer from "../Layout/Header/Footer";
import Header from "../Layout/Header/Header";
import "./UpdateProfile.css";

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { loading, isUpdated, error } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.user);

  let navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  const registerSubmit = (e) => {
    e.preventDefault();
    let myForm = new FormData();
    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      dispatch(loadUser());
      navigate("/account");
      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [alert, isUpdated, error, user, dispatch, navigate]);
  return (
    <div>
      <div>
        <Header />
        <div className="register">
          <div className="registerContainer">
            <h2>Update Your Profile</h2>
            <form
              className="signUpForm"
              encType="multipart/form-data"
              onSubmit={registerSubmit}
            >
              <label htmlFor="oldPassword">Old Password</label>
              <div className="signUpName">
                <KeyIcon />
                <input
                  type="password"
                  placeholder="Old Password"
                  required
                  name="oldPassword"
                  id="oldPassword"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
              <label htmlFor="newPassword">New Password</label>
              <div className="signUpEmail">
                <LockOpenIcon />
                <input
                  type="password"
                  placeholder="New Password"
                  required
                  name="newPassword"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="signUpEmail">
                <LockIcon />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  required
                  name="confirmPassword"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <button type="submit" className="registerButton">
                Update
                {loading && <CircularProgress color="inherit" />}
              </button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default UpdatePassword;
