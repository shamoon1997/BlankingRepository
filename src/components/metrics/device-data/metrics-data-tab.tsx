import {
  ChevronIcon,
  MoveGraphIcon,
  SearchIcon,
  ZoomInIcon,
  ZoomOutIcon,
  ZoomSectionIcon,
} from "@/assets";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import DeviceDataDropdown from "@/components/common/select/device-data-dropdown";
import { useMetricDataActions } from "@/state/device-data/metric-data-controls.store";
import {
  deviceMetricsKeys,
  metricsDataDevicesOptions,
} from "@/utils/device-data";
import MetricsDataContents from "./metrics-data-contents";
import { useQuery } from "@tanstack/react-query";
import { getMetricDataAPI } from "@/api/device-data";

const MetricsDataTab: React.FC = () => {
  const { applyMetricDeviceFilterType } = useMetricDataActions();

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

          <div className="flex w-[120px] items-center justify-between rounded border-[2px] px-[10px]">
            <div className="text-[10px] text-[#8B8B8B]">Device</div>
            <div className="text-[10px] font-semibold text-black">Map(#)</div>
          </div>

          <div className="flex w-[120px] items-center justify-between rounded border-[2px] px-[10px]">
            <div className="text-[10px] text-[#8B8B8B]">Device</div>
            <div className="text-[10px] font-semibold text-black">Map(#)</div>
          </div>

          <div className="flex w-[120px] items-center justify-between rounded border-[2px] px-[10px]">
            <div className="text-[10px] text-[#8B8B8B]">All data types</div>
            <div className="rotate-180 [&_svg]:h-[12px] [&_svg]:w-[12px]">
              <ChevronIcon />
            </div>
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
                  <MetricsDataContents key={item.key} data={data} />
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
