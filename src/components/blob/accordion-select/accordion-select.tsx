import * as React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { AccordionDownIcon } from "@/assets";

export const AccordionSelectDropDown: React.FC = () => {
  const [selectedValue, setSelectedValue] = React.useState(""); // State to track the selected value

  const handleSelect = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <div className="mt-[5px] flex items-center justify-center gap-x-[2px] rounded-md border-[3px] border-solid border-[#F5F5F5]">
          <div>
            <button className="font-mont text-[12px] font-semibold leading-normal tracking-tighter text-[#8B8B8B]">
              {selectedValue || "Date/Time"}
            </button>
          </div>
          <div className="flex items-center justify-center">
            <AccordionDownIcon />
          </div>
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="shadow-accordion ml-[25px] h-[124px] w-[142px] flex-shrink-0 rounded-[4px] border border-solid border-[#5B5B5B80] bg-white">
        <DropdownMenu.Item onSelect={() => handleSelect("Date/Time")}>
          <div className="flex cursor-pointer items-center gap-x-[10px] border-b-[0.5px] border-solid border-[#D9D9D9] p-2">
            <div>
              <input type="radio" name="" id="" />
            </div>
            <div className="font-mont text-[10px] font-normal leading-normal tracking-tighter text-[#161616]">
              Date/Time
            </div>
          </div>
        </DropdownMenu.Item>

        <DropdownMenu.Item onSelect={() => handleSelect("Time Only")}>
          <div className="flex cursor-pointer items-center gap-x-[10px] border-b-[0.5px] border-solid border-[#D9D9D9] p-2">
            <div>
              <input type="radio" name="" id="" />
            </div>
            <div className="font-mont text-[10px] font-normal leading-normal tracking-tighter text-[#161616]">
              Time Only
            </div>
          </div>
        </DropdownMenu.Item>

        <DropdownMenu.Item onSelect={() => handleSelect("Inodes Index")}>
          <div className="flex cursor-pointer items-center gap-x-[10px] p-2">
            <div>
              <input type="radio" name="" id="" />
            </div>
            <div className="font-mont text-[10px] font-normal leading-normal tracking-tighter text-[#161616]">
              Inodes Index
            </div>
          </div>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
