import { useLayerControlUrlState, useMapUrlState } from "@/hooks";
import Map, {
  FullscreenControl,
  MapRef,
  NavigationControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef } from "react";
import { useGetNetworkLayer } from "@/api/hooks/maps/use-get-network-layer.ts";
import { GridScopeLayer } from "@/components";
import { NetworkLayer } from "@/components/map/map-layers/network-layer.tsx";
import { useGetGridScopeLayer } from "@/api/hooks/maps/use-get-gridscope-layer.ts";
import { EquipmentLayer } from "@/components/map/map-layers/equipment-layer.tsx";
import { useGetEquipmentLayer } from "@/api/hooks/maps/use-get-equipment-layer.ts";
import {
  useMapboxBbox,
  useMapboxBboxActions,
} from "@/state/map/bbox-store.tsx";

const MapBoxGL = import("mapbox-gl");

export const BaseMap = () => {
  const { searchParams, setSearchParams, validatedMapUrlState } =
    useMapUrlState();
  const { validatedLayerUrlState } = useLayerControlUrlState();
  const ref = useRef<MapRef | null>(null);

  const bbox = useMapboxBbox();
  const { setDebouncedBbox } = useMapboxBboxActions();
  // network calls for all the layers in parallel
  useGetNetworkLayer(bbox);
  useGetGridScopeLayer(bbox);
  useGetEquipmentLayer(bbox);

  useEffect(() => {
    const zoom = ref.current?.getZoom();
    const bearing = ref.current?.getBearing();
    const lat = ref.current?.getCenter().lat;
    const lng = ref.current?.getCenter().lng;

    // flyTo disable drag interaction, so we want only run if flyTo values are different
    if (
      zoom === validatedMapUrlState.zoom &&
      bearing === validatedMapUrlState.bearing &&
      lat === validatedMapUrlState.lat &&
      lng === validatedMapUrlState.lng
    ) {
      return;
    }
    ref.current?.flyTo({
      bearing: validatedMapUrlState.bearing,
      center: {
        lat: validatedMapUrlState.lat,
        lng: validatedMapUrlState.lng,
      },
    });
  }, [
    validatedMapUrlState.bearing,
    validatedMapUrlState.lat,
    validatedMapUrlState.lng,
    validatedMapUrlState.zoom,
  ]);

  return (
    <Map
      ref={ref}
      onLoad={setDebouncedBbox}
      reuseMaps
      attributionControl={false}
      maxPitch={0}
      minPitch={0}
      minZoom={12}
      onMoveEnd={(e) => {
        setDebouncedBbox(e);
        searchParams.set("lat", String(e.viewState.latitude.toPrecision(8)));
        searchParams.set("lng", String(e.viewState.longitude.toPrecision(8)));
        searchParams.set("bearing", String(e.viewState.bearing));
        searchParams.set("zoom", String(e.viewState.zoom.toPrecision(4)));
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
      <FullscreenControl position="bottom-left" />
      <NavigationControl position="bottom-left" showCompass />
      {validatedLayerUrlState.layer === "gridscope" && <GridScopeLayer />}
      {/*//TODO: re-enable when calendar is done this week*/}
      {/*{validatedLayerUrlState.layer === "heatmap" && (*/}
      {/*  <HeatMapLayer key="heatmap" />*/}
      {/*)}*/}
      {/*  // TODO: re-enable when multi select drop down is done this week */}
      {validatedLayerUrlState.layer === "equipment" && <EquipmentLayer />}
      {validatedLayerUrlState.layer === "network" && <NetworkLayer />}
    </Map>
  );
};
