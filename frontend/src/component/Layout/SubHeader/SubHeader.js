import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Container } from "@mui/material";
import { Link } from "react-router-dom";
import "./SubHeader.scss";

const SubHeader = ({info}) => {
  return (
    <div className="subHeader">
      <Container>
        <div className="subContent">
          <div className="left">
            <h4 className="title">Single Product</h4>
          </div>
          <div className="right">
            <Link to="/">Home</Link>
            <ChevronRightIcon className="icon" />
            <p>Product</p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SubHeader;
