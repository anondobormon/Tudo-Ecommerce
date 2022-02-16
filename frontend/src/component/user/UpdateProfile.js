import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearError, loadUser, updateProfile } from "../../actions/userAction";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import profileAvatar from "../../images/profile1.png";
import Footer from "../Layout/Header/Footer";
import Header from "../Layout/Header/Header";
import "./UpdateProfile.css";

const UpdateProfile = () => {
  const [avatarPreview, setAvatarPreview] = useState(profileAvatar);
  const [avatar, setAvatar] = useState("/profile.png");
  const { loading, isUpdated, error } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.user);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
  });
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { name, email } = userInfo;

  const updateProfileHandler = (e) => {
    //For preview avatar image
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState == 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    }
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (user) {
      setUserInfo({
        name: user.name,
        email: user.email,
      });
      setAvatarPreview(user.avatar.url);
    }
    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      dispatch(loadUser());
      navigate("/account");
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [alert, isUpdated, error, user, dispatch, navigate]);

  return (
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
            <label htmlFor="name">Name</label>
            <div className="signUpName">
              <AccountCircleOutlinedIcon />
              <input
                type="text"
                placeholder="Name"
                required
                name="name"
                id="name"
                value={name}
                onChange={updateProfileHandler}
              />
            </div>
            <label htmlFor="email">Email</label>
            <div className="signUpEmail">
              <MailOutlineOutlinedIcon />
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                id="email"
                value={email}
                onChange={updateProfileHandler}
              />
            </div>

            <div id="registerImage">
              <img src={avatarPreview} alt="Avatar Preview" />
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateProfileHandler}
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
  );
};

export default UpdateProfile;
