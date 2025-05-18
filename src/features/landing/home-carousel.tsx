import React from "react";

import { Carousel } from "react-responsive-carousel";

import "react-responsive-carousel/lib/styles/carousel.min.css";

const CustomCarousel = () => {
  return (
    <div className="relative h-[calc(100vh-112px)] w-full">
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/40 px-4 text-center text-white">
        <h2 className="mb-2 text-3xl font-bold md:text-4xl">
          Style That Doesn’t Cost the Earth
        </h2>
        <p className="max-w-2xl text-lg">
          Discover unique, eco-friendly second-hand treasures — from fashion to
          furniture — all at prices you'll love.
        </p>
      </div>

      <Carousel
        autoPlay
        interval={5000}
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showIndicators={true}
        showArrows={true}
        stopOnHover={false}
      >
        <div>
          <img
            src="/clothe.jpg"
            alt="Slide 1"
            className="h-[calc(100vh-112px)] w-full object-cover"
          />
        </div>
        <div>
          <img
            src="/electronic.jpg"
            alt="Slide 2"
            className="h-[calc(100vh-112px)] w-full object-cover"
          />
        </div>
        <div>
          <img
            src="/furniture.jpg"
            alt="Slide 3"
            className="h-[calc(100vh-112px)] w-full object-cover"
          />
        </div>
      </Carousel>
    </div>
  );
};

export default CustomCarousel;
