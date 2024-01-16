import React from "react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import {
  ZoomInIcon,
  ZoomOutIcon,
  MoveGraphIcon,
  ZoomSectionIcon,
} from "@/assets";

const DeviceDataGraphControls: React.FC = () => {
  return (
    <ToggleGroup.Root
      className="inline-flex h-[30px] w-full justify-between rounded-sm "
      type="single"
      defaultValue="center"
      aria-label="Text alignment"
    >
      <ToggleGroup.Item
        value="1"
        className="grid w-full place-content-center border-[2px] bg-white p-[10px] text-base first:rounded-l last:rounded-r hover:bg-blue-100 focus:outline-none data-[state=on]:border-[#5283ED] data-[state=on]:bg-[#DBE6FF]"
        aria-label="Left aligned"
      >
        <div className="h-[12px] w-[12px]">
          <ZoomInIcon />
        </div>
      </ToggleGroup.Item>
      <ToggleGroup.Item
        value="2"
        className="grid w-full place-content-center border-[2px] bg-white p-[10px] text-base first:rounded-l last:rounded-r hover:bg-blue-100 focus:outline-none data-[state=on]:border-[#5283ED] data-[state=on]:bg-[#DBE6FF]"
        aria-label="Center aligned"
      >
        <div className="h-[12px] w-[12px]">
          <ZoomOutIcon />
        </div>
      </ToggleGroup.Item>
      <ToggleGroup.Item
        value="3"
        className="grid w-full place-content-center border-[2px] bg-white p-[10px] text-base first:rounded-l last:rounded-r hover:bg-blue-100 focus:outline-none data-[state=on]:border-[#5283ED] data-[state=on]:bg-[#DBE6FF]"
        aria-label="Center aligned"
      >
        <div className="h-[12px] w-[12px]">
          <MoveGraphIcon />
        </div>
      </ToggleGroup.Item>
      <ToggleGroup.Item
        value="4"
        className="grid w-full place-content-center border-[2px] bg-white p-[10px] text-base first:rounded-l last:rounded-r hover:bg-blue-100 focus:outline-none data-[state=on]:border-[#5283ED] data-[state=on]:bg-[#DBE6FF]"
        aria-label="Right aligned"
      >
        <div className="h-[12px] w-[12px]">
          <ZoomSectionIcon />
        </div>
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  );
};

export default DeviceDataGraphControls;
