import { MapsIcon } from "@/assets/pole-view";

export const MapMinimizedViewErrorView = () => {
  return (
    <div>
      <div className="flex h-[70px] w-[70px] min-w-0 flex-col items-center justify-center rounded-full bg-white p-2 drop-shadow-map-minimize">
        <div className="[&_svg]:w-11.8 [&_svg]:h-18">
          <MapsIcon className="text-[#EEEEEEE]" />
        </div>
        <div className="mt-1 w-full  overflow-hidden text-ellipsis whitespace-nowrap px-0.5 text-center font-mont text-sm font-normal leading-normal text-[#5B5B5B]">
          An Error occurred when loading pole data
        </div>
      </div>
    </div>
  );
};
