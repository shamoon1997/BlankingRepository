import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ApiResources, MAX_LAG_BUFFER_LIMIT } from "@/api/config/api-config.ts";
import {
  BaseLayerResponse,
  Device,
  EquipmentLayerPostBody,
} from "@/api/types/types.ts";
import { useMemo, useRef } from "react";
import { uniqBy } from "lodash";
import { getNetworkLayer } from "@/api/api-calls/get-network-layer.ts";

export const useGetNetworkLayer = (args: EquipmentLayerPostBody | null) => {
  const lagBuffer = useRef<Device[] | undefined>([]);
  const { data, ...rest } = useQuery({
    queryKey: [
      ApiResources.getNetworkLayer,
      args?.lat1,
      args?.lat2,
      args?.lon1,
      args?.lon2,
    ],
    queryFn: ({ signal }) => {
      return getNetworkLayer(args!, signal);
    },
    placeholderData: keepPreviousData,
    enabled: !!args,
  });

  const dataWithLagBuffer: BaseLayerResponse | undefined = useMemo(() => {
    if (!data) return undefined;

    const newDevices = [
      ...(data.data.devices?.slice?.() ?? []),
      ...(lagBuffer.current ?? []),
    ];

    const deduplicatedDevices = uniqBy(newDevices, (dev) => dev.hardware_id);

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

  return {
    dataWithLagBuffer,
    data,
    ...rest,
  };
};
