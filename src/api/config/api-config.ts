import axios from "axios";

export const API = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_BASE_URL,
  withCredentials: false,
});

// Get the docs from this url https://mycroft-v2.gridware.io:8000/docs it's going to give a warning about certificate
// just click advanced and click proceed.

export const ApiResources = {
  listDeployments: "list/deployment",
  listEquipments: "list/equipment",
  getGridscopeLayer: "layer/gridscope",
  getNetworkLayer: "layer/network",
  getHeatMapLayer: "layer/heatmap",
  getEquipmentLayer: "layer/equipment",

  getPoleView: "/poleview",

  // Device Data here:
  getMetricData: "/device_data/metric_data",
  getDeploymentMetricData: "/device_data/metric_data_by_deployment",
};

export const MAX_LAG_BUFFER_LIMIT = 100;
