import { z } from "zod";

const layerPickerOptionsSchema = z
  .enum(["equipment", "heatmap", "gridscope", "alert", "network"])
  .default("gridscope")
  .catch("gridscope");

const gridscopeOptionsSchema = z
  .enum(["online", "offline", "spotty", "all"])
  .default("all")
  .catch("all");

// TODO: add when alerts is more defined
// const poleOptions = z
//   .enum(["all", "vibration", "electrometer-drop", "pole-tilt", "collision"])
//   .default("all")
//   .catch("all");

const networkTypeOptionsSchema = z
  .enum(["lora", "cellular", "unknown", "all"])
  .default("all")
  .catch("all");

const heatMapOptionsSchema = z
  .enum(["vibration", "electrometer"])
  .default("vibration")
  .catch("vibration");

const equipmentOptionsSchema = z.string().min(1).max(100).catch("");

// use kabab case for key names since these keys will be inside the url
export const LayerControlsSchema = z.object({
  layer: layerPickerOptionsSchema,
  // when layer is gridscope i.e. online offline spotty
  gridscope: gridscopeOptionsSchema,
  // when layer is network i.e. cellular, lora, unknown
  network: networkTypeOptionsSchema,
  // when layer is heatmap
  heatmap: heatMapOptionsSchema,
  //when layer is equipment
  equipments: equipmentOptionsSchema,
});

export type LayerControlsSchemaType = z.infer<typeof LayerControlsSchema>;
export type LayerPickerOptionsType = z.infer<typeof layerPickerOptionsSchema>;
export type GridscopeOptionsType = z.infer<typeof gridscopeOptionsSchema>;
export type NetworkOptionsType = z.infer<typeof networkTypeOptionsSchema>;
export type HeatmapOptionsType = z.infer<typeof heatMapOptionsSchema>;
