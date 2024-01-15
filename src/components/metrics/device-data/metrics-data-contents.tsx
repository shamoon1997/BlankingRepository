import { MetricDataresponseType } from "@/api/types/types";
import { CrossIcon, SearchIcon } from "@/assets";
import { LocationIcon } from "@/assets/pole-view";
import {
  useMetricDataActions,
  useMetricDataState,
} from "@/state/device-data/metric-data-controls.store";
import React, { useEffect } from "react";

type Props = {
  metricKey: string;
  data?: MetricDataresponseType[];
};

const MetricsDataContents: React.FC<Props> = ({ metricKey, data }) => {
  const metricDataState = useMetricDataState();
  const { removeFromSelected, addToSelected } = useMetricDataActions();

  useEffect(() => {
    if (!data) return;

    const finalObj: any = {};

    data?.forEach((device) => {
      const foundChannel = device.metric_channels.find(
        (metric) => metric.channel_name === metricKey,
      );

      if (!finalObj[metricKey]) finalObj[metricKey] = [];

      finalObj[metricKey].push({
        hardware_id: device.hardware_id,
        time: device.recorded_at,
        values: foundChannel?.channel_values ?? null,
      });

      console.log(finalObj);
    });
  }, [data]);

  return (
    <>
      <div className="mt-[12px] h-[0.5px] w-full bg-[#D9D9D9]" />

      <div className="flex justify-between gap-[10px] pb-[10px]">
        <div className=" w-3/4">
          <img
            className="max-h-[320px] w-full bg-cover"
            src="/images/mock-metric-data-img.png"
            alt=""
          />
        </div>

        <div className="mt-[9px] flex w-1/4 flex-col">
          <h3 className="mb-[8px]">Graph View</h3>

          <div className="mb-[8px] flex items-center gap-[5px]">
            <input
              className="h-[25px] w-[180px] rounded-md border-[0.8px] border-[#CCCCCC] px-[10px] py-[6px] text-[8px]"
              type="text"
              placeholder="Search to add device"
            />
            <button className="grid h-[25px] w-[25px] place-content-center rounded-md bg-[#3B3C4F]">
              <div className="h-[12px] w-[12px] [&_circle]:stroke-white [&_path]:fill-white">
                <SearchIcon />
              </div>
            </button>
          </div>

          <h3 className="mb-[3px] text-[8px]">Deployment: Birmingham (10)</h3>

          <div className="no-scrollbar max-h-[250px] overflow-y-scroll">
            {/* SELECTED ITEMS HERE */}
            {metricDataState?.selectedMetrics?.map((_, i) => {
              return (
                <div
                  className="mb-[8px] flex items-center gap-[5px]"
                  key={`selected-metrics-${i}`}
                >
                  <div className="flex h-[25px] w-[180px] items-center overflow-hidden rounded-md border-[0.8px] border-[#CCCCCC] bg-white text-[8px]">
                    <div
                      className={`grid h-[25px] w-[25px] place-content-center bg-[${
                        _.assignedColor ? _.assignedColor : "#B7B7B7"
                      }] [&_path]:fill-white`}
                    >
                      <LocationIcon />
                    </div>

                    <p className="ml-[6px] font-medium">{_?.name}</p>
                  </div>
                  <button
                    className="grid h-[25px] w-[25px] place-content-center rounded-md border-[0.8px] border-device-data-border-blue bg-device-data-blue  hover:bg-slate-100"
                    onClick={() => removeFromSelected(_?.id)}
                  >
                    <div className="grid h-[12px] w-[12px] place-content-center [&_path]:stroke-device-data-border-blue">
                      <CrossIcon />
                    </div>
                  </button>
                </div>
              );
            })}

            {/* PLACEHOLDER */}
            {[...Array(16)]?.map((_, i) => {
              return (
                <div
                  className="mb-[8px] flex items-center gap-[5px]"
                  key={`mock-metrics-${i}`}
                  onClick={() => {
                    addToSelected({
                      id: `mock-metrics-${Math.random()}`,
                      name: "GS124• 4024 • Lora",
                    });
                  }}
                >
                  <div className="flex h-[25px] w-[180px] items-center overflow-hidden rounded-md border-[0.8px] border-[#CCCCCC] bg-white text-[8px]">
                    <div className="grid h-[25px] w-[25px] place-content-center bg-[#B7B7B7] [&_path]:fill-white">
                      <LocationIcon />
                    </div>

                    <p className="ml-[6px] font-medium">
                      {Math.floor(1000 + Math.random() * 9000)} • Lora
                    </p>
                  </div>
                  <button className="grid h-[25px] w-[25px] place-content-center rounded-md border-[0.8px] border-[#CCCCCC] bg-white hover:bg-slate-100">
                    <div className="grid h-[12px] w-[12px] rotate-45 place-content-center ">
                      <CrossIcon />
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default MetricsDataContents;
