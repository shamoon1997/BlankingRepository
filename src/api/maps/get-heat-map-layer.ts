import { API, ApiResources } from "@/api/config/api-config";
import { BaseLayerResponse, CommonLayerPostBody } from "@/api/types/types.ts";

export const getHeatMapLayer = (args: CommonLayerPostBody) => {
  return API.post<BaseLayerResponse>(ApiResources.getHeatMapLayer, args);
};
