import { useMapUrlState } from "@/hooks";
import { useState } from "react";
import { Layer, Marker, Source } from "react-map-gl";
import { MapToolTipContainer } from "../map-tooltip/map-tooltip";

// shape of data to be used
const CircleData = [
  { id: "point1", latitude: 33.729651, longitude: 73.263073 },
  { id: "point2", latitude: 33.730633, longitude: 73.266185 },
  { id: "point3", latitude: 33.730526, longitude: 73.261614 },
];

const LineLayerStyles: mapboxgl.LinePaint = {
  "line-color": ["get", "color"],
  "line-opacity": 1,
  "line-width": 8,
  "line-dasharray": [0.22, 0.24],
};

export const GridScopeLayer = () => {
  const { validatedMapUrlState } = useMapUrlState();
  const [popupInfo] = useState<string | null>(null);

  return (
    <>
      {CircleData.map((circle) => (
        <Marker
          key={circle.id}
          latitude={circle.latitude}
          longitude={circle.longitude}
        >
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              backgroundColor: "#5BC760",
              border: "2px solid white",
              filter: "drop-shadow(0.8px 0.8px 2px rgba(0, 0, 0, 0.25))",
            }}
          />

          {validatedMapUrlState.zoom > 16 && (
            <div
              style={{
                background: "rgba(22, 22, 22, 0.70)",
                boxShadow:
                  "box-shadow: 0.2px 0.2px 0.5px 0px rgba(0, 0, 0, 0.10)",
              }}
              className="absolute bottom-[-33px] left-[24px] h-[35px] w-[88px] rounded-sm bg-black p-[6px] text-white"
            >
              Tooltip content
            </div>
          )}

          {popupInfo === circle.id && (
            <MapToolTipContainer>Popup content</MapToolTipContainer>
          )}
        </Marker>
      ))}

      <Source
        id="line-source"
        type="geojson"
        data={{
          type: "Feature",
          //   generate geometry from data
          geometry: {
            type: "MultiLineString",
            coordinates: [
              [
                [73.263073, 33.729651],
                [73.266185, 33.730633],
              ],
              [
                [73.263073, 33.729651], // Duplicate point to connect lines
                [73.261614, 33.730526],
              ],
            ],
          },
          properties: {
            color: "#778FE4", // You can customize this property to set the line color
          },
        }}
      >
        <Layer id="line-layer" type="line" paint={LineLayerStyles} />
      </Source>
    </>
  );
};
