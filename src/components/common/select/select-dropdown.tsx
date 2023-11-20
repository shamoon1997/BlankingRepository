import { ChevronIcon, FilterIcon } from "@/assets";
import * as Select from "@radix-ui/react-select";
import React from "react";
import SelectItem from "./select-item";

type Props = {
  placeholder?: string;
};

const SelectDropdown: React.FC<Props> = ({
  placeholder = "placeholder...",
}) => (
  <Select.Root>
    <Select.Trigger
      className="inline-flex h-[35px] w-full items-center justify-between rounded-lg border border-slate-600 bg-white px-2 font-mont text-[13px] leading-none text-slate-600 outline-none hover:bg-slate-200 data-[placeholder]:text-black/40"
      aria-label="Food"
    >
      <div className="flex items-center gap-1">
        <span className="[&_svg]:h-[25px] [&_svg]:w-[25px]">
          <FilterIcon />
        </span>
        <Select.Value placeholder={placeholder} />
      </div>
      <Select.Icon className="text-slate-600">
        <div className="rotate-180">
          <ChevronIcon />
        </div>
      </Select.Icon>
    </Select.Trigger>
    <Select.Portal>
      <Select.Content
        className="min-w-[140px] rounded-lg bg-white font-mont shadow-lg"
        side="bottom"
        position="popper"
      >
        <Select.Viewport className="p-2">
          <Select.Group>
            {/* <Select.Label className="p-1 text-xs leading-[25px]">
              Fruits
            </Select.Label> */}
            <SelectItem
              className="cursor-pointer rounded-lg border-none p-2 text-sm outline-none hover:bg-slate-200"
              value="all"
              icon={
                <div className="mr-2 inline-flex h-[8px] w-[8px] rounded-full border border-slate-400" />
              }
            >
              All
            </SelectItem>
            <SelectItem
              className="cursor-pointer rounded-lg border-none p-2 text-sm outline-none hover:bg-slate-200"
              value="online"
              icon={
                <div className="mr-2 inline-flex h-[8px] w-[8px] rounded-full bg-online" />
              }
            >
              Online
            </SelectItem>
            <SelectItem
              className="cursor-pointer rounded-lg border-none p-2 text-sm outline-none hover:bg-slate-200"
              value="offline"
              icon={
                <div className="mr-2 inline-flex h-[8px] w-[8px] rounded-full bg-offline" />
              }
            >
              Offline
            </SelectItem>
            <SelectItem
              className="cursor-pointer rounded-lg border-none p-2 text-sm outline-none hover:bg-slate-200"
              value="spotty"
              icon={
                <div className="mr-2 inline-flex h-[8px] w-[8px] rounded-full bg-spotty" />
              }
            >
              Spotty
            </SelectItem>
          </Select.Group>

          <Select.Separator className="bg-violet6 m-[5px] h-[1px]" />
        </Select.Viewport>
        <Select.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-slate-600">
          <div className="rotate-180">
            <ChevronIcon />
          </div>
        </Select.ScrollDownButton>
      </Select.Content>
    </Select.Portal>
  </Select.Root>
);

export default SelectDropdown;
