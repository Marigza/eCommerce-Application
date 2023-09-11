import React, { useEffect, useState, createContext } from "react";

import Arrows from "./Arrow";
import Dots from "./Dots";
import SlidesList from "./SlidesList";

interface IContext {
  goToSlide: (arg: number) => void;
  changeSlide: (arg: number) => void;
  slidesCount?: number;
  slideNumber?: number;
  items?: ImageContent[];
}

export const SliderContext = createContext<IContext>({
  goToSlide: () => {},
  changeSlide: () => {},
});

interface ImageContent {
  url: string;
  dimensions: {
    w: number;
    h: number;
  };
}

interface SliderProps {
  images: ImageContent[];
  width?: "%" | "px";
  height?: "%" | "px";
}

const Slider: React.FC<SliderProps> = (props) => {
  const [items, setItems] = useState<ImageContent[]>([]);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const images = props.images;

    if (images) {
      setItems(images);
    }
  }, [props.images]);

  if (!items?.length) return null;

  const changeSlide = (direction = 1) => {
    let slideNumber = 0;

    if (slide + direction < 0) {
      slideNumber = items.length - 1;
    } else {
      slideNumber = (slide + direction) % items.length;
    }

    setSlide(slideNumber);
  };

  const goToSlide = (num: number) => {
    setSlide(num);
  };

  return (
    <div style={{ width: 300, height: 500 }} className="slider">
      <SliderContext.Provider
        value={{
          goToSlide,
          changeSlide,
          slidesCount: items.length,
          slideNumber: slide,
          items,
        }}
      >
        {items.length > 1 && <Arrows />}
        {items.length > 1 && <SlidesList />}
        {items.length > 1 && <Dots />}
      </SliderContext.Provider>
    </div>
  );
};

export default Slider;
