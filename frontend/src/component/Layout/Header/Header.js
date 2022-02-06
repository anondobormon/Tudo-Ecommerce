import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <>
      <div className="navbar">
        <div className="navContainer">
          <div className="navLogo">
            <h2>TUDO</h2>
          </div>
          <div className="navList">
            <ul>
              <li>
                <Link to="/">HOME</Link>
              </li>
              <li>
                <Link to="/products">PRODUCT</Link>
              </li>
              <li>
                <Link to="/about">ABOUT US</Link>
              </li>
              <li>
                <Link to="/contact">CONTACT US</Link>
              </li>
            </ul>
            <ul>
              <li>
                <Link to="/search">{<SearchOutlinedIcon />}</Link>
              </li>

              <li className="cart">
                <Link to="/cart">
                  {<ShoppingCartOutlinedIcon />}
                  <span>2</span>
                </Link>
              </li>
              <li>
                <Link to="/login">{<AccountCircleOutlinedIcon />}</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
