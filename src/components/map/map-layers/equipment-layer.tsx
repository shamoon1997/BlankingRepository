import { MapToolTipContainer } from "@/components";
import { useMapUrlState } from "@/hooks";
import { PartitionResult } from "@/utils/map";
import { Feature, Point } from "geojson";
import mapboxgl from "mapbox-gl";
import { useState } from "react";
import { Layer, Marker, Source } from "react-map-gl";
import { MapZoomedBoxContainer } from "../map-zoomed-box";
import GridscopeDropdownLayer from "./gridscope-dropdown-layer";
import { BaseLayerResponse, Device } from "@/api/types/types.ts";
import { mapDataToGeoJsonPoints } from "@/utils/map/geojson-manipulators.ts";

// shape of data to be used

// const CircleData = [
//   {
//     id: "point1",
//     latitude: 33.716327,
//     longitude: 73.040111,
//     color: "bg-spotty",
//   },
//   {
//     id: "point2",
//     latitude: 33.717152,
//     longitude: 73.04163,
//     color: "bg-spotty",
//   },
//   { id: "point3", latitude: 33.71532, longitude: 73.04296, color: "bg-online" },
//   {
//     id: "point4",
//     latitude: 33.715669,
//     longitude: 73.038894,
//     color: "bg-offline",
//   },
//   {
//     id: "point5",
//     latitude: 33.715323,
//     longitude: 73.03909,
//     color: "bg-offline",
//   },
// ];

const LineLayerStyles: mapboxgl.LinePaint = {
  "line-color": ["get", "color"],
  "line-opacity": 1,
  "line-width": 8,
  "line-dasharray": [0.22, 0.24],
};

const GeoJson: Feature = {
  type: "Feature",
  //   generate geometry from data
  geometry: {
    type: "MultiLineString",
    coordinates: [
      [
        [73.040111, 33.716327],
        [73.04163, 33.717152],
      ],
      [
        [73.04163, 33.717152], // Duplicate point to connect lines
        [73.04296, 33.71532],
      ],
      [
        [73.040111, 33.716327],
        [73.038894, 33.715669],
      ],
      [
        [73.038894, 33.715669],
        [73.03909, 33.715323],
      ],
    ],
  },
  properties: {
    color: "#778FE4", // You can customize this property to set the line color
  },
};

type EquipmentLayerProps = {
  data: BaseLayerResponse | undefined;
  isLoading: boolean;
  isError: boolean;
};
export const EquipmentLayer = ({
  data,
  isError,
  isLoading,
}: EquipmentLayerProps) => {
  const { validatedMapUrlState } = useMapUrlState();

  let combined: Feature<Point, Device>[] = [];
  if (data?.devices && data.devices.length > 0) {
    const modify = data.devices.map((item) => {
      return {
        ...item,
        id: item.hardware_id,
      };
    });
    combined = mapDataToGeoJsonPoints(modify);
  }

  return (
    <>
      {combined.map((i) => {
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
              <MapZoomedBoxContainer>Tooltip content</MapZoomedBoxContainer>
            )}
          </Marker>
        );
      })}

      <GridscopeDropdownLayer />

      <Source id="line-source" type="geojson" data={GeoJson}>
        <Layer id="line-layer" type="line" paint={LineLayerStyles} />
      </Source>
    </>
  );
};
