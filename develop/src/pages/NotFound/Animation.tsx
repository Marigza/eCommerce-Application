import React from "react";
import Lottie from "react-lottie";

import animation from "./AnimationCode.json";

interface AnimationProps {
  isPlaying: boolean;
}

const AnimationComponent: React.FC<AnimationProps> = ({ isPlaying }) => {
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
