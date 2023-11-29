import { useMapUrlState } from "@/hooks";
import Map, { FullscreenControl, NavigationControl } from "react-map-gl";
import { GridScopeLayer } from "./map-layers/gridscope-layer";
import "mapbox-gl/dist/mapbox-gl.css";

const MapBoxGL = import("mapbox-gl");

export const BaseMap = () => {
  const { setSearchParams, validatedMapUrlState } = useMapUrlState();

  return (
    <Map
      reuseMaps
      attributionControl={false}
      maxPitch={0}
      minPitch={0}
      onMoveEnd={(e) => {
        setSearchParams(
          {
            lat: String(e.viewState.latitude),
            lng: String(e.viewState.longitude),
            bearing: String(e.viewState.bearing),
            zoom: String(e.viewState.zoom),
          },
          {
            replace: true,
            preventScrollReset: true,
          },
        );
      }}
      initialViewState={{
        latitude: validatedMapUrlState.lat,
        longitude: validatedMapUrlState.lng,
        bearing: validatedMapUrlState.bearing,
        zoom: validatedMapUrlState.zoom,
      }}
      mapLib={MapBoxGL}
      mapboxAccessToken={import.meta.env.VITE_REACT_APP_MAPBOX_KEY}
      style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      mapStyle="mapbox://styles/mapbox/light-v11"
    >
      <FullscreenControl position="bottom-left" />
      <NavigationControl position="bottom-left" />

      {/* show layers based on props in future */}

      <GridScopeLayer />
    </Map>
  );
};
