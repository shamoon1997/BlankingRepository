import { API, ApiResources } from "@/api/config/api-config";
import {
  BaseLayerResponse,
  GridScopeLayerPostBody,
} from "@/api/types/types.ts";

export const getGridScopeLayer = (
  args: GridScopeLayerPostBody,
  // use signal react-query gives us to cancel out previous request to prevent stale data and unnecessary calls to the backend
  signal?: AbortSignal,
) => {
  return API.post<BaseLayerResponse>(ApiResources.getGridscopeLayer, args, {
    signal,
  });
};
