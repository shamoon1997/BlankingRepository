import { useMapUrlState } from "@/hooks";
import Map, {
  FullscreenControl,
  NavigationControl,
  ViewStateChangeEvent,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useMemo, useState } from "react";
import { CommonLayerPostBody } from "@/api/types/types.ts";
import debounce from "lodash/debounce";
import mapboxgl from "mapbox-gl";
import { MapNetworkStatus } from "@/components/map/map-network-status/map-network-status.tsx";
import { useGetNetworkLayer } from "@/api/hooks/maps/use-get-network-layer.ts";
import { GridScopeLayer } from "@/components";

const MapBoxGL = import("mapbox-gl");

export const BaseMap = () => {
  const { searchParams, setSearchParams, validatedMapUrlState } =
    useMapUrlState();

  const [bbox, setBbox] = useState<CommonLayerPostBody | null>(null);
  // network calls for all the layers
  const { dataWithLagBuffer, isError, isLoading, isRefetching, isSuccess } =
    useGetNetworkLayer(bbox);

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
      }, 600),
    [],
  );

  return (
    <Map
      onLoad={setDebouncedBbox}
      reuseMaps
      attributionControl={false}
      maxPitch={0}
      minPitch={0}
      minZoom={12}
      onMoveEnd={(e) => {
        setDebouncedBbox(e);
        searchParams.set("lat", String(e.viewState.latitude));
        searchParams.set("lng", String(e.viewState.longitude));
        searchParams.set("bearing", String(e.viewState.bearing));
        searchParams.set("zoom", String(e.viewState.zoom));
        setSearchParams(searchParams, {
          replace: true,
          preventScrollReset: true,
        });
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
      {!isLoading &&
        !isRefetching &&
        isSuccess &&
        dataWithLagBuffer?.devices.length === 0 && (
          <MapNetworkStatus>No poles found in this area</MapNetworkStatus>
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

      {/*<EquipmentLayer*/}
      {/*  data={dataWithLagBuffer}*/}
      {/*  isError={isError}*/}
      {/*  isLoading={isLoading}*/}
      {/*/>*/}

      <GridScopeLayer
        data={dataWithLagBuffer}
        isLoading={isError}
        isError={isLoading}
      />
    </Map>
  );
};
