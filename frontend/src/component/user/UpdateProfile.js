import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import { CircularProgress, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  clearError,
  loadUser,
  logout,
  updateProfile,
} from "../../actions/userAction";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import profileAvatar from "../../images/profile1.png";
import Footer from "../Layout/Header/Footer";
import Header from "../Layout/Header/Header";
import MetaData from "../Layout/MetaData";
import SubHeader from "../Layout/SubHeader/SubHeader";
import "./UpdateProfile.scss";

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

  const updateSubmit = (e) => {
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
      setAvatarPreview(user?.avatar?.url);
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
  const handleLogout = () => {
    dispatch(logout());
    alert.success("Logout successfully");
  };
  return (
    <div>
      <Header />
      <MetaData title="UPDATE PROFILE - TUDO" />
      <SubHeader />
      <Container>
        <div className="update">
          <div className="updateContainer">
            <h2>Update Your Profile</h2>
            <div className="updateContainer-1">
              <div className="left">
                <div className="avatar">
                  <img src={user?.avatar?.url} alt={user?.name} />
                </div>
                <div className="links">
                  <Link to="/account">Profile</Link>
                  <Link to="/me/update">Update Profile</Link>
                  <Link to="/orders">My Order</Link>
                  <Link to="/password/update">Change Password</Link>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              </div>

              <div className="right">
                <form
                  className="signUpForm"
                  encType="multipart/form-data"
                  onSubmit={updateSubmit}
                >
                  <div id="updateImage">
                    <label htmlFor="avatar">
                      <img src={avatarPreview} alt="Avatar Preview" />
                    </label>
                    <input
                      id="avatar"
                      type="file"
                      name="avatar"
                      accept="image/*"
                      onChange={updateProfileHandler}
                    />
                  </div>
                  <div className="items">
                    <label htmlFor="name">Name</label>
                    <div className="item">
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
                  </div>

                  <div className="items">
                    <label htmlFor="email">Email</label>
                    <div className="item">
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
                  </div>

                  <button type="submit" className="updateButton">
                    Update
                    {loading && <CircularProgress color="inherit" />}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default UpdateProfile;
