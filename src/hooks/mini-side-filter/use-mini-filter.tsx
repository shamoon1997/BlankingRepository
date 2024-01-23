import { useMapboxBbox, useMiniFilterSearchValue } from "@/state";
import { useLayerControlUrlState } from "@/hooks";
import { SortingOrder } from "@/components/filters/filter-area/poles-list.tsx";
import { useReadFromTo } from "@/hooks/calendar";
import { useGetNetworkLayer } from "@/api/hooks/maps/use-get-network-layer.ts";
import { useGetGridScopeLayer } from "@/api/hooks/maps/use-get-gridscope-layer.ts";
import { useGetEquipmentLayer } from "@/api/hooks/maps/use-get-equipment-layer.ts";
import { useGetHeatMapLayer } from "@/api/hooks/maps/user-get-heat-map-layer.ts";
import { useMemo, useState } from "react";
import Fuse from "fuse.js";
import { BaseLayerResponse, Device } from "@/api/types/types.ts";

export const useMiniFilter = () => {
  const bbox = useMapboxBbox();
  const { validatedLayerUrlState } = useLayerControlUrlState();
  const [sortBy, setSortBy] = useState<string>("sr-no");
  const [sortOrder, setSortOrder] = useState<SortingOrder>("asc");
  const searchValue = useMiniFilterSearchValue();

  let data: BaseLayerResponse | undefined;
  let devices: Device[] | undefined;

  const fromTo = useReadFromTo();

  const {
    dataWithLagBuffer: laggedNetworkData,
    isSuccess: isNetworkSuccess,
    isError: isNetworkError,
  } = useGetNetworkLayer(bbox);
  const {
    dataWithLagBuffer: laggedGridScopeData,
    isSuccess: isGridScopeSuccess,
    isError: isGridScopeError,
  } = useGetGridScopeLayer(bbox);
  const {
    dataWithLagBuffer: laggedEquipmentData,
    isSuccess: isEquipmentSuccess,
    isError: isEquipmentError,
  } = useGetEquipmentLayer(bbox);
  const {
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
      data = laggedGridScopeData;
      devices = data?.devices;
      isSuccess = isGridScopeSuccess;
      isError = isGridScopeError;
      break;
    case "network":
      data = laggedNetworkData;
      devices = data?.devices;
      isSuccess = isNetworkSuccess;
      isError = isNetworkError;
      break;
    case "heatmap":
      data = laggedHeatMapData;
      devices = data?.devices;
      isSuccess = isHeatmapSuccess;
      isError = isHeatmapError;
      break;
    case "equipment":
      data = laggedEquipmentData;
      devices = data?.devices;
      isSuccess = isEquipmentSuccess;
      isError = isEquipmentError;
      break;
    default:
      break;
  }

  // filter using fuse here this filter is only local to the mini view and ONLY affects the list shown in the mini
  // sidebar on the pole view page, the other filters in the deployments page is applied on both that map and the sidebar on that page.
  // notice above we are using lagged data and NOT the filter data

  const fuse = useMemo(() => {
    return new Fuse(devices ?? [], {
      keys: ["hardware_id", "device_sn", "pole_id"],
      threshold: 0.5,
      isCaseSensitive: false,
      getFn: (device, path) => {
        return device[path as keyof Device].toString();
      },
    });
  }, [devices]);

  const filteredDevices = useMemo(() => {
    if (searchValue === "") {
      return devices;
    } else {
      return fuse.search(searchValue).map((result) => result.item);
    }
  }, [fuse, searchValue, devices]);

  return {
    data: {
      summary: data?.summary,
      devices: filteredDevices,
    } as BaseLayerResponse,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    isError,
    isSuccess,
  };
};
