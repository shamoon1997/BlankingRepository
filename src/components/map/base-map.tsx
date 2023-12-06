import { useMapUrlState } from "@/hooks";
import Map, { FullscreenControl, NavigationControl } from "react-map-gl";
import { GridScopeLayer } from "./map-layers/gridscope-layer";
import "mapbox-gl/dist/mapbox-gl.css";

const MapBoxGL = import("mapbox-gl");

export const BaseMap = () => {
  const { setSearchParams, validatedMapUrlState } = useMapUrlState();
  // a,b,c,d

  return (
    <Map
      reuseMaps
      attributionControl={false}
      maxPitch={0}
      minPitch={0}
      onMoveEnd={(e) => {
        setSearchParams(
          (params) => {
            params.set("lat", String(e.viewState.latitude));
            params.set("lng", String(e.viewState.longitude));
            params.set("bearing", String(e.viewState.bearing));
            params.set("zoom", String(e.viewState.zoom));
            return params;
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
      {/*  layer selector*/}
      <GridScopeLayer />
    </Map>
  );
};
