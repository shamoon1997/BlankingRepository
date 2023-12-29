import { useState } from "react";
import { useLayerControlUrlState } from "@/hooks";
import { useGetNetworkLayer } from "@/api/hooks/maps/use-get-network-layer.ts";
import { useGetGridScopeLayer } from "@/api/hooks/maps/use-get-gridscope-layer.ts";
import { AreaSummary } from "./area-summary";
import { FilterControls } from "./filter-controls";
import { ListSorter } from "./list-sorter";
import { PolesList } from "./poles-list";
import { useMapboxBbox } from "@/state/map/bbox-store.tsx";
import { useActiveFilter, useRemoveFilter } from "@/stores/map-filter.store";

export const FilterArea = () => {
  const bbox = useMapboxBbox();
  const { validatedLayerUrlState } = useLayerControlUrlState();
  const [sortBy, setSortBy] = useState<string>("sr-no");
  let data; // will contain all the layers data

  const searchFilter = useActiveFilter();
  const remove = useRemoveFilter();

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
      <div className="mb-[8px] flex gap-2 px-[16px]">
        {searchFilter.map((item, i) => {
          return (
            <div
              key={`${item.value}-${i}`}
              className="flex justify-between rounded-lg bg-[#EEEEEE] px-2 py-1 text-[8px] font-semibold text-primary"
            >
              <div className="capitalize">
                {item.filter} {item.operator} {item.value}
              </div>

              <div
                className="ml-2 cursor-pointer rounded-full"
                onClick={() => remove(i)}
              >
                x
              </div>
            </div>
          );
        })}
      </div>
      <AreaSummary data={data} />
      <ListSorter sortBy={sortBy} setSortBy={setSortBy} />
      <PolesList data={data} sortBy={sortBy} />
    </div>
  );
};
