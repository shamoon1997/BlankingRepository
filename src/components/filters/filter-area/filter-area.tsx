import { useState } from "react";
import { useLayerControlUrlState } from "@/hooks";
import { useGetNetworkLayer } from "@/api/hooks/maps/use-get-network-layer.ts";
import { useGetGridScopeLayer } from "@/api/hooks/maps/use-get-gridscope-layer.ts";
import { AreaSummary } from "./area-summary";
import { FilterControls } from "./filter-controls";
import { ListSorter } from "./list-sorter";
import { PolesList, SortingOrder } from "./poles-list";
import { useMapboxBbox } from "@/state/map/bbox-store.tsx";
import { useActiveFilter, useFilterActions } from "@/state/map";
import { getFilterBadgeText } from "@/utils/map";

import { useGetEquipmentLayer } from "@/api/hooks/maps/use-get-equipment-layer.ts";
import { useGetHeatMapLayer } from "@/api/hooks/maps/user-get-heat-map-layer.ts";
import { useReadToFrom } from "@/hooks/calendar";
import { CloseIcon } from "@/assets/misc";

export const FilterArea = () => {
  const bbox = useMapboxBbox();
  const { validatedLayerUrlState } = useLayerControlUrlState();
  const [sortBy, setSortBy] = useState<string>("sr-no");
  const [sortOrder, setSortOrder] = useState<SortingOrder>("asc");
  let data; // will contain all the layers data

  const searchFilter = useActiveFilter();
  const { removeFilter } = useFilterActions();
  const fromTo = useReadToFrom();

  const {
    dataWithFilterApplied: networkData,
    isSuccess: isNetworkSuccess,
    isError: isNetworkError,
  } = useGetNetworkLayer(bbox);
  const {
    dataWithFilterApplied: gridScopeData,

    isSuccess: isGridScopeSuccess,
    isError: isGridScopeError,
  } = useGetGridScopeLayer(bbox);
  const {
    dataWithFilterApplied: equipmentData,

    isSuccess: isEquipmentSuccess,
    isError: isEquipmentError,
  } = useGetEquipmentLayer(bbox);
  const {
    dataWithFilterApplied: heatMapData,

    isSuccess: isHeatmapSuccess,
    isError: isHeatmapError,
  } = useGetHeatMapLayer(
    bbox
      ? {
          ...bbox,
          t1: fromTo.from,
          t2: fromTo.to,
        }
      : null,
  );

  // default is loading is true
  let isSuccess = false;
  let isError = false;
  switch (validatedLayerUrlState.layer) {
    case "gridscope":
      data = gridScopeData;
      isSuccess = isGridScopeSuccess;
      isError = isGridScopeError;
      break;
    case "network":
      data = networkData;
      isSuccess = isNetworkSuccess;
      isError = isNetworkError;
      break;
    case "heatmap":
      data = heatMapData;
      isSuccess = isHeatmapSuccess;
      isError = isHeatmapError;
      break;
    case "equipment":
      data = equipmentData;
      isSuccess = isEquipmentSuccess;
      isError = isEquipmentError;
      break;
    default:
      break;
  }

  return (
    <div className="z-10 box-border flex w-[300px] shrink-0 flex-col border-r-[0.5px]  border-solid border-r-[rgba(91,91,91,0.5)]  pt-3 shadow-filter-area ">
      <FilterControls />
      <div className="mb-[8px] flex flex-wrap gap-2 px-[16px]">
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
                className="ml-2 h-4 w-4 cursor-pointer rounded-full text-black"
                /* eslint-disable-next-line @typescript-eslint/no-unsafe-return */
                onClick={() => removeFilter(i)}
              />
            </div>
          );
        })}
      </div>
      <AreaSummary data={data} />
      <ListSorter
        sortBy={sortBy}
        setSortBy={setSortBy}
        setSortOrder={setSortOrder}
        sortingOrder={sortOrder}
      />
      <PolesList
        data={data}
        sortBy={sortBy}
        sortingOrder={sortOrder}
        isSuccess={isSuccess}
        isError={isError}
      />
    </div>
  );
};
