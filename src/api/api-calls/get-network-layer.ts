import { API, ApiResources } from "@/api/config/api-config";
import { BaseLayerResponse, NetworkLayerPostBody } from "@/api/types/types.ts";

export const getNetworkLayer = (
  args: NetworkLayerPostBody,
  // use signal react-query gives us to cancel out previous request to prevent stale data and unnecessary calls to the backend
  signal?: AbortSignal,
) => {
  return API.post<BaseLayerResponse>(ApiResources.getNetworkLayer, args, {
    signal,
  });
};
