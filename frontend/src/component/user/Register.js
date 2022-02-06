import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearError, register } from "../../actions/userAction";
import profileAvatar from "../../images/profile1.png";
import "./Register.css";

function Register() {
  const [avatarPreview, setAvatarPreview] = useState(profileAvatar);
  const [avatar, setAvatar] = useState("/profile.png");
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
        if (reader.readyState == 2) {
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
  }, [alert, user, isAuthenticated, dispatch, navigate]);
  return (
    <div>
      <div className="register">
        <div className="registerContainer">
          <h2>Register Here</h2>
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
                onChange={registerDataChange}
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
                onChange={registerDataChange}
              />
            </div>
            <label htmlFor="password">Password</label>
            <div className="signUpPassword">
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

            <div id="registerImage">
              <img src={avatarPreview} alt="Avatar Preview" />
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={registerDataChange}
              />
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
    </div>
  );
}

export default Register;
