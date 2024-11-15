import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ReactNode } from "react";

interface CarouselWrapper {
  cardList: ReactNode[];
}

export const CarouselWrapper = ({ cardList }: CarouselWrapper) => {
  const settings: Settings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return <Slider {...settings}>{cardList}</Slider>;
};
