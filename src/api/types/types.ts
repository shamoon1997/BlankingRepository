export interface CommonLayerPostBody {
  lat1: number;
  lon1: number;
  lat2: number;
  lon2: number;
}

export type EquipmentLayerPostBody = CommonLayerPostBody;

export interface BaseLayerResponse {
  summary: Summary;
  devices: Device[];
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
  longitude: number;
  latitude: number;
  last_health_report: string;
  network_mode: number;
  online: number;
  neighbors: string[];
  equipment: string[];
}
