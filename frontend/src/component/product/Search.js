import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../Layout/MetaData";
import "./Search.css";

function Search() {
  let navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    console.log(keyword);
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };

  return (
    <div>
      <MetaData title="SEARCH -- TUDO STORE" />
      <from className="searchBox">
        <input
          type="text"
          placeholder="Search a Product..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        {/* <input type="submit" value="Search" /> */}
        <button onClick={searchSubmitHandler}>Search</button>
      </from>
    </div>
  );
}

export default Search;
