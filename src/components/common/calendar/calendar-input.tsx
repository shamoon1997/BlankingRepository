import { CalendarIcon, ChevronIcon } from "@/assets";
import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

const CalendarInput: React.FC = () => {
  return (
    <>
      <div className="inline-flex cursor-pointer items-center rounded-lg border border-slate-300 px-2 py-1">
        <div className="px-2">
          <CalendarIcon />
        </div>
        <div className="px-4">
          <p className="text-sm text-blue-400">From</p>
          <p className="text-xs">DD/MM/YYYY</p>
        </div>
        <div className="px-4">
          <p className="text-sm text-blue-400">To</p>
          <p className="text-xs">DD/MM/YYYY</p>
        </div>
        <div className="px-2 [&_svg]:rotate-180">
          <ChevronIcon />
        </div>
      </div>

      {/* --=====-=-=-=-=-=-=-=-==-==--===-][][][][][][][][]][][][][][]][][][]][] */}
      {/* --=====-=-=-=-=-=-=-=-==-==--===-][][][][][][][][]][][][][][]][][][]][] */}
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>click</DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content className="h-8 w-8 rounded-lg bg-green-300">
            <DropdownMenu.Label />
            <DropdownMenu.Item />

            <DropdownMenu.Group>
              <DropdownMenu.Item />
            </DropdownMenu.Group>

            <DropdownMenu.CheckboxItem>
              <DropdownMenu.ItemIndicator />
            </DropdownMenu.CheckboxItem>

            {/* <DropdownMenu.RadioGroup>
              <DropdownMenu.RadioItem>
                <DropdownMenu.ItemIndicator />
              </DropdownMenu.RadioItem>
            </DropdownMenu.RadioGroup> */}

            <DropdownMenu.Sub>
              <DropdownMenu.SubTrigger />
              <DropdownMenu.Portal>
                <DropdownMenu.SubContent />
              </DropdownMenu.Portal>
            </DropdownMenu.Sub>

            <DropdownMenu.Separator />
            <DropdownMenu.Arrow />
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
      {/* --=====-=-=-=-=-=-=-=-==-==--===-][][][][][][][][]][][][][][]][][][]][] */}
      {/* --=====-=-=-=-=-=-=-=-==-==--===-][][][][][][][][]][][][][][]][][][]][] */}
    </>
  );
};

export default CalendarInput;
