import { TakePhotoTable } from "../take-photo-table/take-photo-table";

export const PhotoRetrival = () => {
  const showRetrivals = true;
  return (
    <div className="flex w-full flex-col p-4">
      <div className="font-mont text-[12px] font-semibold text-[#628FEE]">
        {showRetrivals ? (
          <span>Available Retrievals (5)</span>
        ) : (
          <span>Take New Photo (3)</span>
        )}
      </div>
      <div>
        <TakePhotoTable />
      </div>
    </div>
  );
};
