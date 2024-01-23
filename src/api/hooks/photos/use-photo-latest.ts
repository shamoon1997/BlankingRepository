import { useQuery } from "@tanstack/react-query";
import { ApiResources } from "@/api/config/api-config.ts";
import { PhotoLatestResponse } from "@/api/types/types.ts";
import { getPhotosLatest } from "@/api/api-calls/photos/get-photo-latest";

export const useGetPhotoLatest = (args: string) => {
  const { data, ...rest } = useQuery<PhotoLatestResponse>({
    queryKey: [ApiResources.getPoleView, ...args],
    queryFn: async ({ signal }) => {
      const response = await getPhotosLatest(args!, signal);
      return response.data; // Assuming getPoleView returns an AxiosResponse, extract the data
    },
    enabled: args.length > 0,
  });

  return {
    data,
    ...rest,
  };
};
