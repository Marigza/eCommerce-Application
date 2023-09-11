import React from "react";

import "./Slider.scss";

interface ISlide {
  data: {
    url: string;
    title?: string;
  };
}

const Slide: React.FC<ISlide> = (props) => {
  return (
    <div className="slide">
      <img src={props.data.url} alt="" className="slide-image" />
    </div>
  );
};

export default Slide;
