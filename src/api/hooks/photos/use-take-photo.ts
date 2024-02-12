import { useQuery } from "@tanstack/react-query";
import { ApiResources } from "@/api/config/api-config.ts";
import { takeNewPhotoResponse } from "@/api/types/types.ts";
import { takeNewPhoto } from "@/api/api-calls/photos/take-new-photo";
import { takeNewPhotoBody } from "@/api/types/types.ts";

export const useTakeNewPhoto = (args: takeNewPhotoBody) => {
  const { data, ...rest } = useQuery<takeNewPhotoResponse>({
    queryKey: [ApiResources.takeNewPhoto, ...args.front],
    queryFn: async ({ signal }) => {
      const response = await takeNewPhoto(args!, signal);
      return response.data; // Assuming getPoleView returns an AxiosResponse, extract the data
    },
    enabled: args.front.length > 0,
  });

  return {
    data,
    ...rest,
  };
};
