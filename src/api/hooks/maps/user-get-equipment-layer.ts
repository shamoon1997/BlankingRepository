import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ApiResources } from "@/api/config/api-config.ts";
import { EquipmentLayerPostBody } from "@/api/types/types.ts";
import { getEquipmentLayer } from "@/api/maps/get-equipment-layer.ts";

export const useGetEquipmentLayer = (args: EquipmentLayerPostBody | null) => {
  return useQuery({
    queryKey: [
      // IMPORTANT
      // Always use the route path plus the bounding box, if two calls come under the same path
      // differentiate between them using an additional unique key, otherwise your cache will be the same
      // key will be used for two logically different pieces of data causing all sorts of issues
      ApiResources.getEquipmentLayer,
      args?.lat1,
      args?.lat2,
      args?.lon1,
      args?.lon2,
    ],
    queryFn: () => {
      return getEquipmentLayer(args!);
    },
    // keeps previous data in cache until we get new data
    placeholderData: keepPreviousData,
    // only fire if we get the bbox from the map never remove this
    enabled: !!args,
    // retry only one don't bombard the server
  });
};
