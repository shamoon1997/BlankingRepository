import { useLayerControlUrlState, useMapUrlState } from "@/hooks";
import Map, { MapRef } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef } from "react";
import { useGetNetworkLayer } from "@/api/hooks/maps/use-get-network-layer.ts";
import { useGetGridScopeLayer } from "@/api/hooks/maps/use-get-gridscope-layer.ts";
import { EquipmentLayer } from "@/components/map/map-layers/equipment-layer.tsx";
import { useGetEquipmentLayer } from "@/api/hooks/maps/use-get-equipment-layer.ts";
import {
  useMapboxBbox,
  useMapboxBboxActions,
} from "@/state/map/bbox-store.tsx";
import { useReadFromTo } from "@/hooks/calendar";
import { useGetHeatMapLayer } from "@/api/hooks/maps/user-get-heat-map-layer.ts";

import { MiniNetworkLayer } from "@/components/map/mini-map-layers/mini-network-layer.tsx";
import { MiniHeatMapLayer } from "@/components/map/mini-map-layers/mini-heat-map-layer.tsx";
import { MiniGridScopeLayer } from "./mini-map-layers/mini-gridscope-layer";

const MapBoxGL = import("mapbox-gl");

export const MiniBaseMap = () => {
  const { searchParams, setSearchParams, validatedMapUrlState } =
    useMapUrlState();
  const { validatedLayerUrlState } = useLayerControlUrlState();
  const ref = useRef<MapRef | null>(null);

  const fromTo = useReadFromTo();

  const bbox = useMapboxBbox();
  const { setDebouncedBbox } = useMapboxBboxActions();
  // network calls for all the layers in parallel
  useGetNetworkLayer(bbox);
  useGetGridScopeLayer(bbox);
  useGetEquipmentLayer(bbox);
  useGetHeatMapLayer(
    bbox
      ? {
          ...bbox,
          t1: fromTo.from,
          t2: fromTo.to,
        }
      : null,
  );

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
      animate: false,
      zoom: validatedMapUrlState.zoom,
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
      {validatedLayerUrlState.layer === "gridscope" && <MiniGridScopeLayer />}
      {validatedLayerUrlState.layer === "heatmap" && <MiniHeatMapLayer />}
      {validatedLayerUrlState.layer === "equipment" && <EquipmentLayer />}
      {validatedLayerUrlState.layer === "network" && <MiniNetworkLayer />}
    </Map>
  );
};
