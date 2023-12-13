import queryString from "query-string";
import { useSearchParams } from "react-router-dom";
import { mapUrlStateSchema } from "@/utils/validation-schemas";

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

export { useMapUrlState };
