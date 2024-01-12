import { useLayerControlUrlState, useMapUrlState } from "@/hooks";
import { Feature, Point } from "geojson";
import mapboxgl from "mapbox-gl";
import { Layer, Marker, Source } from "react-map-gl";
import { MapZoomedBoxContainer } from "../map-zoomed-box";
import { HeatmapDevice } from "@/api/types/types.ts";
import {
  generateLines,
  generatePoints,
} from "@/utils/map/geojson-manipulators.ts";
import { useMemo } from "react";
import { HeatMapControlLayer } from "@/components/map/dropdown-layers/heatmap-control-layer";
import { useMapboxBbox } from "@/state/map/bbox-store.tsx";
import { MapNetworkStatus } from "@/components/map/map-network-status/map-network-status.tsx";
import { useGetHeatMapLayer } from "@/api/hooks/maps/user-get-heat-map-layer.ts";
import { LegendRange, MapStatusContainer } from "@/components";
import {
  generateIntervals,
  generateLabels,
  getIntervalForValue,
  Interval,
} from "@/utils/min-max-range-generator/min-max-range-generator.ts";
import {
  HoverPinIcon,
  OfflineIcon,
  OnlineIcon,
  SpottyIcon,
} from "@/assets/pole-hover";
import { stripZeros } from "@/utils/strings/strip-zeros.ts";
import { ElectrometerIcon, SelectedPoleIcon, VibrationIcon } from "@/assets";
import { useSelectedPoles, useSelectedPolesActions } from "@/state";
import { useReadToFrom } from "@/hooks/calendar";
import { SelectedPoleViews } from "@/components/map/selected-poleview-container/selected-pole-views.tsx";

const EquipmentLayerLineStyles: mapboxgl.LinePaint = {
  "line-color": ["get", "color"],
  "line-opacity": 1,
  "line-width": 8,
  "line-dasharray": [0.22, 0.24],
};

const labelColors = [
  "bg-heatmap-range-1",
  "bg-heatmap-range-2",
  "bg-heatmap-range-3",
  "bg-heatmap-range-4",
  "bg-heatmap-range-5",
  "bg-heatmap-range-6",
];

export const HeatMapLayer = () => {
  const { validatedMapUrlState } = useMapUrlState();
  const { validatedLayerUrlState } = useLayerControlUrlState();
  const { checkIfPoleIsSelected, toggleAddSelectedPole } =
    useSelectedPolesActions();

  const bbox = useMapboxBbox();
  const fromTo = useReadToFrom();
  const selectedPoles = useSelectedPoles();

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

        // Get color to place on map
        const poleIconColor = checkIfPoleIsSelected(id)?.assignedColor;

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

        const iconWidth = "w-[13px]";
        let networkStatusText = "Offline";
        let NetworkStatusIcon = <OfflineIcon className={iconWidth} />;
        if (i.properties.online === 0) {
          networkStatusText = "Offline";
          NetworkStatusIcon = <OfflineIcon className={iconWidth} />;
        } else if (i.properties.online === 1) {
          networkStatusText = "Online";
          NetworkStatusIcon = <OnlineIcon className={iconWidth} />;
        } else if (i.properties.online === 2) {
          networkStatusText = "Spotty";
          NetworkStatusIcon = <SpottyIcon className={iconWidth} />;
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
            style={{
              cursor: "pointer",
              zIndex: checkIfPoleIsSelected(i.properties.hardware_id) ? 10 : 0,
            }}
          >
            <div className="relative">
              {checkIfPoleIsSelected(i.properties.hardware_id) && (
                <div
                  className={`absolute top-[-9px] z-10 flex h-6 w-6 items-center justify-center [&_path]:fill-[${poleIconColor}]`}
                >
                  <SelectedPoleIcon className="h-[26px] w-[26px]" />
                </div>
              )}
              <div
                className={`drop-shadow-map-dot ${color} z-0 h-6 w-6 rounded-full border-2 border-solid border-white`}
              />
            </div>

            {(validatedMapUrlState.zoom > 16 ||
              checkIfPoleIsSelected(i.properties.hardware_id)) && (
              <MapZoomedBoxContainer>
                <div className="flex flex-col gap-[3px] whitespace-nowrap px-[2px] text-[11px] text-white">
                  <div className="flex items-center gap-[7px] font-medium">
                    <HoverPinIcon className="w-[11px]" />
                    <p>
                      {i.properties.pole_id} •{" "}
                      {stripZeros(i.properties.device_sn ?? "")}
                    </p>
                  </div>
                  <div className="flex items-center gap-[5px]">
                    {NetworkStatusIcon}
                    <p>{networkStatusText}</p>
                  </div>
                  <div className="flex items-center gap-[5px]">
                    <ElectrometerIcon className="h-3 w-3 text-white" />
                    <p>{i.properties.heatmap_metrics.vibrometer}</p>
                  </div>

                  <div className="flex items-center gap-[5px]">
                    <VibrationIcon className="h-3 w-3 text-white" />
                    <p>{i.properties.heatmap_metrics.electrometer}</p>
                  </div>
                </div>
              </MapZoomedBoxContainer>
            )}
          </Marker>
        );
      })}

      <HeatMapControlLayer />

      <SelectedPoleViews selectedPoles={selectedPoles} />

      <MapStatusContainer>
        {(isLoading || isRefetching) && (
          <MapNetworkStatus>Loading...</MapNetworkStatus>
        )}
        {!isLoading &&
          !isRefetching &&
          isSuccess &&
          data?.devices.length === 0 && (
            <MapNetworkStatus>No poles found in this area</MapNetworkStatus>
          )}
        {isError && (
          <MapNetworkStatus>
            An Error Occurred. Please share logs with the developer team.
          </MapNetworkStatus>
        )}

        {!isLoading && (
          <LegendRange
            key={legendLabels.join(",")}
            colors={labelColors}
            labels={legendLabels}
          />
        )}
      </MapStatusContainer>

      <Source id="line-source" type="geojson" data={lines}>
        <Layer id="line-layer" type="line" paint={EquipmentLayerLineStyles} />
      </Source>
    </>
  );
};
