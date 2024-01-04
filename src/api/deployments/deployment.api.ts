import { API, ApiResources } from "@/api/config/api-config";
import { DeploymentResponse } from "@/api/types/types.ts";
import { AxiosResponse } from "axios";

export const getDeploymentsAPI = (): Promise<
  AxiosResponse<DeploymentResponse[]>
> => {
  return API.get<DeploymentResponse[]>(ApiResources.listDeployments);
};
