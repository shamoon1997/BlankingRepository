import { SearchIcon } from "@/assets";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import React from "react";

const MetricsDataTab: React.FC = () => {
  return (
    <>
      <div className="flex gap-x-[10px]">
        <div className="mt-1 grid h-[30px] w-[30px] cursor-pointer place-content-center rounded border-[2px] p-[10px]">
          <SearchIcon className="h-[12px] w-[12px]" />
        </div>

        <div className="mt-1 flex w-[120px] items-center justify-between gap-x-[20px] rounded border-[2px] px-[10px]">
          <div className="text-[10px] text-[#8B8B8B]">Device</div>
          <div className="text-[10px] font-bold text-black">Map(#)</div>
        </div>

        <div className="mt-1 flex w-[120px] items-center justify-between gap-x-[20px] rounded border-[2px] px-[10px]">
          <div className="text-[10px] text-[#8B8B8B]">Device</div>
          <div className="text-[10px] font-bold text-black">Map(#)</div>
        </div>

        <div className="mt-1 flex w-[120px] items-center justify-between gap-x-[20px] rounded border-[2px] px-[10px]">
          <div className="text-[10px] text-[#8B8B8B]">Device</div>
          <div className="text-[10px] font-bold text-black">Map(#)</div>
        </div>

        <div className="mt-1 flex w-[120px] items-center justify-between gap-x-[20px] rounded border-[2px] px-[10px]">
          <div className="text-[10px] text-[#8B8B8B]">Device</div>
          <div className="text-[10px] font-bold text-black">Map(#)</div>
        </div>

        <div className="mt-1 w-[154px]">
          <ToggleGroup.Root
            className="inline-flex h-[30px] w-full justify-between rounded-sm "
            type="single"
            defaultValue="center"
            aria-label="Text alignment"
          >
            <ToggleGroup.Item
              value="left"
              className="grid w-full place-content-center border-[2px] bg-white p-[10px] text-base first:rounded-l last:rounded-r hover:bg-blue-100 focus:outline-none data-[state=on]:border-[#5283ED] data-[state=on]:bg-[#DBE6FF]"
              aria-label="Left aligned"
            >
              1
            </ToggleGroup.Item>
            <ToggleGroup.Item
              value="center"
              className="grid w-full place-content-center border-[2px] bg-white p-[10px] text-base first:rounded-l last:rounded-r hover:bg-blue-100 focus:outline-none data-[state=on]:border-[#5283ED] data-[state=on]:bg-[#DBE6FF]"
              aria-label="Center aligned"
            >
              2
            </ToggleGroup.Item>
            <ToggleGroup.Item
              value="right"
              className="grid w-full place-content-center border-[2px] bg-white p-[10px] text-base first:rounded-l last:rounded-r hover:bg-blue-100 focus:outline-none data-[state=on]:border-[#5283ED] data-[state=on]:bg-[#DBE6FF]"
              aria-label="Right aligned"
            >
              3
            </ToggleGroup.Item>
          </ToggleGroup.Root>
        </div>
      </div>
    </>
  );
};

export default MetricsDataTab;
