import { Rating } from "@mui/material";
import "./TestimonialInfo.scss";

const TestimonialInfo = () => {
  return (
    <div className="testimonialInfo">
      <div className="top">
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum
          debitis iure, maxime nostrum excepturi voluptatem consectetur sapiente
          a aperiam quo praesentium possimus esse perferendis delectus. Hic
          accusantium cum quisquam. Explicabo!
        </p>
        <h4>John Doe</h4>
        <p className="title">General Manager</p>
        <div className="rating">
          <Rating name="read-only" value={5} size="small" readOnly />
        </div>
      </div>
      <div className="bottom">
        <div>
          <img src="https://i.ibb.co/nj1q2Pm/p-8-md.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default TestimonialInfo;
