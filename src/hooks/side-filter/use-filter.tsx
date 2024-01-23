import { useActiveFilter, useFilterActions, useMapboxBbox } from "@/state";
import { useLayerControlUrlState } from "@/hooks";
import { SortingOrder } from "@/components/filters/filter-area/poles-list.tsx";
import { useReadFromTo } from "@/hooks/calendar";
import { useGetNetworkLayer } from "@/api/hooks/maps/use-get-network-layer.ts";
import { useGetGridScopeLayer } from "@/api/hooks/maps/use-get-gridscope-layer.ts";
import { useGetEquipmentLayer } from "@/api/hooks/maps/use-get-equipment-layer.ts";
import { useGetHeatMapLayer } from "@/api/hooks/maps/user-get-heat-map-layer.ts";
import { useState } from "react";

export const useFilter = () => {
  const bbox = useMapboxBbox();
  const { validatedLayerUrlState } = useLayerControlUrlState();
  const [sortBy, setSortBy] = useState<string>("sr-no");
  const [sortOrder, setSortOrder] = useState<SortingOrder>("asc");
  let data; // will contain all the layers data

  let dataWithOutFilter;
  const searchFilter = useActiveFilter();
  const { removeFilter } = useFilterActions();
  const fromTo = useReadFromTo();

  const {
    dataWithFilterApplied: networkData,
    dataWithLagBuffer: laggedNetworkData,
    isSuccess: isNetworkSuccess,
    isError: isNetworkError,
  } = useGetNetworkLayer(bbox);
  const {
    dataWithFilterApplied: gridScopeData,
    dataWithLagBuffer: laggedGridScopeData,
    isSuccess: isGridScopeSuccess,
    isError: isGridScopeError,
  } = useGetGridScopeLayer(bbox);
  const {
    dataWithFilterApplied: equipmentData,
    dataWithLagBuffer: laggedEquipmentData,

    isSuccess: isEquipmentSuccess,
    isError: isEquipmentError,
  } = useGetEquipmentLayer(bbox);
  const {
    dataWithFilterApplied: heatMapData,
    dataWithLagBuffer: laggedHeatMapData,

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
      dataWithOutFilter = laggedGridScopeData;
      data = gridScopeData;
      isSuccess = isGridScopeSuccess;
      isError = isGridScopeError;
      break;
    case "network":
      dataWithOutFilter = laggedNetworkData;
      data = networkData;
      isSuccess = isNetworkSuccess;
      isError = isNetworkError;
      break;
    case "heatmap":
      dataWithOutFilter = laggedHeatMapData;

      data = heatMapData;
      isSuccess = isHeatmapSuccess;
      isError = isHeatmapError;
      break;
    case "equipment":
      dataWithOutFilter = laggedEquipmentData;
      data = equipmentData;
      isSuccess = isEquipmentSuccess;
      isError = isEquipmentError;
      break;
    default:
      break;
  }

  return {
    searchFilter,
    removeFilter,
    data,
    dataWithOutFilter,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    isError,
    isSuccess,
  };
};
