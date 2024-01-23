import { PhotoGalleryTable } from "../photo-gallery-table/photo-gallery-table";
import { PhotoComparison } from "../photo-comparison/photo-comparison";
import { TakePhoto } from "../misc/take-photo";
import { useState } from "react";

export const PhotoGallery = () => {
  const [showComparsion, setShowComparsion] = useState<Boolean>(false);

  return (
    <div className="flex h-[100vh] w-full flex-col overflow-hidden">
      <div className="flex w-full">
        <div className="flex  h-[32px] w-[130px] flex-shrink-0 cursor-pointer items-center justify-center rounded-[4px] border-[0.3px] border-solid border-[#3B3C4F] bg-[#3B3C4F] text-white">
          <div
            className="font-mont text-[8px] font-semibold capitalize leading-[9px] tracking-tighter text-white"
            onClick={() => setShowComparsion(true)}
          >
            Compare Photo
          </div>
        </div>
        <TakePhoto />
      </div>
      <div className="flex h-full w-full">
        {showComparsion ? <PhotoComparison /> : <PhotoGalleryTable />}
      </div>
    </div>
  );
};
