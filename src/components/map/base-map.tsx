import { useMapUrlState } from "@/hooks";
import Map, {
  FullscreenControl,
  NavigationControl,
  ScaleControl,
} from "react-map-gl";
import { GridScopeLayer } from "./map-layers/gridscope-layer";
import "mapbox-gl/dist/mapbox-gl.css";

const MapBoxGL = import("mapbox-gl");
const style = { width: "100vw", height: "100vh" };

export const BaseMap = () => {
  const { setSearchParams, validatedMapUrlState } = useMapUrlState();

  return (
    <Map
      reuseMaps
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
      style={style}
      mapStyle="mapbox://styles/mapbox/light-v11"
    >
      <FullscreenControl position="top-left" />
      <NavigationControl position="top-left" />

      {/* show layers based on props in future */}
      <GridScopeLayer />

      <ScaleControl position="bottom-left" />
    </Map>
  );
};
