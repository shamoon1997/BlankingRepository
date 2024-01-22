import { ChevronIcon, ExfilIcon } from "@/assets";
import { useGetHardwareMetrics } from "@/hooks/metrics";
import {
  useMetricDataActions,
  useMetricDataState,
} from "@/state/device-data/metric-data-controls.store";
import { deviceMetricsKeys } from "@/utils/device-data";
import * as Accordion from "@radix-ui/react-accordion";
import React from "react";
import {
  DeviceDataDateControls,
  DeviceDataDropdown,
  DeviceDataGraphControls,
} from "../controls";
import MetricsDataContents from "./metrics-data-contents";

const MetricsDataTab: React.FC = () => {
  const metricDataState = useMetricDataState();
  const { applyMetricDeviceFilterType } = useMetricDataActions();

  const { data, isLoading, isError, isFetched } = useGetHardwareMetrics({
    hardware_ids: [
      "3f0017000c5030415738382000000001",
      "0f003c000e5030475837322000000001",
    ],
    t1: "2023-11-24 21:00:00",
    t2: "2023-11-24 21:30:00",
  });

  const icon = <div className="text-[10px] text-[#8B8B8B]">Device</div>;

  const noDeviceSelected = metricDataState.selectedMetrics.length === 0;

  return (
    <>
      <div className="mt-[12px] flex w-full justify-between px-4">
        <div className="flex gap-x-[10px]">
          <div className="flex min-w-[160px] flex-row-reverse items-center justify-between rounded border-[2px] px-[10px]">
            <DeviceDataDropdown
              triggerIcon={icon}
              placeholder="Devices"
              valChangeFunc={(val) => applyMetricDeviceFilterType(val)}
            />
          </div>
          <DeviceDataDateControls />
          <DeviceDataGraphControls />
        </div>

        <button
          onClick={() => console.log(metricDataState.selectedMetrics)}
          disabled={noDeviceSelected}
          className="place-content-centerz grid h-[32px] w-[130px] rounded-sm bg-sidebar text-[8px] disabled:bg-[#EDEDED]"
        >
          <div className="flex h-full w-full items-center justify-center gap-[5px]">
            <span
              className={
                noDeviceSelected
                  ? "[&_path]:!fill-sidebar"
                  : "[&_path]:!fill-white"
              }
            >
              <ExfilIcon />
            </span>
            <p className={noDeviceSelected ? "text-sidebar" : "text-white"}>
              Exfil Per-Blob
            </p>
          </div>
        </button>
      </div>

      <div className="mt-[12px] h-[0.5px] w-full bg-[#D9D9D9]" />

      {/* ACCORDIONS */}

      <Accordion.Root
        className="mt-[15px] flex w-full flex-col gap-[10px] rounded-md  px-4"
        type="single"
        collapsible
      >
        {deviceMetricsKeys.map((item) => {
          // There's no alternate way to find panels due to API schema
          //  Had to choose O(n^2)
          const amountOfPanels = () => {
            let length = 0;
            data?.map((i) => {
              const foundChannel = i.metric_channels.find(
                ({ channel_name }) => channel_name === item.key,
              )?.channel_values?.length;

              if (foundChannel && foundChannel > 0) length++;
            });

            return length;
          };

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
                    <span className="ml-[15px] text-[#8A8A8A]">
                      {isLoading && "Loading..."}
                      {isError && "Error"}
                      {isFetched && !isError && `(${amountOfPanels()} panel)`}
                    </span>
                  </p>
                </div>
              </Accordion.Trigger>
              <Accordion.Content>
                {/* Will be different for other keys */}
                <MetricsDataContents metricKey={item.key} data={data} />
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
