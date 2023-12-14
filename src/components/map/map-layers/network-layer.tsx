import { useLayerControlUrlState, useMapUrlState } from "@/hooks";
import { Feature, Point, Position } from "geojson";
import mapboxgl from "mapbox-gl";
import { Layer, Marker, Source } from "react-map-gl";
import { Device } from "@/api/types/types";
import { mapDataToGeoJsonPoints } from "@/utils/map/geojson-manipulators";
import { useContext, useMemo } from "react";
import { MapZoomedBoxContainer } from "@/components/map/map-zoomed-box";
import {
  HoverPinIcon,
  OfflineIcon,
  OnlineIcon,
  SpottyIcon,
} from "@/assets/pole-hover";
import { LegendContainer } from "@/components";
import { LegendItem } from "@/components/legend/legend-item/legend-item";
import { stripZeros } from "@/utils/strings/strip-zeros";
import { NetworkControlLayer } from "@/components/map/dropdown-layers/network-control-layer";
import { MapBboxContext } from "@/state/providers/map/bbox-provider.tsx";
import { MapNetworkStatus } from "@/components/map/map-network-status/map-network-status.tsx";
import { useGetNetworkLayer } from "@/api/hooks/maps/use-get-network-layer.ts";

const NetworkLayerLineStyles: mapboxgl.LinePaint = {
  "line-color": ["get", "color"],
  "line-opacity": 1,
  "line-width": 8,
  "line-dasharray": [0.22, 0.24],
};

export const NetworkLayer = () => {
  const { validatedMapUrlState } = useMapUrlState();
  const { bbox } = useContext(MapBboxContext);
  const {
    dataWithLagBuffer: data,
    isError,
    isLoading,
    isRefetching,
    isSuccess,
  } = useGetNetworkLayer(bbox);

  const { validatedLayerUrlState } = useLayerControlUrlState();

  const filteredData = data?.devices.filter((i) => {
    const networkFilter = validatedLayerUrlState.network;
    if (networkFilter === "cellular") {
      return i.network_mode === 1;
    } else if (networkFilter === "lora") {
      return i.network_mode === 2;
    } else if (networkFilter === "unknown") {
      return i.network_mode === 0;
    } else if (networkFilter === "all") {
      return true;
    }
  });

  const points: Feature<Point, Device>[] = useMemo(() => {
    if (filteredData && filteredData.length > 0) {
      const modify = filteredData.map((item) => {
        return {
          ...item,
          id: item.hardware_id,
        };
      });
      return mapDataToGeoJsonPoints(modify);
    }

    return [];
  }, [filteredData]);

  const lines: Feature = useMemo(() => {
    const visitedPairs = new Set();
    const coordinates: Position[][] = [];

    if (filteredData && filteredData.length > 0) {
      filteredData.forEach((device) => {
        return device.neighbors.forEach((neighborId) => {
          const neighborDevice = filteredData.find(
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
  }, [filteredData]);

  return (
    <>
      {points.map((i) => {
        const id = i.properties.hardware_id;
        const [lng, lat] = i.geometry.coordinates;
        let color = "bg-unknown";

        if (i.properties.network_mode === 1) {
          color = "bg-cellular";
        } else if (i.properties.network_mode === 2) {
          color = "bg-lora";
        } else if (i.properties.network_mode === 0) {
          color = "bg-unknown";
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

      <NetworkControlLayer />

      <Source id="line-source" type="geojson" data={lines}>
        <Layer id="line-layer" type="line" paint={NetworkLayerLineStyles} />
      </Source>

      <LegendContainer>
        <div className="flex flex-col gap-[10px] p-[10px]">
          <LegendItem color="bg-lora" text="Lora" />
          <LegendItem color="bg-cellular" text="Cellular" />
          <LegendItem color="bg-unknown" text="Unknown Mode" />
        </div>
      </LegendContainer>

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
    </>
  );
};
