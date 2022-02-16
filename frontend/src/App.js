import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { loadUser } from "./actions/userAction";
import "./App.css";
import Cart from "./component/cart/Cart";
import Home from "./component/Home/Home";
import ProductDetails from "./component/product/ProductDetails";
import Products from "./component/product/Products";
import Search from "./component/product/Search";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import Login from "./component/user/Login";
import Profile from "./component/user/Profile";
import Register from "./component/user/Register";
import UpdatePassword from "./component/user/UpdatePassword";
import UpdateProfile from "./component/user/UpdateProfile";
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
      <Route path="/cart" element={<Cart />} />
      <Route
        path="/account"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/me/update"
        element={
          <ProtectedRoute>
            <UpdateProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/password/update"
        element={
          <ProtectedRoute>
            <UpdatePassword />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
