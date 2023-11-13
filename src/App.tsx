import Map, {
  FullscreenControl,
  GeolocateControl,
  Layer,
  MapRef,
  Marker,
  NavigationControl,
  ScaleControl,
  Source,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";

const circleData = [
  { id: "point1", latitude: 33.729651, longitude: 73.263073 },
  { id: "point2", latitude: 33.730633, longitude: 73.266185 },
  { id: "point3", latitude: 33.730526, longitude: 73.261614 },
];

function App() {
  const mapRef: React.Ref<MapRef> = useRef(null);
  const [zoom, setZoom] = useState(14);

  useEffect(() => {
    const map = mapRef.current;
    const handleZoom = () => {
      if (map) {
        const newZoom = map.getMap().getZoom();
        setZoom(newZoom);
        console.log(newZoom);
      }
    };

    if (map) {
      mapRef.current.getMap().on("zoom", handleZoom);
    }

    return () => {
      if (map) {
        map.getMap().off("zoom", handleZoom);
      }
    };
  }, []);

  return (
    <Map
      ref={mapRef}
      mapLib={import("mapbox-gl")}
      mapboxAccessToken="pk.eyJ1IjoiYWhtZWRyYWZpdWxsYWgiLCJhIjoiY2xvc3ZnaTJ0MDNoaDJpcGt4bHNyeHZnayJ9.mfYsX7HzOP9LNdcxpkQUsg"
      initialViewState={{
        longitude: -100,
        latitude: 40,
        zoom: 3.5,
      }}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle="mapbox://styles/mapbox/light-v11"
    >
      <GeolocateControl position="top-left" />
      <FullscreenControl position="top-left" />
      <NavigationControl position="top-left" />
      <ScaleControl />

      {circleData.map((circle) => (
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

          {zoom > 16 && (
            <div
              style={{
                background: "rgba(22, 22, 22, 0.70)",
                boxShadow:
                  "box-shadow: 0.2px 0.2px 0.5px 0px rgba(0, 0, 0, 0.10)",
              }}
              className="bg-black text-white bottom-[-33px] left-[24px] absolute p-[6px] rounded-sm w-[88px] h-[35px]"
            >
              hehhe
            </div>
          )}
        </Marker>
      ))}

      <Source
        id="line-source"
        type="geojson"
        data={{
          type: "Feature",
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
        <Layer
          id="line-layer"
          type="line"
          paint={{
            "line-color": ["get", "color"],
            "line-opacity": 1,
            "line-width": 8,
            "line-dasharray": [0.22, 0.24],
          }}
        />
      </Source>
    </Map>
  );
}

export default App;
