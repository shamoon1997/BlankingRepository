import { useMapUrlState } from "@/hooks";
import Map, {
  FullscreenControl,
  NavigationControl,
  ViewStateChangeEvent,
} from "react-map-gl";
// import { GridScopeLayer } from "./map-layers/gridscope-layer";
import "mapbox-gl/dist/mapbox-gl.css";
import { useGetEquipmentLayer } from "@/api/hooks/maps/user-get-equipment-layer.ts";
import { useMemo, useState } from "react";
import { CommonLayerPostBody } from "@/api/types/types.ts";
import debounce from "lodash/debounce";
import mapboxgl from "mapbox-gl";
import { EquipmentLayer } from "@/components/map/map-layers/equipment-layer.tsx";
import { MapNetworkStatus } from "@/components/map/map-network-status/map-network-status.tsx";

const MapBoxGL = import("mapbox-gl");

export const BaseMap = () => {
  const { setSearchParams, validatedMapUrlState } = useMapUrlState();
  const [bbox, setBbox] = useState<CommonLayerPostBody | null>(null);
  // network calls for all the layers
  const { data, isError, isLoading, isRefetching } = useGetEquipmentLayer(bbox);

  const setDebouncedBbox = useMemo(
    () =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      debounce((e: mapboxgl.MapboxEvent<undefined> | ViewStateChangeEvent) => {
        const bounds = e.target.getBounds();
        const northWest = bounds.getNorthWest();
        const southEast = bounds.getSouthEast();
        setBbox({
          lat1: northWest.lat,
          lon1: northWest.lng,
          lat2: southEast.lat,
          lon2: southEast.lng,
        });
      }, 700),
    [],
  );

  return (
    <Map
      onLoad={setDebouncedBbox}
      reuseMaps
      attributionControl={false}
      maxPitch={0}
      minPitch={0}
      onMoveEnd={(e) => {
        setDebouncedBbox(e);
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
      {(isLoading || isRefetching) && (
        <MapNetworkStatus>Loading...</MapNetworkStatus>
      )}
      {isError && (
        <MapNetworkStatus>
          An Error Occurred. Please share logs with the developer team.
        </MapNetworkStatus>
      )}
      <FullscreenControl position="bottom-left" />
      <NavigationControl position="bottom-left" showCompass />

      {/* show layers based on props in future */}

      {/*<GridScopeLayer />*/}
      <EquipmentLayer
        data={data?.data}
        isError={isError}
        isLoading={isLoading}
      />
    </Map>
  );
};
