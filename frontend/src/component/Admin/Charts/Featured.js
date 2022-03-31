import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./Featured.scss";

const featured = () => {
  return (
    <div className="featured">
      <div className="top">
        <h2 className="title">Total Revenue</h2>
        <MoreVertOutlinedIcon className="icon" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={70} text={"70%"} strokeWidth={3} />
        </div>
        <p className="title">Total Sales</p>
        <p className="amount">$455451</p>
        <p className="desc">
          Previous transactions processing. Last payments may not be included
        </p>
      </div>
    </div>
  );
};

export default featured;
