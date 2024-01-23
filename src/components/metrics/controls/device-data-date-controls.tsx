import { PointingArrowIcon, TimeIcon } from "@/assets";
import { useMetricReadToFrom } from "@/hooks/calendar";
import { useCalendarTimeZone } from "@/state";
import { DateFormatOptions } from "@/utils/date";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Tabs from "@radix-ui/react-tabs";
import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import React, { useState } from "react";
import { MetricCalendarCustomRange, MetricDataCalendar } from "../calendar";

const DeviceDataDateControls: React.FC = () => {
  const [tabValue, setTabValue] = useState<string>("default");
  const { from, to } = useMetricReadToFrom();
  const timezone = useCalendarTimeZone();

  const getFormat = (timeStamp: number, timeZone = timezone) => {
    return format(
      utcToZonedTime(timeStamp * 1000, timeZone),
      DateFormatOptions.ddMMyyyy24Hr,
    );
  };

  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="flex h-[32px] min-w-[232px] cursor-pointer items-center justify-between rounded border-[2px] px-[10px]">
          <div className="mr-[5px] [&_path]:fill-[#8B8B8B] [&_svg]:h-[10px] [&_svg]:w-[10px]">
            <TimeIcon />
          </div>
          <p className="text-[10px] text-[#8B8B8B]">
            {getFormat(from) ?? "DD/MM/YYYY"}
          </p>
          <div className="mx-[9px] [&_svg]:h-[10px] [&_svg]:w-[10px]">
            <PointingArrowIcon />
          </div>
          <p className="text-[10px] text-[#8B8B8B]">
            {getFormat(to) ?? "DD/MM/YYYY"}
          </p>
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
