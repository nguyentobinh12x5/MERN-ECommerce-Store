import React from "react";
import { Carousel } from "flowbite-react";
import banner from "../assets/images/banner.jpg";
import banner2 from "../assets/images/banner2.jpg";
const CarouComponent = () => {
  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-[500px]">
      <Carousel slideInterval={2000}>
        <img src={banner} alt="..." />
        <img src={banner2} alt="..." />
      </Carousel>
    </div>
  );
};

export default CarouComponent;
