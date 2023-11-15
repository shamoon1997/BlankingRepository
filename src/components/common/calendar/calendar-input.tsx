import { CalendarIcon, ChevronIcon } from "@/assets";
import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Tabs from "@radix-ui/react-tabs";
import { DateRangeCalendar } from "..";

const CalendarInput: React.FC = () => {
  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <div className="inline-flex cursor-pointer items-center rounded-lg border border-slate-300 px-2 py-1">
            <div className="px-2">
              <CalendarIcon />
            </div>
            <div className="px-4">
              <p className="text-left text-sm text-blue-400">From</p>
              <p className="text-xs">DD/MM/YYYY</p>
            </div>
            <div className="px-4">
              <p className="text-left text-sm text-blue-400">To</p>
              <p className="text-xs">DD/MM/YYYY</p>
            </div>
            <div className="px-2 [&_svg]:rotate-180">
              <ChevronIcon />
            </div>
          </div>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content className="mt-2 w-full min-w-[360px] rounded-lg border border-slate-200 bg-white shadow-xl">
            {/*  */}
            {/*  */}
            <Tabs.Root defaultValue="1">
              <Tabs.List className="mb-2 flex justify-center gap-4 border-b-2 border-slate-200 pt-2">
                <Tabs.Trigger
                  className="data-[state=active]:border-b-2 data-[state=active]:border-blue-400 data-[state=active]:text-blue-400"
                  value="1"
                >
                  Default
                </Tabs.Trigger>
                <Tabs.Trigger
                  className="data-[state=active]:border-b-2 data-[state=active]:border-blue-400 data-[state=active]:text-blue-400"
                  value="2"
                >
                  Custom
                </Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content className="px-6 py-2" value="1">
                <ul>
                  <li className="py-1">
                    <input type="radio" /> Last 30 minutes
                  </li>
                  <li className="py-1">
                    <input type="radio" /> Last hour
                  </li>
                  <li className="py-1">
                    <input type="radio" /> Last 3 hours
                  </li>
                  <li className="py-1">
                    <input type="radio" /> Last 6 hours
                  </li>
                  <li className="py-1">
                    <input type="radio" /> Last 12 hours
                  </li>
                  <li className="py-1">
                    <input type="radio" /> Today
                  </li>
                  <li className="py-1">
                    <input type="radio" /> Last 7 days
                  </li>
                </ul>
              </Tabs.Content>
              <Tabs.Content
                className="grid place-content-center px-6 py-2"
                value="2"
              >
                <DateRangeCalendar />
              </Tabs.Content>
            </Tabs.Root>
            {/*  */}
            {/*  */}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </>
  );
};

export default CalendarInput;
