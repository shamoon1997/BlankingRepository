import queryString from "query-string";
import { useSearchParams } from "react-router-dom";
import { mapUrlStateSchema } from "@/utils/validation-schemas";

const useMapUrlState = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const mapUrlState = queryString.parse(searchParams.toString());
  const validatedMapUrlState = mapUrlStateSchema.safeParse(mapUrlState);

  if (!validatedMapUrlState.success) {
    // handle error then return
    return {
      searchParams,
      setSearchParams,
      validatedMapUrlState: {
        lat: 33,
        lng: 70,
        bearing: 0,
        zoom: 4,
      },
    };
  } else {
    return {
      searchParams,
      setSearchParams,
      validatedMapUrlState: validatedMapUrlState.data,
    };
  }
};

export { useMapUrlState };
