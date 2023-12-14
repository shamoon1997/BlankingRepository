import queryString from "query-string";
import { useSearchParams } from "react-router-dom";
import { mapUrlStateSchema } from "@/utils/validation-schemas";

enum mapUrlStateKeys {
  zoom = "zoom",
  bearing = "bearing",
  lat = "lat",
  lng = "lng",
}

const useMapUrlState = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const mapUrlState = queryString.parse(searchParams.toString());
  const validatedMapUrlState = mapUrlStateSchema.parse(mapUrlState);

  return {
    searchParams,
    setSearchParams,
    validatedMapUrlState,
  };
};

export { useMapUrlState, mapUrlStateKeys };
