import { useQuery } from "@tanstack/react-query";
import { ApiResources } from "@/api/config/api-config.ts";
import { PhotoGalleryResponse } from "@/api/types/types.ts";
import { getPhotosGallery } from "@/api/api-calls/photos/get-photo-gallery";

export const useGetPhotoGallery = (args: string[]) => {
  const { data, ...rest } = useQuery<PhotoGalleryResponse>({
    queryKey: [ApiResources.getPoleView, ...args],
    queryFn: async ({ signal }) => {
      const response = await getPhotosGallery(args!, signal);
      return response.data; // Assuming getPoleView returns an AxiosResponse, extract the data
    },
    enabled: args && args.length > 0,
  });

  return {
    data,
    ...rest,
  };
};
