import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./HomeSlider.scss";

const HomeSlider: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings} className="slider">
      <div className="slider-slide"></div>
      <div className="slider-slide"></div>
      <div className="slider-slide"></div>
    </Slider>
  );
};

export default HomeSlider;
