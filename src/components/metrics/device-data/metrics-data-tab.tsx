import { getMetricDataAPI } from "@/api/device-data";
import {
  ChevronIcon,
  MoveGraphIcon,
  PointingArrowIcon,
  SearchIcon,
  TimeIcon,
  ZoomInIcon,
  ZoomOutIcon,
  ZoomSectionIcon,
} from "@/assets";
import DeviceDataDropdown from "@/components/common/select/device-data-dropdown";
import { useCalendarUrlState } from "@/hooks/calendar";
import { useMetricDataActions } from "@/state/device-data/metric-data-controls.store";
import {
  deviceMetricsKeys,
  metricsDataDevicesOptions,
} from "@/utils/device-data";
import * as Accordion from "@radix-ui/react-accordion";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Tabs from "@radix-ui/react-tabs";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { useQuery } from "@tanstack/react-query";
import { format, fromUnixTime } from "date-fns";
import { toSentenceCase } from "js-convert-case";
import React, { useState } from "react";
import MetricsDataContents from "./metrics-data-contents";
import { CustomTimeRanges } from "@/components/filters/calendar/custom-time-ranges";
import { FilterCalendar } from "@/components/filters/calendar/filter-calendar";

const MetricsDataTab: React.FC = () => {
  const [tabValue, setTabValue] = useState<string>("default");

  const { applyMetricDeviceFilterType } = useMetricDataActions();
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

  const { data } = useQuery({
    queryKey: ["metric-data"],
    queryFn: async () => {
      return getMetricDataAPI();
    },
  });

  return (
    <>
      <div className="mt-[12px] flex w-full justify-between px-4">
        <div className="flex gap-x-[10px]">
          <div className="grid h-[30px] w-[30px] cursor-pointer place-content-center rounded border-[2px] p-[10px]">
            <SearchIcon className="h-[12px] w-[12px]" />
          </div>

          <div className="flex w-[120px] items-center justify-between rounded border-[2px] px-[10px]">
            <DeviceDataDropdown
              // triggerIcon={
              //   <div className="text-[10px] text-[#8B8B8B]">Device</div>
              // }
              placeholder="Devices"
              valChangeFunc={(val) => {
                applyMetricDeviceFilterType(val);
              }}
              options={metricsDataDevicesOptions}
            />
            {/* <div className="text-[10px] text-[#8B8B8B]">Device</div>
            <div className="text-[10px] font-semibold text-black">Map(#)</div> */}
          </div>

          <div>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger className="flex h-[32px] min-w-[186px] cursor-pointer items-center justify-between rounded border-[2px] px-[10px]">
                <div className="mr-[5px] [&_path]:fill-[#8B8B8B] [&_svg]:h-[10px] [&_svg]:w-[10px]">
                  <TimeIcon />
                </div>
                <p className="text-[10px] text-[#8B8B8B]">
                  {from ?? "DD/MM/YYYY"}
                </p>
                <div className="mx-[9px] [&_svg]:h-[10px] [&_svg]:w-[10px]">
                  <PointingArrowIcon />
                </div>
                <p className="text-[10px] text-[#8B8B8B]">
                  {to ?? "DD/MM/YYYY"}
                </p>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content className="min-w-[--radix-dropdown-menu-trigger-width] rounded border bg-white">
                {/*  */}
                {/*  */}
                <Tabs.Root
                  onValueChange={(e) => {
                    setTabValue(e);
                  }}
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
                    <CustomTimeRanges
                      onApply={() => {
                        //
                      }}
                    />
                  </Tabs.Content>
                  <Tabs.Content value="custom">
                    <div className="px-[8px] py-[7px]">
                      <FilterCalendar
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
          </div>

          <div className="">
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
          </div>
        </div>

        <button className="grid h-[32px] w-[130px] place-content-center rounded-sm bg-[#EDEDED] text-[8px]">
          Exfil Per-Blob
        </button>
      </div>

      <div className="mt-[12px] h-[0.5px] w-full bg-[#D9D9D9]" />

      {/* ACCORDIONS */}

      <Accordion.Root
        className="mt-[15px] flex w-full flex-col gap-[10px] rounded-md  px-4"
        type="multiple"
      >
        {deviceMetricsKeys.map((item) => {
          return (
            <>
              <Accordion.Item
                className="bg-[#F5F5F5]  text-[12px]"
                value={item.key}
                key={item.key}
              >
                <Accordion.Trigger className="group w-full px-[12px] py-[10px]">
                  <div className="flex items-center gap-[20px]">
                    <div className="h-[12px] w-[12px] group-data-[state=closed]:rotate-180 group-data-[state=open]:rotate-0">
                      <ChevronIcon />
                    </div>
                    <p>
                      {item.title}
                      <span className="ml-[15px] text-[#8A8A8A]">
                        (1 panel)
                      </span>
                    </p>
                  </div>
                </Accordion.Trigger>
                <Accordion.Content>
                  {/* Will be different for other keys */}
                  <MetricsDataContents metricKey={item.key} data={data?.data} />
                  {/* ================================ */}
                </Accordion.Content>
              </Accordion.Item>
            </>
          );
        })}
      </Accordion.Root>
    </>
  );
};

export default MetricsDataTab;
