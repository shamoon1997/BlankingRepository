import React, { ChangeEvent } from "react";
import Pagination from "@mui/material/Pagination";
import { useGetPhotoLatest } from "@/api/hooks/photos/use-photo-latest";
import { useSelectedPhotos, useSelectedPhotosActions } from "@/state";

interface PhotoAccordionProps {
  hardware_id: string;
}

type selectedPhotoType = {
  photo_url: string;
  recorded_at: string;
};

export const PhotoAccordion: React.FC<PhotoAccordionProps> = ({
  hardware_id,
}) => {
  const { data, error, isLoading } = useGetPhotoLatest(
    JSON.stringify(hardware_id),
  );

  const selectedPhotos = useSelectedPhotos();
  const { setSelectedPhotos } = useSelectedPhotosActions();

  const handleCheckboxChange = (
    event: ChangeEvent<HTMLInputElement>,
    photo: selectedPhotoType,
  ) => {
    const { checked } = event.target;

    if (checked) {
      setSelectedPhotos([...selectedPhotos, photo]);
    } else {
      const filteredPhotos = selectedPhotos.filter(
        (selectedPhoto) => selectedPhoto.photo_url !== photo.photo_url,
      );
      setSelectedPhotos([...filteredPhotos]);
    }
  };

  if (isLoading) {
    return <>Loading...</>;
  }

  if (error) {
    return <>Something went wrong!</>;
  }

  return (
    <div className="flex flex-col gap-y-[15px]">
      <div className="flex flex-wrap gap-x-[65px] gap-y-[35px]">
        {data?.map((PhotosData, index) => (
          <div className="flex items-center gap-x-[22px]" key={index}>
            <div>
              <input
                type="checkbox"
                name=""
                id=""
                onChange={(e) => handleCheckboxChange(e, PhotosData)}
              />
            </div>
            <div className="flex flex-col">
              <div>
                <img
                  src={PhotosData.photo_url}
                  alt=""
                  className="h-[96px] w-[137px] flex-shrink-0"
                />
              </div>
              <div>
                <div className="font-Mont text-[12px] font-semibold leading-normal tracking-tighter text-[#161616]">
                  {PhotosData.recorded_at}
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
};
