import React, { useContext } from "react";
import { SliderContext } from "./Slider";
import Dot from "./Dot";

import "./Slider.scss";

const Dots: React.FC = () => {
  const { slidesCount } = useContext(SliderContext);

  if (!slidesCount) return null;

  const renderDots = () => {
    const dots = [];
    for (let i = 0; i < slidesCount; i++) {
      dots.push(<Dot key={`dot-${i}`} num={i} />);
    }

    return dots;
  };

  return <div className="dots">{renderDots()}</div>;
};

export default Dots;
