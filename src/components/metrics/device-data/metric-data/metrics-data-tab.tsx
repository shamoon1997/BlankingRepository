import { ChevronIcon } from "@/assets";
import { useGetHardwareMetrics } from "@/hooks/metrics";
import { useMetricDataState } from "@/state/device-data/metric-data-controls.store";
import { deviceMetricsKeys } from "@/utils/device-data";
import * as Accordion from "@radix-ui/react-accordion";
import React from "react";
import {
  DeviceDataDateControls,
  DeviceDataDropdown,
  DeviceDataGraphControls,
} from "../../controls";
import ExfilBlobBtn from "./exfil-btn";
import MetricsDataContents from "./metrics-data-contents";
import { useDeviceDataControlActions } from "@/state/device-data";
import { useCalendarTimeZone, useMapboxBbox } from "@/state";
import { useGetGridScopeLayer } from "@/api/hooks/maps/use-get-gridscope-layer";
import { useMetricReadToFrom } from "@/hooks/calendar";
import { DateFormatOptions } from "@/utils/date";
import { formatInTimeZone } from "date-fns-tz";

const MetricsDataTab: React.FC = () => {
  const timezone = useCalendarTimeZone();
  const metricDataState = useMetricDataState();
  const { to, from } = useMetricReadToFrom();
  const { setDeviceFilter } = useDeviceDataControlActions();
  const bbox = useMapboxBbox();

  const { dataWithFilterApplied: polesList } = useGetGridScopeLayer(bbox);
  const hwIdLists = polesList?.devices?.map((d) => d.hardware_id);

  const { data, isLoading, isError, isFetched } = useGetHardwareMetrics({
    hardware_ids: hwIdLists,
    t1: formatInTimeZone(
      from * 1000,
      timezone,
      DateFormatOptions.standardTime24Hr,
    ),
    t2: formatInTimeZone(
      to * 1000,
      timezone,
      DateFormatOptions.standardTime24Hr,
    ),
  });

  const icon = <div className="text-[10px] text-[#8B8B8B]">Device</div>;

  const noDeviceSelected = metricDataState.readyForExfil.length === 0;

  return (
    <>
      <div className="mt-[12px] flex w-full justify-between px-4">
        <div className="flex gap-x-[10px]">
          <div className="flex min-w-[160px] flex-row-reverse items-center justify-between rounded border-[2px] px-[10px]">
            <DeviceDataDropdown
              triggerIcon={icon}
              placeholder="Devices"
              valChangeFunc={(val) => setDeviceFilter(val)}
            />
          </div>
          <DeviceDataDateControls />
          <DeviceDataGraphControls />
        </div>
        <ExfilBlobBtn disabled={noDeviceSelected} />
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
                {isLoading && (
                  <div className="w-full pb-2 text-center">
                    <p>Loading...</p>
                  </div>
                )}
                {isError && (
                  <div className="w-full pb-2 text-center text-red-400">
                    <p>An error has ocurred</p>
                  </div>
                )}
                {isFetched && !isError && (
                  <MetricsDataContents metricKey={item.key} data={data} />
                )}
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
