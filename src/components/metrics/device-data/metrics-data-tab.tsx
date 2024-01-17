import { getMetricDataAPI } from "@/api/device-data";
import { ChevronIcon } from "@/assets";
import { useMetricDataActions } from "@/state/device-data/metric-data-controls.store";
import {
  deviceMetricsKeys,
  metricsDataDevicesOptions,
} from "@/utils/device-data";
import * as Accordion from "@radix-ui/react-accordion";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
  DeviceDataDateControls,
  DeviceDataDropdown,
  DeviceDataGraphControls,
} from "../controls";
import MetricsDataContents from "./metrics-data-contents";

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
          <div className="flex min-w-[160px] flex-row-reverse items-center justify-between rounded border-[2px] px-[10px]">
            <DeviceDataDropdown
              triggerIcon={
                <div className="text-[10px] text-[#8B8B8B]">Device</div>
              }
              placeholder="Devices"
              valChangeFunc={(val) => {
                applyMetricDeviceFilterType(val);
              }}
              options={metricsDataDevicesOptions}
            />
          </div>

          <div>
            <DeviceDataDateControls />
          </div>

          <div>
            <DeviceDataGraphControls />
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
                    <span className="ml-[15px] text-[#8A8A8A]">(1 panel)</span>
                  </p>
                </div>
              </Accordion.Trigger>
              <Accordion.Content>
                {/* Will be different for other keys */}
                <MetricsDataContents metricKey={item.key} data={data?.data} />
                {/* ================================ */}
              </Accordion.Content>
            </Accordion.Item>
          );
        })}
      </Accordion.Root>
    </>
  );
};

export default MetricsDataTab;
