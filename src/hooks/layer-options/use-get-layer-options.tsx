import queryString from "query-string";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";

const LayerOptions = z
  .enum(["equipment", "heatmap", "gridscope", "alert", "network"])
  .default("gridscope")
  .catch("gridscope");
export type LayerOptionsType = z.infer<typeof LayerOptions>;

const gridscopeOptions = z
  .enum(["online", "offline", "spotty", "all"])
  .default("all")
  .catch("all");

const poleOptions = z
  .enum(["all", "vibration", "electrometer-drop", "pole-tilt", "collision"])
  .default("all")
  .catch("all");

export type gridscopeOptionsType = z.infer<typeof LayerOptions>;
export type poleOptionsType = z.infer<typeof poleOptions>;

const LayerOptionsSchema = z.object({
  layer: LayerOptions,
  gridScopeOptions: gridscopeOptions,
  poleOptions: poleOptions,
});
export type LayerOptionsSchemaType = z.infer<typeof LayerOptionsSchema>;

export const useLayerOptions = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const mapUrlState = queryString.parse(searchParams.toString());
  const validatedLayerUrlState = LayerOptionsSchema.safeParse(mapUrlState);

  if (!validatedLayerUrlState.success) {
    // handle error then return
    return {
      setSearchParams,
      validatedLayerUrlState: {
        layer: "gridscope",
        gridScopeOptions: "all",
        poleOptions: "all",
      } as LayerOptionsSchemaType,
      searchParams,
    };
  } else {
    return {
      setSearchParams,
      validatedLayerUrlState: validatedLayerUrlState.data,
      searchParams,
    };
  }
};
