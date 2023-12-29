import { API, ApiResources } from "@/api/config/api-config";
import { EquipmentsListResponse } from "@/api/types/types.ts";

export const getEquipmentsList = (signal?: AbortSignal) => {
  return API.get<EquipmentsListResponse>(ApiResources.listEquipments, {
    signal,
  });
};
