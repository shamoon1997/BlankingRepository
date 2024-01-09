import { API, ApiResources } from "../config/api-config";
import { MetricDataresponseType } from "../types/types";

// CURRENTLY HARDCODED WITH IDS

export const getMetricDataAPI = (): Promise<MetricDataresponseType> => {
  return API.post(ApiResources.getMetricData, {
    hardware_ids: [
      "3f0017000c5030415738382000000001",
      "0f003c000e5030475837322000000001",
    ],
    t1: "2023-11-24 21:00:00",
    t2: "2023-11-24 21:30:00",
  });
};
