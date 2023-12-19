import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ApiResources } from "@/api/config/api-config.ts";
import { getEquipmentsList } from "@/api/api-calls/get-equipments-list.ts";

export const useGetEquipmentsList = () => {
  return useQuery({
    queryKey: [
      // IMPORTANT
      // Always use the route path plus the bounding box, if two calls come under the same path
      // differentiate between them using an additional unique key, otherwise your cache will be the same
      // and the key same will be used for two logically different pieces of data causing all sorts of issues
      ApiResources.listEquipments,
    ],
    queryFn: ({ signal }) => {
      return getEquipmentsList(signal);
    },
    // keeps previous data in cache until we get new data
    placeholderData: keepPreviousData,
    // only fire if we get the bbox from the map never remove this
  });
};
