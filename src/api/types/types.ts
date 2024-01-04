export interface CommonLayerPostBody {
  lat1: number;
  lon1: number;
  lat2: number;
  lon2: number;
  t1?: string;
  t2?: string;
}

export type EquipmentLayerPostBody = CommonLayerPostBody;
export type NetworkLayerPostBody = CommonLayerPostBody;
export type GridScopeLayerPostBody = CommonLayerPostBody;
export type HeatMapLayerPostBody = CommonLayerPostBody;

export interface BaseLayerResponse {
  summary: Summary;
  devices: Device[];
}

export interface HeatmapLayerResponse extends BaseLayerResponse {
  devices: HeatmapDevice[];
  heatmap_metrics_min_max: HeatmapMetricsMinMax;
}

export interface HeatmapDevice extends Device {
  heatmap_metrics: HeatmapMetrics;
}

export interface HeatmapMetrics {
  vibrometer?: number;
  temperature?: number;
  electrometer?: number;
  network?: number;
}

export interface HeatmapMetricsMinMax {
  min_vibrometer: number;
  max_vibrometer: number;
  min_temperature: number;
  max_temperature: number;
  min_electrometer: number;
  max_electrometer: number;
  min_network: number;
  max_network: number;
}

export interface Summary {
  total: number;
  offline: number;
  online: number;
  spotty: number;
  cellular: number;
  lora: number;
}

export interface Device {
  hardware_id: string;
  device_sn: string;
  pole_id: string;
  deployment: string;
  longitude: number;
  latitude: number;
  last_health_report: string;
  fw_version: string;
  pcb_rev: string;
  network_mode: number;
  online: number;
  neighbors: string[];
  equipment: string[];
}

export type EquipmentsListResponse = string[];

interface Neighbor {
  hardware_id: string;
}

export interface PoleView {
  online: number;
  hardware_id: string;
  last_health_report: string;
  device_sn: string;
  deployment: string;
  pole_id: string;
  longitude: number;
  latitude: number;
  altitude: number;
  accuracy: number;
  network_mode: number;
  orientation: string;
  vegetation_notes: string;
  installation_notes: string;
  iccid: string;
  imei: string;
  dev_eui: string;
  pcb_rev: string;
  pcb_sn: string;
  fw_version: string;
  fw_hash: string;
  heatmap_metrics: HeatmapMetrics;
  neighbors: Neighbor[];
  installation_photos: string[];
}
export type poleView = PoleView;

export type PoleViewResponse = PoleView[];

export interface DeploymentResponse {
  name: string;
  longitude: number;
  latitude: number;
}
