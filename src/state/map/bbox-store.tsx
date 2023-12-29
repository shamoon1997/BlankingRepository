import { create } from "zustand";
import { CommonLayerPostBody } from "@/api/types/types.ts";
import debounce from "lodash/debounce";
import mapboxgl from "mapbox-gl";
import { ViewStateChangeEvent } from "react-map-gl";

type MapBboxStore = {
  bbox: CommonLayerPostBody | null;
  actions: {
    setDebouncedBbox: (
      e: mapboxgl.MapboxEvent<undefined> | ViewStateChangeEvent,
    ) => void;
  };
};

const useMapboxBboxStore = create<MapBboxStore>((set) => {
  const debounced = debounce(
    (e: mapboxgl.MapboxEvent<undefined> | ViewStateChangeEvent) => {
      const bounds = e.target.getBounds();
      const northWest = bounds.getNorthWest();
      const southEast = bounds.getSouthEast();

      set({
        bbox: {
          lat1: northWest.lat,
          lon1: northWest.lng,
          lat2: southEast.lat,
          lon2: southEast.lng,
        },
      });
    },
    600,
  );

  return {
    bbox: null,
    actions: {
      setDebouncedBbox: (e) => {
        debounced(e);
      },
    },
  };
});

export const useMapboxBbox = () => {
  return useMapboxBboxStore((state) => state.bbox);
};

// separate hook for actions related to the data
export const useMapboxBboxActions = () => {
  return useMapboxBboxStore((state) => state.actions);
};
