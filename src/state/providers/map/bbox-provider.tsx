import React, { createContext, useMemo, useState } from "react";
import { CommonLayerPostBody } from "@/api/types/types.ts";
import debounce from "lodash/debounce";
import { DebouncedFunc } from "lodash";

export const MapBboxContext = createContext<{
  bbox: CommonLayerPostBody | null;
  setDebouncedBbox: DebouncedFunc<(e: any) => void>;
}>({
  bbox: null,
  setDebouncedBbox: debounce(() => {}),
});

type MapBboxProviderProps = {
  children: React.ReactNode;
};
export const MapBboxProvider = ({ children }: MapBboxProviderProps) => {
  const [bbox, setBbox] = useState<CommonLayerPostBody | null>(null);

  // Debounce function for setting bbox
  const setDebouncedBbox = useMemo(
    () =>
      debounce((e) => {
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

  const providerValue = useMemo(() => {
    return {
      bbox,
      setDebouncedBbox,
    };
  }, [bbox]);

  return (
    <MapBboxContext.Provider value={providerValue}>
      {children}
    </MapBboxContext.Provider>
  );
};
