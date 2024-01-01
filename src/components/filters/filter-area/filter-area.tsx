import { useState } from "react";
import { useLayerControlUrlState } from "@/hooks";
import { useGetNetworkLayer } from "@/api/hooks/maps/use-get-network-layer.ts";
import { useGetGridScopeLayer } from "@/api/hooks/maps/use-get-gridscope-layer.ts";
import { AreaSummary } from "./area-summary";
import { FilterControls } from "./filter-controls";
import { ListSorter } from "./list-sorter";
import { PolesList } from "./poles-list";
import { useMapboxBbox } from "@/state/map/bbox-store.tsx";
import { useActiveFilter, useFilterActions } from "@/state/map";
import { getFilterBadgeText } from "@/utils/map";
import { CloseIcon } from "@/assets";
import { useGetEquipmentLayer } from "@/api/hooks/maps/use-get-equipment-layer.ts";
import { useGetHeatMapLayer } from "@/api/hooks/maps/user-get-heat-map-layer.ts";
import { useReadToFrom } from "@/hooks/calendar";

export const FilterArea = () => {
  const bbox = useMapboxBbox();
  const { validatedLayerUrlState } = useLayerControlUrlState();
  const [sortBy, setSortBy] = useState<string>("sr-no");
  let data; // will contain all the layers data

  const searchFilter = useActiveFilter();
  const { removeFilter } = useFilterActions();
  const fromTo = useReadToFrom();

  // network calls for all the layers in parallel
  const { dataWithFilterApplied: networkData } = useGetNetworkLayer(bbox);
  const { dataWithFilterApplied: gridScopeData } = useGetGridScopeLayer(bbox);
  const { dataWithFilterApplied: equipmentData } = useGetEquipmentLayer(bbox);
  const { dataWithFilterApplied: heatMapData } = useGetHeatMapLayer(
    bbox
      ? {
          ...bbox,
          t1: fromTo.from,
          t2: fromTo.to,
        }
      : null,
  );

  switch (validatedLayerUrlState.layer) {
    case "gridscope":
      data = gridScopeData;
      break;
    case "network":
      data = networkData;
      break;
    case "heatmap":
      data = heatMapData;
      break;
    case "equipment":
      data = equipmentData;
      break;
    default:
      return;
  }

  return (
    <div className="z-10 box-border flex w-[380px] shrink-0 flex-col border-r-[0.5px]  border-solid border-r-[rgba(91,91,91,0.5)]  pt-3 shadow-filter-area ">
      <FilterControls />
      <div className="mb-[8px] flex gap-2 px-[16px]">
        {searchFilter.map((item, i) => {
          const { filter, operator, value } = item;
          return (
            <div
              key={`${item.value}-${i}`}
              className="flex items-center justify-between rounded-sm bg-[#EEEEEE] px-2 py-1  font-semibold text-primary"
            >
              <div className="text-[11px] capitalize">
                {getFilterBadgeText(filter, operator, value)}
              </div>

              <CloseIcon
                className="ml-2 h-2 w-2 cursor-pointer rounded-full text-black"
                /* eslint-disable-next-line @typescript-eslint/no-unsafe-return */
                onClick={() => removeFilter(i)}
              />
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
