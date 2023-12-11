import { getDeploymentsAPI } from "@/api/deployments";
import { useQuery } from "@tanstack/react-query";

export const useFetchDeployments = () => {
  return useQuery({
    queryKey: ["deployments"],
    queryFn: () => {
      return getDeploymentsAPI();
    },
  });
};
