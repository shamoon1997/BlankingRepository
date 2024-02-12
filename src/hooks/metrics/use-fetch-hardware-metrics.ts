import { getHardwareMetricDataAPI } from "@/api/device-data";
import { useQuery } from "@tanstack/react-query";

interface HardwareMetricArgs {
  hardware_ids?: string[];
  t1: string;
  t2: string;
}

export const useGetHardwareMetrics = ({
  hardware_ids = [],
  t1,
  t2,
}: HardwareMetricArgs) => {
  const { data, ...rest } = useQuery({
    queryKey: ["metric-data-hardware", hardware_ids, t1, t2],
    queryFn: async () => getHardwareMetricDataAPI({ hardware_ids, t1, t2 }),
  });

  return { data, ...rest };
};
