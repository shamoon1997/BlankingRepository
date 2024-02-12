import { API, ApiResources } from "@/api/config/api-config";
import { takeNewPhotoResponse, takeNewPhotoBody } from "@/api/types/types.ts";

export const takeNewPhoto = (
  args: takeNewPhotoBody,
  // use signal react-query gives us to cancel out previous request to prevent stale data and unnecessary calls to the backend
  signal?: AbortSignal,
) => {
  return API.post<takeNewPhotoResponse>(ApiResources.takeNewPhoto, args, {
    signal,
  });
};
