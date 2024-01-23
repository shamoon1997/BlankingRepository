import { API, ApiResources } from "@/api/config/api-config";
import { PhotoLatestResponse } from "@/api/types/types.ts";

export const getPhotosLatest = (
  args: string,
  // use signal react-query gives us to cancel out previous request to prevent stale data and unnecessary calls to the backend
  signal?: AbortSignal,
) => {
  return API.post<PhotoLatestResponse>(ApiResources.getPhotosLatest, args, {
    signal,
  });
};
