import { useQuery } from "@tanstack/react-query";
import { ApiResources } from "@/api/config/api-config.ts";
import { PoleViewResponse } from "@/api/types/types.ts";
import { getPoleView } from "@/api/api-calls/get-pole-view";

export const useGetPoleView = (args: string[]) => {
  const { data, ...rest } = useQuery<PoleViewResponse>({
    queryKey: [ApiResources.getPoleView, ...args],
    queryFn: async ({ signal }) => {
      const response = await getPoleView(args!, signal);
      return response.data; // Assuming getPoleView returns an AxiosResponse, extract the data
    },
    enabled: args && args.length > 0,
  });

  return {
    data,
    ...rest,
  };
};
