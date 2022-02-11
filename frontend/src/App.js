import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { loadUser } from "./actions/userAction";
import "./App.css";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/product/ProductDetails.js";
import Products from "./component/product/Products.js";
import Search from "./component/product/Search";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import Login from "./component/user/Login";
import Profile from "./component/user/Profile.js";
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
      <Route
        path="/account"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
