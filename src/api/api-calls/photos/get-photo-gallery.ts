import { API, ApiResources } from "@/api/config/api-config";
import { PhotoGalleryResponse } from "@/api/types/types.ts";

export const getPhotosGallery = (
  args: string[],
  // use signal react-query gives us to cancel out previous request to prevent stale data and unnecessary calls to the backend
  signal?: AbortSignal,
) => {
  return API.post<PhotoGalleryResponse>(ApiResources.getPhotosGallery, args, {
    signal,
  });
};
