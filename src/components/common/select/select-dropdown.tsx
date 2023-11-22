import { ChevronIcon } from "@/assets";
import * as Select from "@radix-ui/react-select";
import React, { ReactNode } from "react";
import SelectItem from "./select-item";
import { useSearchParams } from "react-router-dom";

type Props = {
  placeholder?: string;
  dropdownIcon?: ReactNode; //Adds fixed icon on dropdown
  options: {
    value: string;
    text: string | JSX.Element;
    icon?: JSX.Element;
  }[];
  searchParamKey?: string;
};

const SelectDropdown: React.FC<Props> = ({
  placeholder = "placeholder...",
  dropdownIcon,
  options,
  searchParamKey,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <Select.Root
      onValueChange={(value: string) => {
        if (!searchParamKey?.length) return;
        searchParams.set(searchParamKey, value);
        setSearchParams(searchParams);
      }}
    >
      <Select.Trigger
        className="inline-flex h-[35px] w-full items-center justify-between rounded-lg border border-slate-600 bg-white px-2 font-mont text-[13px] leading-none text-slate-700 outline-none hover:bg-slate-200 data-[placeholder]:text-black/40"
        aria-label="dropdown"
      >
        <div className="flex items-center font-semibold">
          {dropdownIcon}
          <Select.Value placeholder={placeholder} />
        </div>
        <Select.Icon className="text-slate-800">
          <div className="ml-2 rotate-180">
            <ChevronIcon />
          </div>
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          className="w-[var(--radix-select-trigger-width)] rounded-lg bg-white font-mont shadow-lg"
          side="bottom"
          position="popper"
        >
          <Select.Viewport className="p-2">
            <Select.Group>
              {options?.map((item, i) => {
                const key = `${item.value}-${i}`;

                return (
                  <SelectItem
                    className="cursor-pointer rounded-lg border-none p-2 text-sm outline-none hover:bg-slate-200"
                    key={key}
                    value={item.value}
                    icon={item.icon}
                  >
                    {item.text}
                  </SelectItem>
                );
              })}
            </Select.Group>
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
};

export default SelectDropdown;
