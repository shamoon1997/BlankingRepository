import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ApiResources, MAX_LAG_BUFFER_LIMIT } from "@/api/config/api-config.ts";
import {
  BaseLayerResponse,
  Device,
  EquipmentLayerPostBody,
} from "@/api/types/types.ts";
import { useMemo, useRef } from "react";
import { uniqBy } from "lodash";
import { getGridScopeLayer } from "@/api/api-calls/get-gridscope-layer.ts";
import { useActiveFilter } from "@/stores/map-filter.store";
import { applyFilterFunc } from "@/utils/map";

export const useGetGridScopeLayer = (args: EquipmentLayerPostBody | null) => {
  const lagBuffer = useRef<Device[] | undefined>([]);

  // From filter store
  const filters = useActiveFilter();

  const { data, ...rest } = useQuery({
    queryKey: [
      // IMPORTANT
      // Always use the route path plus the bounding box, if two calls come under the same path
      // differentiate between them using an additional unique key, otherwise your cache will be the same
      // and the key same will be used for two logically different pieces of data causing all sorts of issues
      ApiResources.getGridscopeLayer,
      args?.lat1,
      args?.lat2,
      args?.lon1,
      args?.lon2,
    ],
    queryFn: ({ signal }) => {
      return getGridScopeLayer(args!, signal);
    },
    // keeps previous data in cache until we get new data
    placeholderData: keepPreviousData,
    // only fire if we get the bbox from the map never remove this
    enabled: !!args,
    // retry only one don't bombard the server
  });

  const dataWithLagBuffer: BaseLayerResponse | undefined = useMemo(() => {
    if (!data) return undefined;

    //render out these
    const newDevices = [
      ...(data.data.devices?.slice?.() ?? []),
      //   get what ever is in the current buffer, order does not matter as points are geographically placed not order wise
      ...(lagBuffer.current ?? []),
    ];

    // de-duplicate points by hardware id
    // hardware id must ALWAYS be unique GLOBALLY
    const deduplicatedDevices = uniqBy(newDevices, (dev) => dev.hardware_id);

    // updated the prev buffer and use it to the maximum amount
    const prevData = data.data.devices.slice(-MAX_LAG_BUFFER_LIMIT);
    const bufferLength = lagBuffer.current?.length ?? 0;
    const combinedLength = bufferLength + prevData.length;

    if (combinedLength > MAX_LAG_BUFFER_LIMIT) {
      const itemsToDelete = combinedLength - MAX_LAG_BUFFER_LIMIT;
      lagBuffer.current?.splice(0, itemsToDelete);
    }
    lagBuffer.current?.push(...prevData);

    return {
      summary: data.data.summary,
      devices: deduplicatedDevices,
    };
  }, [data]);

  const dataWithFilterApplied: BaseLayerResponse | undefined = useMemo(() => {
    if (!data) return undefined;
    if (!data?.data?.devices?.length && filters?.length < 1) return data.data;

    let filtList: Device[] = data?.data?.devices;

    for (let i = 0; i < filters?.length; i++) {
      filtList = applyFilterFunc(
        data?.data?.devices as unknown as Device[],
        filters[i],
      );
    }

    return { summary: data.data.summary, devices: filtList };
  }, [data, filters]);

  return {
    dataWithLagBuffer,
    dataWithFilterApplied,
    data,
    ...rest,
  };
};
