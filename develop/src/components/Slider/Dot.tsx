import React, { useContext } from "react";
import { SliderContext } from "./Slider";

import "../Slider/Slider.scss";

interface INumber {
  num: number;
}

const Dot: React.FC<INumber> = (props) => {
  const { goToSlide, slideNumber } = useContext(SliderContext);

  return (
    <div
      className={`dot${slideNumber === props.num ? " selected" : ""}`}
      onClick={() => goToSlide(props.num)}
    />
  );
};

export default Dot;
