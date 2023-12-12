import { useMapUrlState } from "@/hooks";
import { Feature, Point, Position } from "geojson";
import mapboxgl from "mapbox-gl";
import { Layer, Marker, Source } from "react-map-gl";
import GridscopeDropdownLayer from "./dropdown-layers";
import { BaseLayerResponse, Device } from "@/api/types/types.ts";
import { mapDataToGeoJsonPoints } from "@/utils/map/geojson-manipulators.ts";
import { useMemo } from "react";
import { MapZoomedBoxContainer } from "@/components/map/map-zoomed-box";

const EquipmentLayerLineStyles: mapboxgl.LinePaint = {
  "line-color": ["get", "color"],
  "line-opacity": 1,
  "line-width": 8,
  "line-dasharray": [0.22, 0.24],
};

type EquipmentLayerProps = {
  data: BaseLayerResponse | undefined;
  isLoading: boolean;
  isError: boolean;
};
export const EquipmentLayer = ({ data }: EquipmentLayerProps) => {
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
              <MapZoomedBoxContainer>
                {i.properties.equipment.map((eq, index) => (
                  <div key={i.properties.hardware_id + index}>{eq}</div>
                ))}
              </MapZoomedBoxContainer>
            )}
          </Marker>
        );
      })}

      <GridscopeDropdownLayer />

      <Source id="line-source" type="geojson" data={lines}>
        <Layer id="line-layer" type="line" paint={EquipmentLayerLineStyles} />
      </Source>
    </>
  );
};
