import { ForwardArrowIcon } from "@/assets";
import { MapBlobIcon } from "@/assets/misc";
import { PhotoMissing } from "../photo-missing/photo-missing";
import { PhotoComparisonTable } from "../photo-comparison-table/photo-comparison-table";
import { useState } from "react";
import { useSelectedPhotos } from "@/state";
import { CrossIcon, BlobMapIcon } from "@/assets/misc";

type selectedPhotoType = {
  photo_url: string;
  recorded_at: string;
};

export const PhotoComparison = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [analyzePhoto, setAnalyzePhoto] = useState<
    selectedPhotoType | undefined
  >(undefined);
  const selectedPhotos = useSelectedPhotos();

  selectedPhotos.forEach((photo, index) => {
    console.log(`Photo ${index + 1}:`, photo);
  });

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : selectedPhotos.length - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < selectedPhotos.length - 1 ? prevIndex + 1 : 0,
    );
  };

  return (
    <div className="flex h-full w-full flex-col overflow-hidden p-4">
      {!analyzePhoto ? (
        <>
          <div className="flex justify-between">
            <div className="font-mont text-[15px] font-semibold text-[#161616] ">
              {`Comparing ${selectedPhotos.length} Photos`}
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
            {selectedPhotos.map((item, index) => (
              <div
                key={index}
                className="h-[311px] w-[360px] flex-shrink-0 cursor-pointer rounded-[5px] border-[1px] border-solid border-[#CCCCCC] bg-white shadow-pole-filter"
                style={{
                  transform: `translateX(-${currentIndex * (360 + 30)}px)`,
                  transition: "transform 0.5s ease",
                }}
                onClick={() => setAnalyzePhoto(item)}
              >
                <div className="h-[270px] w-full overflow-hidden">
                  {item.photo_url ? (
                    <img
                      src={`${item.photo_url}`}
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
                        GS 1290012312..
                      </div>
                      <div className="font-mont text-[12px] font-semibold text-[#161616]">
                        Lora
                      </div>
                    </div>
                  </div>

                  <div className="font-mont text-[12px] font-semibold text-[#161616]">
                    {item.recorded_at}
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
        </>
      ) : (
        <div className="flex flex-grow">
          <div className="relative w-full">
            <img
              src={analyzePhoto.photo_url}
              alt=""
              className="h-full w-full"
            />
            <div className="absolute bottom-[278px] left-2 flex gap-x-[6px]">
              <div
                className="flex h-[32px] w-[32px] flex-shrink-0 cursor-pointer items-center justify-center rounded-[4px]
              bg-white [&_svg]:h-2.5
              [&_svg]:w-2.5
              "
                onClick={() => setAnalyzePhoto(undefined)}
              >
                <CrossIcon />
              </div>

              <div className="flex h-[32px] items-center justify-center gap-x-[3px] rounded-[5px] bg-white px-[12px] py-[4px]">
                <div>
                  <BlobMapIcon />
                </div>
                <div className="letter-spacing-[-0.6px] font-mont text-[12px] font-semibold leading-normal tracking-tight text-[#161616]">
                  GS1244 • 1535142 • Lora
                </div>
              </div>

              <div className="flex h-[32px] items-center justify-center gap-x-[24px] rounded-[5px] bg-white px-[12px] py-[4px]">
                <div className="letter-spacing-[-0.6px] font-mont text-[12px] font-semibold leading-normal tracking-tight text-[#161616]">
                  Birmingham city
                </div>
              </div>

              <div className="flex h-[32px] items-center justify-center gap-x-[24px] rounded-[5px] bg-white px-[12px] py-[4px]">
                <div className="letter-spacing-[-0.6px] font-mont text-[12px] font-semibold leading-normal tracking-tight text-[#161616]">
                  {analyzePhoto.recorded_at}
                </div>
              </div>

              <div className="flex h-[32px] items-center justify-center gap-x-[24px] rounded-[5px] bg-white px-[12px] py-[4px]">
                <div className="letter-spacing-[-0.6px] font-mont text-[12px] font-semibold leading-normal tracking-tight text-[#161616]">
                  {analyzePhoto.photo_url.slice(0, 6)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
