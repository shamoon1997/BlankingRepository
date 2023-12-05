import {
  SearchIcon,
  CalendarOpenIcon,
  PoleStatusIcon,
  LayerStatusIcon,
} from "@/assets";

export const PoleMiniFilter = () => {
  return (
    <div className="shadow-pole-filter w-full rounded-[5px] bg-white p-2">
      <div className="flex justify-between">
        <div className="flex h-[23px] w-[23px] flex-shrink-0 cursor-pointer items-center justify-center rounded-[5px] border border-solid border-[#D9D9D9] transition-all hover:border-[#222222]">
          <SearchIcon className="h-3 w-3" />
        </div>
        <div className="flex items-center gap-[15px]">
          <div className="flex h-[23px] min-w-[37px] flex-shrink-0 cursor-pointer flex-col items-center justify-center rounded-[5px] border border-solid border-[#D9D9D9] px-[7px] transition-all hover:border-[#222222]">
            <CalendarOpenIcon className="h-2.5 w-[22px]" />
          </div>

          <div className="flex h-[23px] min-w-[37px] flex-shrink-0 cursor-pointer flex-col items-center justify-center rounded-[5px] border border-solid border-[#D9D9D9] px-[7px] transition-all hover:border-[#222222]">
            <PoleStatusIcon className="h-2.5 w-[22px]" />
          </div>

          <div className="flex h-[23px] min-w-[37px] flex-shrink-0 cursor-pointer flex-col items-center justify-center rounded-[5px] border border-solid border-[#D9D9D9] px-[7px] transition-all hover:border-[#222222]">
            <LayerStatusIcon className="h-2.5 w-[22px]" />
          </div>
        </div>
      </div>
    </div>
  );
};
