import { getDeploymentMetricDataAPI } from "@/api/device-data";
import { useQuery } from "@tanstack/react-query";

interface DeploymentMetricArgs {
  deployment?: string;
  t1: string;
  t2: string;
}

export const useGetDeploymentMetrics = ({
  deployment = "BWP",
  t1,
  t2,
}: DeploymentMetricArgs) => {
  const { data, ...rest } = useQuery({
    queryKey: ["metric-data-deployment", deployment, t1, t2],
    queryFn: async () => getDeploymentMetricDataAPI({ deployment, t1, t2 }),
  });

  return { data, ...rest };
};
