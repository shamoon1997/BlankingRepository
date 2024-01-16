import { PointingArrowIcon, TimeIcon } from "@/assets";
import { useCalendarUrlState } from "@/hooks/calendar";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Tabs from "@radix-ui/react-tabs";
import { format, fromUnixTime } from "date-fns";
import { toSentenceCase } from "js-convert-case";
import React, { useState } from "react";
import { MetricCalendarCustomRange, MetricDataCalendar } from "../calendar";

const DeviceDataDateControls: React.FC = () => {
  const [tabValue, setTabValue] = useState<string>("default");
  const { validatedCalendarUrlState } = useCalendarUrlState();

  let from;
  if (typeof validatedCalendarUrlState.from === "number") {
    from = format(
      fromUnixTime(validatedCalendarUrlState.from),
      "MM/dd/yyyy hh:mm a",
    );
  } else {
    from = toSentenceCase(validatedCalendarUrlState.from);
  }

  let to;
  if (typeof validatedCalendarUrlState.to === "number") {
    to = format(
      fromUnixTime(validatedCalendarUrlState.to),
      "MM/dd/yyyy hh:mm a",
    );
  } else {
    to = toSentenceCase(validatedCalendarUrlState.to);
  }

  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="flex h-[32px] min-w-[186px] cursor-pointer items-center justify-between rounded border-[2px] px-[10px]">
          <div className="mr-[5px] [&_path]:fill-[#8B8B8B] [&_svg]:h-[10px] [&_svg]:w-[10px]">
            <TimeIcon />
          </div>
          <p className="text-[10px] text-[#8B8B8B]">{from ?? "DD/MM/YYYY"}</p>
          <div className="mx-[9px] [&_svg]:h-[10px] [&_svg]:w-[10px]">
            <PointingArrowIcon />
          </div>
          <p className="text-[10px] text-[#8B8B8B]">{to ?? "DD/MM/YYYY"}</p>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className="min-w-[--radix-dropdown-menu-trigger-width] rounded border bg-white">
          <Tabs.Root
            onValueChange={(e) => setTabValue(e)}
            value={tabValue}
            onClick={(e) => e.stopPropagation()}
          >
            <Tabs.List className="flex border-b-[0.5px] border-slate-200 pt-2">
              <Tabs.Trigger
                className="group flex-1 justify-center"
                value="default"
              >
                <span className="inline-block h-[22px] min-w-min border-b-[2px] border-transparent text-[11px] font-semibold group-data-[state=active]:border-b-[1.5px] group-data-[state=active]:border-primary-blue group-data-[state=active]:text-primary-blue">
                  Default
                </span>
              </Tabs.Trigger>
              <Tabs.Trigger
                className="group flex-1 justify-center"
                value="custom"
              >
                <span className="inline-block h-[22px] min-w-min border-b-[2px] border-transparent text-[11px] font-semibold  group-data-[state=active]:border-b-[1.5px] group-data-[state=active]:border-primary-blue group-data-[state=active]:text-primary-blue">
                  Custom
                </span>
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="default">
              <MetricCalendarCustomRange
                onApply={() => {
                  //
                }}
              />
            </Tabs.Content>
            <Tabs.Content value="custom">
              <div className="px-[8px] py-[7px]">
                <MetricDataCalendar
                  onApply={() => {
                    //
                  }}
                />
              </div>
            </Tabs.Content>
          </Tabs.Root>
          {/*  */}
          {/*  */}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </>
  );
};

export default DeviceDataDateControls;
