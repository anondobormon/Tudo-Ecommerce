import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/product/ProductDetails.js";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetails />} />
    </Routes>
  );
}

export default App;
