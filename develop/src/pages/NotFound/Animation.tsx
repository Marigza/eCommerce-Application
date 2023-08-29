import React from "react";
import Lottie from "react-lottie";

import animation from "./AnimationCode.json";

interface IAnimationProps {
  isPlaying: boolean;
}

const AnimationComponent: React.FC<IAnimationProps> = ({ isPlaying }) => {
  const defaultOptions = {
    loop: true,
    autoplay: isPlaying,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return <Lottie options={defaultOptions} height="30vh" width="40vh" />;
};

export default AnimationComponent;
