import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { loadUser } from "./actions/userAction";
import "./App.css";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/product/ProductDetails.js";
import Products from "./component/product/Products.js";
import Login from "./component/user/Login";
import Search from "./component/user/Login.js";
import Register from "./component/user/Register";
import store from "./store";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:keyword" element={<Products />} />
      <Route path="/search" element={<Search />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
