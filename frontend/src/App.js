import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/product/ProductDetails.js";
import Products from "./component/product/Products.js";
import Search from "./component/product/Search.js";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:keyword" element={<Products />} />
      <Route path="/search" element={<Search />} />
    </Routes>
  );
}

export default App;
