import LockIcon from "@mui/icons-material/Lock";
import MailIcon from "@mui/icons-material/Mail";
import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { clearError, login } from "../../actions/userAction";
import Footer from "../Layout/Header/Footer";
import Header from "../Layout/Header/Header";
import "./Login.css";

function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const dispatch = useDispatch();
  const alert = useAlert();
  let navigate = useNavigate();
  let location = useLocation();

  const { loading, user, error, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const redirect = location.search ? location.search.split("=")[1] : "/account";
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [error, dispatch, isAuthenticated, alert, navigate, redirect]);

  return (
    <div>
      <Header />
      <div className="login">
        <div className="loginContainer">
          <h2>Login Here !</h2>
          <form action="">
            <label htmlFor="email">Email</label>
            <div className="inputEmail">
              <span>
                <MailIcon />
              </span>
              <input
                type="email"
                name="email"
                id="email"
                required
                value={loginEmail}
                placeholder="Enter you Email"
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>
            <label htmlFor="password">Password</label>
            <div className="inputPassword">
              <span>
                <LockIcon />
              </span>
              <input
                type="password"
                name="password"
                id="password"
                value={loginPassword}
                required
                placeholder="Enter you Password"
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            <p className="registerHere">
              Are you new user please <Link to="/register">Register Here!</Link>{" "}
            </p>
            <button onClick={loginSubmit} className="loginButton">
              Login{"  "}
              {loading && <CircularProgress color="inherit" />}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
