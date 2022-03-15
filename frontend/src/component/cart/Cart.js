import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { Container } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
import Footer from "../Layout/Header/Footer";
import Header from "../Layout/Header/Header";
import MetaData from "../Layout/MetaData";
import SubHeader from "../Layout/SubHeader/SubHeader";
import RelatedProduct from "../product/RelatedProduct";
import "./Cart.scss";
import CartItemCard from "./CartItemCard";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };
  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };
  const deleteCartItem = (id) => {
    dispatch(removeItemsFromCart(id));
  };
  const checkOutHandler = () => {
    // navigate("/login?redirect=shipping");
    navigate("/shipping");
  };

  return (
    <>
      <MetaData title="CART - TUDO STORE" />
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon className="icon" />
          <p>No Product in Your Cart</p>
          <Link to="/products">View Products</Link>
        </div>
      ) : (
        <>
          <Header />
          <SubHeader />
          <Container>
            <div className="cartPage">
              <h2>Product Cart</h2>
              <div className="cartHeader">
                <div className="cartInfo">
                  <div className="cartHeaderItem">
                    <p>Product</p>
                    <p>Quantity</p>
                    <p>Subtotal</p>
                  </div>
                  <hr />
                  {cartItems &&
                    cartItems.map((item) => (
                      <div key={item.product} className="cartContainer">
                        <CartItemCard
                          item={item}
                          deleteCartItem={deleteCartItem}
                        />
                        <div className="cartInput">
                          <button
                            onClick={() =>
                              decreaseQuantity(item.product, item.quantity)
                            }
                          >
                            <RemoveIcon className="icon" />
                          </button>
                          <input type="number" readOnly value={item.quantity} />
                          <button
                            onClick={() =>
                              increaseQuantity(
                                item.product,
                                item.quantity,
                                item.stock
                              )
                            }
                          >
                            <AddIcon className="icon" />
                          </button>
                        </div>
                        <div className="cartSubTotal">
                          {item.price * item.quantity} Tk
                        </div>
                      </div>
                    ))}
                </div>

                <div className="cartGrossProfit">
                  <div>
                    <h2 className="profitHeader">Shipping Info</h2>
                    <hr />
                    <div className="cartGrossProfitBox">
                      <div className="item">
                        <p>Gross Total: </p>
                        <span>
                          ${" "}
                          {cartItems.reduce(
                            (acc, item) => acc + item.quantity * item.price,
                            0
                          )}
                        </span>
                      </div>
                      <div className="item">
                        <p>Shipping: </p>
                        <span>Free</span>
                      </div>
                      <div className="item">
                        <p>VAT or TAX: </p>
                        <span>Free</span>
                      </div>
                    </div>
                  </div>
                  <div className="checkOutBtn">
                    <div className="item">
                      <p>Total Amount: </p>
                      <span>
                        ${" "}
                        {cartItems.reduce(
                          (acc, item) => acc + item.quantity * item.price,
                          0
                        )}
                      </span>
                    </div>
                    <button onClick={checkOutHandler}>Check Out</button>
                  </div>
                </div>
              </div>
            </div>
            <RelatedProduct />
          </Container>
          <Footer />
        </>
      )}
    </>
  );
};

export default Cart;
