import { Container } from "@mui/material";
import "./Offer.scss";

const Offer = () => {
  return (
    <div className="offer">
      <Container maxwidth="xl">
        <div className="offerInfo">
          <h2>sunglasses</h2>
          <h3>super offer</h3>
          <img src="https://i.ibb.co/jfBFbpj/glass.png" alt="" />
          <p className="title">Acetate frame sunglasses</p>
          <p className="price">$500.00 Only</p>
          <button className="offerBtn">shop now</button>
        </div>
      </Container>
    </div>
  );
};

export default Offer;
