import { useMapUrlState } from "@/hooks";
import { Feature, Point, Position } from "geojson";
import mapboxgl from "mapbox-gl";
import { Layer, Marker, Source } from "react-map-gl";
import GridscopeDropdownLayer from "./gridscope-dropdown-layer";
import { BaseLayerResponse, Device } from "@/api/types/types.ts";
import { mapDataToGeoJsonPoints } from "@/utils/map/geojson-manipulators.ts";
import { useMemo } from "react";
import { MapZoomedBoxContainer } from "@/components/map/map-zoomed-box";
import {
  HoverPinIcon,
  OfflineIcon,
  OnlineIcon,
  SpottyIcon,
} from "@/assets/pole-hover";
import { LegendContainer } from "@/components";
import { LegendItem } from "@/components/map/legend-item/legend-item.tsx";
import { stripZeros } from "@/utils/strings/strip-zeros.ts";

const NetworkLayerLineStyles: mapboxgl.LinePaint = {
  "line-color": ["get", "color"],
  "line-opacity": 1,
  "line-width": 8,
  "line-dasharray": [0.22, 0.24],
};

type NetworkLayerProps = {
  data: BaseLayerResponse | undefined;
  isLoading: boolean;
  isError: boolean;
};
export const NetworkLayer = ({ data }: NetworkLayerProps) => {
  const { validatedMapUrlState } = useMapUrlState();

  const points: Feature<Point, Device>[] = useMemo(() => {
    if (data?.devices && data.devices.length > 0) {
      const modify = data.devices.map((item) => {
        return {
          ...item,
          id: item.hardware_id,
        };
      });
      return mapDataToGeoJsonPoints(modify);
    }

    return [];
  }, [data?.devices]);

  const lines: Feature = useMemo(() => {
    const visitedPairs = new Set();
    const coordinates: Position[][] = [];

    if (data?.devices && data.devices.length > 0) {
      data.devices.forEach((device) => {
        return device.neighbors.forEach((neighborId) => {
          const neighborDevice = data.devices.find(
            (d) => d.hardware_id === neighborId,
          );

          // sort is needed to ensure key consistency don't remove
          const pairKey = [device.hardware_id, neighborId].sort().join("-");

          if (!visitedPairs.has(pairKey) && neighborDevice) {
            visitedPairs.add(pairKey);

            coordinates.push([
              [device.longitude, device.latitude],
              [neighborDevice.longitude, neighborDevice.latitude],
            ]);
          }
        });
      });
    }

    return {
      type: "Feature",
      geometry: {
        type: "MultiLineString",
        coordinates,
      },
      properties: {
        color: "#8A8A8A",
      },
    };
  }, [data?.devices]);

  return (
    <>
      {points.map((i) => {
        const [lng, lat] = i.geometry.coordinates;
        let color = "bg-unknown";

        if (i.properties.network_mode === 1) {
          color = "bg-cellular";
        } else if (i.properties.network_mode === 2) {
          color = "bg-lora";
        } else if (i.properties.network_mode === 0) {
          color = "bg-unknown";
        }
        const id = i.properties.hardware_id;

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
          <Marker key={id} latitude={lat} longitude={lng}>
            <div className="relative">
              <div
                className={`drop-shadow-map-dot ${color} z-0 h-6 w-6 rounded-full border-2 border-solid border-white`}
              />
            </div>

            {validatedMapUrlState.zoom > 16 && (
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
                </div>
              </MapZoomedBoxContainer>
            )}
          </Marker>
        );
      })}

      <GridscopeDropdownLayer />

      <Source id="line-source" type="geojson" data={lines}>
        <Layer id="line-layer" type="line" paint={NetworkLayerLineStyles} />
      </Source>

      <LegendContainer>
        <LegendItem color="bg-lora" text="Lora" />
        <LegendItem color="bg-cellular" text="Cellular" />
        <LegendItem color="bg-unknown" text="Unknown Mode" />
      </LegendContainer>
    </>
  );
};
