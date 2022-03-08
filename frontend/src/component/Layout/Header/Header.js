import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AccountMenu from "./AccountMenu";
import "./Header.css";

function Header() {
  const { isAuthenticated } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  return (
    <>
      <div className="navbar">
        <div className="navContainer main_Container">
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
              <li>{!isAuthenticated && <Link to="/login">LOGIN</Link>}</li>
            </ul>
            <ul>
              <li>
                <Link to="/search">{<SearchOutlinedIcon />}</Link>
              </li>

              <li className="cart">
                <Link to="/cart">
                  {<ShoppingCartOutlinedIcon />}
                  <span>{cartItems.length}</span>
                </Link>
              </li>
              <li>{<AccountMenu />}</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
