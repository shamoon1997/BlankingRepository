import { z } from "zod";
import queryString from "query-string";
import { useSearchParams } from "react-router-dom";

const mapUrlStateSchema = z.object({
  // derived from mapbox docs
  zoom: z.coerce.number().min(0).max(23).catch(4),
  // range from -180 to 180 dervied from mapbox
  bearing: z.coerce.number().min(-180).max(180).catch(0),
  // https://docs.mapbox.com/help/glossary/lat-lon/
  lat: z.coerce.number().max(90).min(-90).catch(33),
  lng: z.coerce.number().max(180).min(-180).catch(70),
});

const useMapUrlState = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const mapUrlState = queryString.parse(searchParams.toString());
  const validatedMapUrlState = mapUrlStateSchema.safeParse(mapUrlState);

  if (!validatedMapUrlState.success) {
    // handle error then return
    return {
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
      setSearchParams,
      validatedMapUrlState: validatedMapUrlState.data,
    };
  }
};

export { useMapUrlState };
