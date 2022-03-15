import { Container } from "@mui/material";
import Slider from "./slider/Slider";
import "./Testimonial.scss";
import TestimonialInfo from "./TestimonialInfo";

const Testimonial = () => {
  return (
    <div className="testimonial">
      <h2 className="featuredHeading">Our Featured Products</h2>
      <p>Browse The Collection of Top Products</p>
      <Container>
        <Slider TestimonialInfo={<TestimonialInfo />} />
      </Container>
      ;
    </div>
  );
};

export default Testimonial;
