import { useLayerControlUrlState } from "@/hooks";
import { Feature, Point } from "geojson";
import mapboxgl from "mapbox-gl";
import { Layer, Marker, Source } from "react-map-gl";
import { HeatmapDevice } from "@/api/types/types.ts";
import {
  generateLines,
  generatePoints,
} from "@/utils/map/geojson-manipulators.ts";
import { useMemo } from "react";
import { useMapboxBbox } from "@/state/map/bbox-store.tsx";
import { useGetHeatMapLayer } from "@/api/hooks/maps/user-get-heat-map-layer.ts";
import {
  generateIntervals,
  generateLabels,
  getIntervalForValue,
  Interval,
} from "@/utils/min-max-range-generator/min-max-range-generator.ts";
import { GridScopeIcon, SelectedPoleIcon } from "@/assets";
import { useSelectedPoles, useSelectedPolesActions } from "@/state";
import { useReadFromTo } from "@/hooks/calendar";
import MiniMapStatusContainer from "@/components/legend/mini-legend-container/mini-map-status-container.tsx";
import { MiniMapNetworkStatus } from "@/components/map/mini-map-network-status/mini-map-network-status.tsx";
import MiniLegendRange from "@/components/legend/mini-legend-range/mini-legend-range.tsx";
import MiniCurrentLayerContainer from "@/components/legend/mini-legend-container/mini-current-layer-container.tsx";

const EquipmentLayerLineStyles: mapboxgl.LinePaint = {
  "line-color": "#B86E00",
  "line-opacity": 1,
  "line-width": 2,
};

const labelColors = [
  "bg-heatmap-range-1",
  "bg-heatmap-range-2",
  "bg-heatmap-range-3",
  "bg-heatmap-range-4",
  "bg-heatmap-range-5",
  "bg-heatmap-range-6",
];

export const MiniHeatMapLayer = () => {
  const { validatedLayerUrlState } = useLayerControlUrlState();
  const { checkIfPoleIsSelected, toggleAddSelectedPole } =
    useSelectedPolesActions();

  const bbox = useMapboxBbox();
  const fromTo = useReadFromTo();
  // don't remove this is to make sure the component re-renders when selected poles change
  useSelectedPoles();

  const {
    dataWithFilterApplied: data,
    isError,
    isLoading,
    isRefetching,
    isSuccess,
  } = useGetHeatMapLayer(
    bbox
      ? {
          ...bbox,
          t1: fromTo.from,
          t2: fromTo.to,
        }
      : null,
  );

  const points: Feature<Point, HeatmapDevice>[] = useMemo(() => {
    return generatePoints(data?.devices);
  }, [data?.devices]);

  const lines: Feature = useMemo(() => {
    return generateLines(data?.devices);
  }, [data?.devices]);

  let legendLabels = [];
  let intervals: Interval[] | null = [];

  if (validatedLayerUrlState.heatmap === "vibration") {
    const min = data?.heatmap_metrics_min_max.min_vibrometer ?? 0;
    const max = data?.heatmap_metrics_min_max.max_vibrometer ?? 0;
    legendLabels = generateLabels({ minValue: min, maxValue: max });
    intervals = generateIntervals({
      minValue: min,
      maxValue: max,
      intervalsCount: 6,
      colors: labelColors,
    });
  } else {
    const min = data?.heatmap_metrics_min_max.min_electrometer ?? 0;
    const max = data?.heatmap_metrics_min_max.max_electrometer ?? 0;
    legendLabels = generateLabels({ minValue: min, maxValue: max });
    intervals = generateIntervals({
      minValue: min,
      maxValue: max,
      intervalsCount: 6,
      colors: labelColors,
    });
  }

  return (
    <>
      {points.map((i) => {
        const [lng, lat] = i.geometry.coordinates;
        let color = "bg-unknown";
        const id = i.properties.hardware_id;

        const selectedPole = checkIfPoleIsSelected(id);

        if (intervals) {
          if (validatedLayerUrlState.heatmap === "vibration") {
            const interval = getIntervalForValue(
              i.properties.heatmap_metrics.vibrometer ?? 0,
              intervals,
            );
            color = interval?.color ?? "bg-unknown";
          } else {
            const interval = getIntervalForValue(
              i.properties.heatmap_metrics.electrometer ?? 0,
              intervals,
            );
            color = interval?.color ?? "bg-unknown";
          }
        }

        return (
          <Marker
            key={id}
            latitude={lat}
            longitude={lng}
            onClick={() =>
              toggleAddSelectedPole({
                hardwareId: i.properties.hardware_id,
                deviceSerialNumber: i.properties.device_sn,
              })
            }
            style={{ cursor: "pointer", zIndex: selectedPole ? 10 : 0 }}
          >
            <div className="relative">
              {Boolean(selectedPole) && (
                <div
                  className={`absolute top-[-10px] z-10 flex h-[18px] w-[18px] items-center justify-center [&_path]:fill-[${selectedPole?.assignedColor}]`}
                >
                  <SelectedPoleIcon className="h-[26px] w-[26px]" />
                </div>
              )}
              <div
                className={`drop-shadow-map-dot ${color} z-0 h-[18px] w-[18px] rounded-full border-2 border-solid border-white`}
              />
            </div>
          </Marker>
        );
      })}

      <div
        className={
          "absolute left-0 right-1 top-1 flex justify-end gap-1 bg-red-500"
        }
      >
        <div id={"1"} className={"hidden w-[80px]  [&:has(div)]:block"}></div>
        <div id={"2"} className={"hidden w-[80px]  [&:has(div)]:block"}></div>
      </div>

      <MiniCurrentLayerContainer>
        <div
          className={
            "flex items-center gap-1 p-1 px-1.5 font-mont text-[9px] font-medium"
          }
        >
          <GridScopeIcon className="h-3 w-3 shrink-0" />
          <span>Heat Map</span>
        </div>
      </MiniCurrentLayerContainer>

      <MiniMapStatusContainer>
        {(isLoading || isRefetching) && (
          <MiniMapNetworkStatus>Loading...</MiniMapNetworkStatus>
        )}
        {!isLoading &&
          !isRefetching &&
          isSuccess &&
          data?.devices.length === 0 && (
            <MiniMapNetworkStatus>
              No poles found in this area
            </MiniMapNetworkStatus>
          )}
        {isError && (
          <MiniMapNetworkStatus>
            An Error Occurred. Please share logs with the developer team.
          </MiniMapNetworkStatus>
        )}

        {!isLoading && (
          <MiniLegendRange
            width={120}
            key={legendLabels.join(",")}
            colors={labelColors}
          />
        )}
      </MiniMapStatusContainer>

      <Source id="line-source" type="geojson" data={lines}>
        <Layer id="line-layer" type="line" paint={EquipmentLayerLineStyles} />
      </Source>
    </>
  );
};
