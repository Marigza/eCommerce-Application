import React, { useContext } from "react";
import Slide from "./Slide";
import { SliderContext } from "./Slider";

import "./Slider.scss";

const SlidesList: React.FC = () => {
  const { slideNumber, items } = useContext(SliderContext);

  if (!slideNumber) return null;
  if (!items) return null;
  return (
    <div className="slide-list" style={{ transform: `translateX(-${slideNumber * 100}%)` }}>
      {items.map((slide, index) => (
        <Slide key={index} data={slide} />
      ))}
    </div>
  );
};

export default SlidesList;
