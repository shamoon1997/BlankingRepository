import React, { useState } from "react";

type CarouselProps = {
  items: string[];
};

export const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : items.length - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < items.length - 1 ? prevIndex + 1 : 0,
    );
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <p className="mb-[15px] text-[12px] font-bold text-[#628FEE]">
            Installation photo
          </p>
        </div>
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 transform"
        >
          &#8249;
        </button>
        <div className="flex items-center space-x-2">
          {items.map((_, index) => (
            <div
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-3 w-3 cursor-pointer rounded-full bg-gray-300 ${
                index === currentIndex ? "bg-black" : ""
              }`}
            />
          ))}
        </div>
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 transform"
        >
          &#8250;
        </button>
      </div>
      <div className="mt-4 overflow-hidden">
        <img
          src={items[currentIndex]}
          alt={`carousel-item-${currentIndex}`}
          className=" h-[338px] w-[242px] transform object-cover transition-transform duration-300"
          style={{ transform: `translateX(${-currentIndex * 100}%)` }}
        />
      </div>
    </div>
  );
};
