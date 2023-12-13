import queryString from "query-string";
import { useSearchParams } from "react-router-dom";
import {
  LayerControlsSchema,
  LayerControlsSchemaType,
} from "@/utils/validation-schemas";

export const useLayerControlUrlState = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const mapUrlState = queryString.parse(searchParams.toString());
  const validatedLayerUrlState = LayerControlsSchema.safeParse(mapUrlState);

  if (!validatedLayerUrlState.success) {
    console.log(validatedLayerUrlState.error);
    // handle error then return
    return {
      setSearchParams,
      validatedLayerUrlState: {
        layer: "gridscope",
        "grid-scope-options": "all",
        "pole-options": "all",
        equipments: "",
        "network-type": "all",
        heatmap: "vibration",
        gridscope: "all",
      } as LayerControlsSchemaType,
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
