import { useState } from "react";
import { useLayerControlUrlState } from "@/hooks";
import { useGetNetworkLayer } from "@/api/hooks/maps/use-get-network-layer.ts";
import { useGetGridScopeLayer } from "@/api/hooks/maps/use-get-gridscope-layer.ts";
import { AreaSummary } from "./area-summary";
import { FilterControls } from "./filter-controls";
import { ListSorter } from "./list-sorter";
import { PolesList } from "./poles-list";
import { useMapboxBbox } from "@/state/map/bbox-store.tsx";

export const FilterArea = () => {
  const bbox = useMapboxBbox();
  const { validatedLayerUrlState } = useLayerControlUrlState();
  const [sortBy, setSortBy] = useState<string>("sr-no");
  let data; // will contain all the layers data

  // network calls for all the layers in parallel
  const { dataWithLagBuffer: dataN } = useGetNetworkLayer(bbox);
  const { dataWithLagBuffer: dataG } = useGetGridScopeLayer(bbox);

  switch (validatedLayerUrlState.layer) {
    case "gridscope":
      data = dataG;
      break;
    case "network":
      data = dataN;
      break;
    default:
      return;
  }

  return (
    <div className="z-10 box-border flex w-[380px] shrink-0 flex-col border-r-[0.5px]  border-solid border-r-[rgba(91,91,91,0.5)]  pt-3 shadow-filter-area ">
      <FilterControls />
      <AreaSummary data={data} />
      <ListSorter sortBy={sortBy} setSortBy={setSortBy} />
      <PolesList data={data} sortBy={sortBy} />
    </div>
  );
};
