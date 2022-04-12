import { Container } from "@mui/material";
import { useState } from "react";
import "./Categories.scss";

const Categories = () => {
  const [cateImage, setCateImage] = useState("https://i.ibb.co/fv8nSy9/1.jpg");
  const categoriesFake = [
    {
      name: "clothes",
      product: 454,
      cateImg: "https://i.ibb.co/fv8nSy9/1.jpg",
    },
    {
      name: "watches",
      product: 414,
      cateImg: "https://i.ibb.co/856yxVD/3.jpg",
    },
    {
      name: "bags",
      product: 215,
      cateImg: "https://i.ibb.co/BcvFgqs/4.jpg",
    },
    {
      name: "shoes",
      product: 122,
      cateImg: "https://i.ibb.co/6J0y5G5/2.jpg",
    },
  ];
  return (
    <Container maxwidth="xl">
      <h2 className="featuredHeading">Top Categories Here</h2>
      <p>Browse The Mens Categories</p>
      <div className="categories">
        <div className="left">
          {categoriesFake.map((product) => (
            <div
              key={product.name}
              className={product.name}
              onClick={() => setCateImage(product.cateImg)}
            >
              <div className="cateImg">
                <img src="https://i.ibb.co/zr2SVJq/men.png" alt="" />
              </div>
              <div className="cateInfo">
                <h4>{product.name}</h4>
                <p>{product.product} Product's</p>
              </div>
            </div>
          ))}
        </div>
        <div className="right">
          <div className="categoriesImage">
            <img src={cateImage} alt="" />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Categories;
