import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Container } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AccountMenu from "./AccountMenu";
import "./Header.scss";

function Header() {
  const [hide, setHide] = useState(true);
  const { isAuthenticated } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  return (
    <>
      <Container>
        <div className={`navbar ${hide ? " " : "extent"}`}>
          <div className="navMenuBtn">
            <div onClick={(e) => setHide(!hide)} className="menu">
              <MenuOpenIcon className="icon" />
            </div>
          </div>
          <div className="navLogo">
            <Link to="/">
              <h2>TUDO</h2>
            </Link>
          </div>
          <div className="navList">
            <ul className={`items ${hide ? "hide" : "block"}`}>
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
            <ul className="profileUl">
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
      </Container>
    </>
  );
}

export default Header;
