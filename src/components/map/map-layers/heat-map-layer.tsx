import { useMapUrlState } from "@/hooks";
import { Feature, Point, Position } from "geojson";
import mapboxgl from "mapbox-gl";
import { Layer, Marker, Source } from "react-map-gl";
import { MapZoomedBoxContainer } from "../map-zoomed-box";
import { Device } from "@/api/types/types.ts";
import { mapDataToGeoJsonPoints } from "@/utils/map/geojson-manipulators.ts";
import { useMemo } from "react";
import { HeatMapControlLayer } from "@/components/map/dropdown-layers/heatmap-control-layer";
import { useMapboxBbox } from "@/state/map/bbox-store.tsx";
import { MapNetworkStatus } from "@/components/map/map-network-status/map-network-status.tsx";
import { useGetHeatMapLayer } from "@/api/hooks/maps/user-get-heat-map-layer.ts";

const EquipmentLayerLineStyles: mapboxgl.LinePaint = {
  "line-color": ["get", "color"],
  "line-opacity": 1,
  "line-width": 8,
  "line-dasharray": [0.22, 0.24],
};

export const HeatMapLayer = () => {
  const { validatedMapUrlState } = useMapUrlState();
  const bbox = useMapboxBbox();

  const {
    dataWithLagBuffer: data,
    isError,
    isLoading,
    isRefetching,
    isSuccess,
  } = useGetHeatMapLayer(bbox);

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
      console.log(coordinates);
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
        const color = "bg-offline";
        const id = i.properties.hardware_id;

        return (
          <Marker key={id} latitude={lat} longitude={lng}>
            <div className="relative">
              <div
                className={`drop-shadow-map-dot ${color} z-0 h-6 w-6 rounded-full border-2 border-solid border-white`}
              />
            </div>

            {validatedMapUrlState.zoom > 16 && (
              <MapZoomedBoxContainer>{}</MapZoomedBoxContainer>
            )}
          </Marker>
        );
      })}

      <HeatMapControlLayer />

      <Source id="line-source" type="geojson" data={lines}>
        <Layer id="line-layer" type="line" paint={EquipmentLayerLineStyles} />
      </Source>

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
