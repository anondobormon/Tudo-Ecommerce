import { Container } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../actions/userAction";
import Footer from "../Layout/Header/Footer";
import Header from "../Layout/Header/Header";
import Loader from "../Layout/Loader/Loader";
import MetaData from "../Layout/MetaData";
import SubHeader from "../Layout/SubHeader/SubHeader";
import "./Profile.scss";

const Profile = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(`/login`);
    }
  }, [navigate, isAuthenticated]);
  const handleLogout = () => {
    dispatch(logout());
    alert.success("Logout successfully");
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${user.name}'s Profile `} />
          <Header />
          <SubHeader />
          <Container>
            <h2 className="profileHeading">My Profile</h2>
            <div className="profileContainer">
              <div className="left">
                <div className="avatar">
                  <img src={user.avatar?.url} alt={user?.name} />
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
                <div className="items">
                  <div className="item">
                    <p>Full Name:</p>
                    <span>{user.name}</span>
                  </div>
                  <div className="item">
                    <p>Email: </p>
                    <span>{user.email}</span>
                  </div>
                  <div className="item">
                    <p>Joined On:</p>
                    <span>{String(user.createdAt).substr(0, 10)}</span>
                  </div>
                </div>
              </div>
            </div>
          </Container>
          <Footer />
        </>
      )}
    </>
  );
};

export default Profile;
