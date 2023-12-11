import { API, ApiResources } from "@/api/config/api-config";
import { BaseLayerResponse } from "@/api/types/types.ts";

export const getDeploymentsAPI = () => {
  return API.get<BaseLayerResponse>(ApiResources.listDeployments);
};
