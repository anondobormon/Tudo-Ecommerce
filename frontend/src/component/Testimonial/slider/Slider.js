import React from "react";
// import Swiper core and required modules
import { A11y, Navigation, Pagination, Scrollbar } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";

const Slider = ({ TestimonialInfo }) => {
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      pagination={{ clickable: true }}
    >
      <SwiperSlide>
        <div>{TestimonialInfo}</div>
      </SwiperSlide>
      <SwiperSlide>
        <div>{TestimonialInfo}</div>
      </SwiperSlide>
      <SwiperSlide>
        <div>{TestimonialInfo}</div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Slider;
