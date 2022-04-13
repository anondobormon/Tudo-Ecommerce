import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import { CircularProgress, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearError, register } from "../../actions/userAction";
import profileAvatar from "../../images/profile1.png";
import Footer from "../Layout/Header/Footer";
import Header from "../Layout/Header/Header";
import MetaData from "../Layout/MetaData";
import SubHeader from "../Layout/SubHeader/SubHeader";
import "./Register.scss";

function Register() {
  const [avatarPreview, setAvatarPreview] = useState(profileAvatar);
  const [avatar, setAvatar] = useState("https://i.ibb.co/3CY8BNT/profile1.png");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );

  const { name, email, password } = user;

  const registerDataChange = (e) => {
    //For preview avatar image
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (isAuthenticated) {
      navigate(`/login`);
    }
  }, [alert, user, isAuthenticated, error, dispatch, navigate]);
  return (
    <div>
      <Header />
      <MetaData title="REGISTER - TUOD" />
      <SubHeader />
      <Container>
        <div className="register">
          <div className="registerContainer">
            <h2>Register Here</h2>
            <p>Best Place to Buy Products</p>

            <form
              className="signUpForm"
              encType="multipart/form-data"
              onSubmit={registerSubmit}
            >
              <div id="registerImage">
                <label htmlFor="avatar">
                  <img src={avatarPreview} alt="Avatar Preview" />
                </label>
                <input
                  id="avatar"
                  type="file"
                  name="avatar"
                  accept="image/*"
                  required
                  onChange={registerDataChange}
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
                    onChange={registerDataChange}
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
                    onChange={registerDataChange}
                  />
                </div>
              </div>
              <div className="items">
                <label htmlFor="password">Password</label>
                <div className="item">
                  <LockOpenOutlinedIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    id="password"
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>
              </div>

              <p className="registerHere">
                Already have an account Please
                <Link to="/login">Login Here!</Link>
              </p>
              <button type="submit" className="registerButton">
                Register
                {loading && <CircularProgress color="inherit" />}
              </button>
            </form>
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
}

export default Register;
