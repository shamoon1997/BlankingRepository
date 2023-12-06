import { API, ApiResources } from "@/api/config/api-config";
import {
  BaseLayerResponse,
  EquipmentLayerPostBody,
} from "@/api/types/types.ts";

export const getEquipmentLayer = (args: EquipmentLayerPostBody) => {
  return API.post<BaseLayerResponse>(ApiResources.getEquipmentLayer, args);
};
