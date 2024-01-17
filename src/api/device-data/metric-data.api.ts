import { AxiosResponse } from "axios";
import { API, ApiResources } from "../config/api-config";
import { MetricDataresponseType } from "../types/types";

// CURRENTLY HARDCODED WITH IDS

export const getMetricDataAPI = (): Promise<
  AxiosResponse<MetricDataresponseType[]>
> => {
  return API.post(ApiResources.getHardwareMetricData, {
    hardware_ids: [
      "3f0017000c5030415738382000000001",
      "0f003c000e5030475837322000000001",
    ],
    t1: "2023-11-24 21:00:00",
    t2: "2023-11-24 21:30:00",
  });
};

type HardwareMetricDataPayload = {
  hardware_ids: string[];
  t1: string;
  t2: string;
};

type DeploymentMetricDataPayload = {
  deployment: string;
  t1: string;
  t2: string;
};

export const getHardwareMetricDataAPI = ({
  hardware_ids,
  t1,
  t2,
}: HardwareMetricDataPayload): Promise<
  AxiosResponse<MetricDataresponseType[]>
> => {
  return API.post(ApiResources.getHardwareMetricData, { hardware_ids, t1, t2 });
};

export const getDeploymentMetricDataAPI = ({
  deployment,
  t1,
  t2,
}: DeploymentMetricDataPayload): Promise<
  AxiosResponse<MetricDataresponseType[]>
> => {
  return API.post(ApiResources.getDeploymentMetricData, { deployment, t1, t2 });
};
