import { API, ApiResources } from "../config/api-config";
import { MetricDataresponseType } from "../types/types";
import { decompressSync, strFromU8 } from "fflate";

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

export const getHardwareMetricDataAPI = async ({
  hardware_ids,
  t1,
  t2,
}: HardwareMetricDataPayload): Promise<MetricDataresponseType[]> => {
  return API.post(ApiResources.getHardwareMetricData, { hardware_ids, t1, t2 })
    .then((response) => {
      const res = decompressSync(new Uint8Array(response.data));
      const origText = strFromU8(res);
      const jsonResponse: MetricDataresponseType[] = JSON.parse(origText);
      return jsonResponse;
    })
    .catch((error) => {
      throw error;
    });
};

export const getDeploymentMetricDataAPI = async ({
  deployment,
  t1,
  t2,
}: DeploymentMetricDataPayload): Promise<MetricDataresponseType[]> => {
  return API.post(
    ApiResources.getDeploymentMetricData,
    { deployment, t1, t2 },
    { responseType: "arraybuffer" },
  )
    .then((response) => {
      const res = decompressSync(new Uint8Array(response.data));
      const origText = strFromU8(res);
      const jsonResponse: MetricDataresponseType[] = JSON.parse(origText);
      return jsonResponse;
    })
    .catch((error) => {
      throw error;
    });
};
