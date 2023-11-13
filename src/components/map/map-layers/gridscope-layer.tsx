import { useMapUrlState } from "@/hooks";
import { useState } from "react";
import { Layer, Marker, Source } from "react-map-gl";
import { MapToolTipContainer } from "../map-tooltip";
import { Feature, Geometry, GeoJsonProperties } from "geojson";
import { MapZoomedBoxContainer } from "../map-zoomed-box";

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

const GeoJson: Feature<Geometry, GeoJsonProperties> = {
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
};

export const GridScopeLayer = () => {
  const { validatedMapUrlState } = useMapUrlState();
  const [popupInfo, setPopupInfo] = useState<string | null>(null);

  return (
    <>
      {CircleData.map((circle) => (
        <Marker
          key={circle.id}
          latitude={circle.latitude}
          longitude={circle.longitude}
        >
          {/* the circle */}
          <div
            onMouseOver={() => setPopupInfo(circle.id)}
            onMouseLeave={() => {
              setPopupInfo(null);
            }}
            className="relative"
          >
            <div className="drop-shadow-map-dot bg-online h-6 w-6 rounded-full border-2 border-solid border-white" />

            {popupInfo === circle.id && (
              <MapToolTipContainer>Popup content</MapToolTipContainer>
            )}
          </div>

          {validatedMapUrlState.zoom > 16 && popupInfo !== circle.id && (
            <MapZoomedBoxContainer>Tooltip content</MapZoomedBoxContainer>
          )}
        </Marker>
      ))}

      <Source id="line-source" type="geojson" data={GeoJson}>
        <Layer id="line-layer" type="line" paint={LineLayerStyles} />
      </Source>
    </>
  );
};
