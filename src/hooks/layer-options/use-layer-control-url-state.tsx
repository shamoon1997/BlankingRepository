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
        gridscope: "all",
        equipments: "",
        network: "all",
        heatmap: "vibration",
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
