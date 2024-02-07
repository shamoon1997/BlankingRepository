import { MetricDataresponseType } from "@/api/types/types";
import { CrossIcon, ExfilIcon, SearchIcon } from "@/assets";
import { LocationIcon } from "@/assets/pole-view";
import {
  useMetricDataActions,
  useMetricDataState,
} from "@/state/device-data/metric-data-controls.store";
import React, { useEffect, useMemo, useState } from "react";
import MetricDataPlot from "./metric-data-plot";

type Props = {
  metricKey: string;
  data?: MetricDataresponseType[];
};

type GraphData = {
  hardware_id: string;
  time: string[];
  values: number[] | null;
};

const MetricsDataContents: React.FC<Props> = ({ metricKey, data }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const metricDataState = useMetricDataState();
  const { removeFromSelected, addToSelected, toggleReadyForExfil } =
    useMetricDataActions();

  const dataForGraphs: Record<string, GraphData[]> = useMemo(() => {
    if (!data) return {};
    const finalObj: Record<string, GraphData[]> = {};

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
    });

    return finalObj;
  }, [data, metricKey]);

  dataForGraphs;
  // TO BE USED LATER FOR GRAPH PLOTTING

  useEffect(() => {
    console.log(dataForGraphs);
  }, [dataForGraphs]);

  return (
    <>
      <div className="mt-[12px] h-[0.5px] w-full bg-[#D9D9D9]" />

      <div className="flex justify-between gap-[10px] px-[8px] pb-[10px]">
        <div className="w-3/4">
          <MetricDataPlot />
        </div>

        <div className="mt-[9px] flex w-1/4 flex-col">
          <h3 className="mb-[8px]">Graph View</h3>

          <div className="mb-[8px] flex items-center gap-[5px]">
            <input
              className="h-[25px] w-[180px] rounded-md border-[0.8px] border-[#CCCCCC] px-[10px] py-[6px] text-[8px]"
              type="text"
              placeholder="Search to add device"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="grid h-[25px] w-[25px] place-content-center rounded-md bg-[#3B3C4F]">
              <div className="h-[12px] w-[12px] [&_circle]:stroke-white [&_path]:fill-white">
                <SearchIcon />
              </div>
            </button>
          </div>

          {metricDataState.readyForExfil.length > 0 && (
            <h3 className="mb-[3px] text-[8px]">
              Exfil Per-blob {metricDataState.readyForExfil.length}
            </h3>
          )}

          {metricDataState.readyForExfil.length > 0 &&
            metricDataState.readyForExfil.map((_, i) => {
              const bgColor = _.assignedColor ? _.assignedColor : "#B7B7B7";

              return (
                <div
                  className="mb-[8px] flex items-center gap-[5px]"
                  key={`ready-for-exfil-metrics-${i}`}
                >
                  <div className="flex h-[25px] w-[180px] items-center overflow-hidden rounded-md border-[0.8px] border-[#CCCCCC] bg-white text-[8px]">
                    <div
                      className={`grid h-[25px] w-[25px] place-content-center bg-[${bgColor}] [&_path]:!fill-white`}
                    >
                      <ExfilIcon />
                    </div>

                    <p className="ml-[6px] font-medium">{_?.name}</p>
                  </div>
                  <button
                    className="grid h-[25px] w-[25px] place-content-center rounded-md border-[0.8px] border-device-data-border-blue bg-device-data-blue  hover:bg-slate-100"
                    onClick={() => toggleReadyForExfil(_)}
                  >
                    <div className="grid h-[12px] w-[12px] place-content-center [&_path]:stroke-device-data-border-blue">
                      <CrossIcon />
                    </div>
                  </button>
                </div>
              );
            })}

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

                    <p className="ml-[6px] text-[6px] font-medium">{_?.id}</p>
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

            {data?.map((item) => {
              if (
                metricDataState.selectedMetrics
                  .map((device) => device.id)
                  .includes(item.hardware_id)
              )
                return;

              if (!item.hardware_id.includes(searchTerm)) return;

              return (
                <div
                  className="mb-[8px] flex items-center gap-[5px]"
                  key={item?.hardware_id}
                  onClick={() => {
                    // TODO: GET DATA WALEED
                    // console.log(item);
                    // console.log(
                    //   item.metric_channels.find(
                    //     (i) => i.channel_name === metricKey,
                    //   )?.channel_values,
                    // );
                    addToSelected({
                      id: item?.hardware_id,
                      name: item?.hardware_id,
                    });
                  }}
                >
                  <div className="flex h-[25px] w-[180px] items-center overflow-hidden rounded-md border-[0.8px] border-[#CCCCCC] bg-white text-[8px]">
                    <div className="grid h-[25px] w-[25px] place-content-center bg-[#B7B7B7] [&_path]:fill-white">
                      <LocationIcon />
                    </div>

                    <p className="ml-[6px] text-[6px] font-medium">
                      {item.hardware_id}
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
