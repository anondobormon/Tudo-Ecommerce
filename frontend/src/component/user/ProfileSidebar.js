import { NavLink } from "react-router-dom";
import "./ProfileSidebar.scss";

const ProfileSidebar = ({ handleLogout }) => {
  return (
    <div className="links">
      <NavLink
        style={({ isActive }) => {
          return {
            color: isActive ? "#29a56" : "",
            backgroundColor: isActive ? "#29a56b3a" : "",
          };
        }}
        to={`/account`}
      >
        Profile
      </NavLink>
      <NavLink
        style={({ isActive }) => {
          return {
            color: isActive ? "#29a56" : "",
            backgroundColor: isActive ? "#29a56b3a" : "",
          };
        }}
        to={`/me/update`}
      >
        Update Profile
      </NavLink>
      <NavLink
        style={({ isActive }) => {
          return {
            color: isActive ? "#29a56" : "",
            backgroundColor: isActive ? "#29a56b3a" : "",
          };
        }}
        to={`/orders`}
      >
        My Order
      </NavLink>
      <NavLink
        style={({ isActive }) => {
          return {
            color: isActive ? "#29a56" : "",
            backgroundColor: isActive ? "#29a56b3a" : "",
          };
        }}
        to={`/password/update`}
      >
        Change Password
      </NavLink>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default ProfileSidebar;
