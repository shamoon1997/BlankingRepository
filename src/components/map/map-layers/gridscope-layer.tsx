import { useMapUrlState } from "@/hooks";
import { useState } from "react";
import { Layer, Marker, Source } from "react-map-gl";
import { MapToolTipContainer } from "../map-tooltip";
import { Feature, Geometry, GeoJsonProperties } from "geojson";
import { MapZoomedBoxContainer } from "../map-zoomed-box";
import { partitionAndClusterizePoints } from "@/utils/map";

// shape of data to be used

const CircleData = [
  {
    id: "point1",
    latitude: 33.716327,
    longitude: 73.040111,
    color: "bg-spotty",
  },
  {
    id: "point2",
    latitude: 33.717152,
    longitude: 73.04163,
    color: "bg-spotty",
  },
  { id: "point3", latitude: 33.71532, longitude: 73.04296, color: "bg-online" },
  {
    id: "point4",
    latitude: 33.715669,
    longitude: 73.038894,
    color: "bg-offline",
  },
  {
    id: "point5",
    latitude: 33.715323,
    longitude: 73.03909,
    color: "bg-offline",
  },
];

const combined = partitionAndClusterizePoints(
  CircleData,
  [
    (data) => {
      return data.color === "bg-offline";
    },
    (data) => {
      return data.color === "bg-spotty";
    },
    (data) => {
      return data.color !== "bg-offline" && data.color !== "bg-spotty";
    },
  ],
  0.1,
  {
    minPoints: 2,
  },
);

const LineLayerStyles: mapboxgl.LinePaint = {
  "line-color": ["get", "color"],
  "line-opacity": 1,
  "line-width": 8,
  "line-dasharray": [0.22, 0.24],
};

const GeoJson: Feature<Geometry, GeoJsonProperties> = {
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

export const GridScopeLayer = () => {
  const { validatedMapUrlState } = useMapUrlState();
  const [popupInfo, setPopupInfo] = useState<string | null>(null);
  const [adjacentPopupInfo, setAdjacentPopupInfo] = useState<object | null>(
    null,
  );

  return (
    <>
      {combined.map((i) => {
        const [lng, lat] = i.geometry.coordinates;
        const color = i.properties.color as string;
        const id = i.properties.id as string;
        const cluster = i.properties.cluster;
        const pointType = i.properties.dbscan;

        return (
          <Marker
            draggable
            key={id}
            latitude={lat}
            longitude={lng}
            style={{
              zIndex: id === popupInfo ? 100 : 0,
            }}
          >
            <div
              onMouseOver={() => {
                if (pointType === "core") {
                  const adjacentPoints = combined.filter(
                    (i) =>
                      i.properties.cluster === cluster &&
                      i.properties.dbscan === pointType &&
                      i.properties.id !== id,
                  );

                  console.log({ adjacentPoints });

                  setAdjacentPopupInfo(adjacentPoints);
                } else {
                  setAdjacentPopupInfo(null);
                }

                setPopupInfo(id);
              }}
              onMouseLeave={() => {
                setPopupInfo(null);
              }}
              className="relative"
            >
              <div
                className={`drop-shadow-map-dot ${color} z-0 h-6 w-6 rounded-full border-2 border-solid border-white`}
              />

              {popupInfo === id && (
                <MapToolTipContainer>
                  {}

                  <p>hovering over {id}</p>
                  <pre>
                    adjacent points{" "}
                    {JSON.stringify(adjacentPopupInfo, undefined, 2)}
                  </pre>
                </MapToolTipContainer>
              )}
            </div>

            {validatedMapUrlState.zoom > 16 && popupInfo !== id && (
              <MapZoomedBoxContainer>Tooltip content</MapZoomedBoxContainer>
            )}
          </Marker>
        );
      })}

      <Source id="line-source" type="geojson" data={GeoJson}>
        <Layer id="line-layer" type="line" paint={LineLayerStyles} />
      </Source>
    </>
  );
};