import { ForwardArrowIcon } from "@/assets";
import { MapBlobIcon } from "@/assets/misc";
import { PhotoMissing } from "../photo-missing/photo-missing";
import { PhotoComparisonTable } from "../photo-comparison-table/photo-comparison-table";
import { useState } from "react";

const items = [
  {
    imageLink: "https://i.postimg.cc/kMvpxHYX/20230629-T234418-Z-188875-2.png",
    deviceId: "GS1244. 1535142",
    network: "Offline",
    time: "Aug 11, 2022 4:03:58 PM",
  },
  {
    imageLink: "https://i.postimg.cc/25KVXmkd/20230629-T234418-Z-188875-1.png",
    deviceId: "GS1244. 1535142",
    network: "Lora",
    time: "Aug 11, 2022 4:03:58 PM",
  },
  {
    imageLink: "https://i.postimg.cc/kMvpxHYX/20230629-T234418-Z-188875-2.png",
    deviceId: "GS1244. 1535142",
    network: "Online",
    time: "Aug 11, 2022 4:03:58 PM",
  },
  {
    imageLink: "",
    deviceId: "GS1244. 1535142",
    network: "Spotty",
    time: "Aug 11, 2022 4:03:58 PM",
  },
];

export const PhotoComparison = () => {
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
  console.log("currentIndex: " + currentIndex);

  return (
    <div className="flex w-full flex-col overflow-hidden p-4">
      <div className="flex justify-between">
        <div className="font-mont text-[15px] font-semibold text-[#161616] ">
          Comparing 3 Photos
        </div>
        <div className="flex cursor-pointer items-center justify-center gap-x-[10px]">
          <div
            className="rotate-180 transform [&_svg]:h-4 [&_svg]:w-4"
            onClick={handlePrev}
          >
            <ForwardArrowIcon />
          </div>
          <div className="[&_svg]:h-4 [&_svg]:w-4" onClick={handleNext}>
            <ForwardArrowIcon />
          </div>
        </div>
      </div>

      <div className="flex w-full gap-x-[30px]">
        {items.map((item, index) => (
          <div
            key={index}
            className="h-[311px] w-[360px] flex-shrink-0 rounded-[5px] border-[1px] border-solid border-[#CCCCCC] bg-white shadow-pole-filter"
            style={{
              transform: `translateX(-${currentIndex * (360 + 30)}px)`,
              transition: "transform 0.5s ease",
            }}
          >
            <div className="h-[270px] w-full overflow-hidden">
              {item.imageLink ? (
                <img
                  src={`${item.imageLink}`}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : (
                <PhotoMissing />
              )}
            </div>
            <div className="flex items-center justify-between gap-x-[3px] p-[10px]">
              <div className="flex gap-x-[3px]">
                <div>
                  <MapBlobIcon />
                </div>
                <div className="flex">
                  <div className="font-mont text-[12px] font-semibold text-[#161616]">
                    {item.deviceId}
                  </div>
                  <div className="font-mont text-[12px] font-semibold text-[#161616]">
                    {item.network}
                  </div>
                </div>
              </div>

              <div className="font-mont text-[12px] font-semibold text-[#161616]">
                {item.time}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <div className="mt-6 h-[0.5px] w-full bg-[#CCC]"></div>
      </div>

      <div>
        <PhotoComparisonTable />
      </div>
    </div>
  );
};
