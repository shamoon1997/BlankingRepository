import React from "react";
import Pagination from "@mui/material/Pagination";

const PhotosData = [
  {
    image: "https://i.postimg.cc/kMvpxHYX/20230629-T234418-Z-188875-2.png",
    time: "Aug 11, 2022 4:03:58 PM",
  },
  {
    image: "https://i.postimg.cc/kMvpxHYX/20230629-T234418-Z-188875-2.png",
    time: "Aug 11, 2022 4:03:58 PM",
  },
  {
    image: "https://i.postimg.cc/kMvpxHYX/20230629-T234418-Z-188875-2.png",
    time: "Aug 11, 2022 4:03:58 PM",
  },
  {
    image: "https://i.postimg.cc/kMvpxHYX/20230629-T234418-Z-188875-2.png",
    time: "Aug 11, 2022 4:03:58 PM",
  },
  {
    image: "https://i.postimg.cc/kMvpxHYX/20230629-T234418-Z-188875-2.png",
    time: "Aug 11, 2022 4:03:58 PM",
  },
  {
    image: "https://i.postimg.cc/kMvpxHYX/20230629-T234418-Z-188875-2.png",
    time: "Aug 11, 2022 4:03:58 PM",
  },
  {
    image: "https://i.postimg.cc/kMvpxHYX/20230629-T234418-Z-188875-2.png",
    time: "Aug 11, 2022 4:03:58 PM",
  },
  {
    image: "https://i.postimg.cc/kMvpxHYX/20230629-T234418-Z-188875-2.png",
    time: "Aug 11, 2022 4:03:58 PM",
  },
  {
    image: "https://i.postimg.cc/kMvpxHYX/20230629-T234418-Z-188875-2.png",
    time: "Aug 11, 2022 4:03:58 PM",
  },
  {
    image: "https://i.postimg.cc/kMvpxHYX/20230629-T234418-Z-188875-2.png",
    time: "Aug 11, 2022 4:03:58 PM",
  },
];
export const PhotoAccordion: React.FC = () => (
  <div className="flex flex-col gap-y-[15px]">
    <div className="flex flex-wrap gap-x-[65px] gap-y-[35px]">
      {PhotosData.map((PhotosData) => (
        <div className="flex items-center gap-x-[22px]">
          <div>
            <input type="checkbox" name="" id="" />
          </div>
          <div className="flex flex-col">
            <div>
              <img
                src={PhotosData.image}
                alt=""
                className="h-[96px] w-[137px] flex-shrink-0"
              />
            </div>
            <div>
              <div className="font-Mont text-[12px] font-semibold leading-normal tracking-tighter text-[#161616]">
                {PhotosData.time}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>

    <div className="flex items-center justify-center">
      <div>
        <Pagination count={10} />
      </div>
    </div>
  </div>
);
