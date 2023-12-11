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
      // IMPORTANT
      // Always use the route path plus the bounding box, if two calls come under the same path
      // differentiate between them using an additional unique key, otherwise your cache will be the same
      // and the key same will be used for two logically different pieces of data causing all sorts of issues
      ApiResources.getNetworkLayer,
      args?.lat1,
      args?.lat2,
      args?.lon1,
      args?.lon2,
    ],
    queryFn: ({ signal }) => {
      return getNetworkLayer(args!, signal);
    },
    // keeps previous data in cache until we get new data
    placeholderData: keepPreviousData,
    // only fire if we get the bbox from the map never remove this
    enabled: !!args,
    // retry only one don't bombard the server
  });

  const dataWithLagBuffer: BaseLayerResponse | undefined = useMemo(() => {
    if (!data) return undefined;

    // LOGIC for the lag buffer if max lag buffer size is 3 for example.
    // get a,b,c,d,e -> A is a fetch call
    // prev is null -> B is a fetch call
    // combine A and B -> remove duplicates
    // render it out
    // set prev to c d e // keep in mind max limit of X points
    // bbox moves to another place
    // get  f g h i j k -> A
    // prev is c,d,e -> B
    // combine A and B -> remove duplicates
    // render it out
    // set prev to i j k

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

  return {
    dataWithLagBuffer,
    data,
    ...rest,
  };
};
