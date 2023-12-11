import { z } from "zod";
import queryString from "query-string";
import { useSearchParams } from "react-router-dom";

const mapUrlStateSchema = z.object({
  // derived from mapbox docs
  zoom: z.coerce.number().min(12).max(23).catch(12),
  // range from -180 to 180 dervied from mapbox
  bearing: z.coerce.number().min(-180).max(180).catch(0),
  // https://docs.mapbox.com/help/glossary/lat-lon/
  lat: z.coerce.number().max(90).min(-90).catch(41.03008998695652),
  lng: z.coerce.number().max(180).min(-180).catch(-73.78825148695653),
});

const useMapUrlState = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const mapUrlState = queryString.parse(searchParams.toString());
  const validatedMapUrlState = mapUrlStateSchema.parse(mapUrlState);

  return {
    setSearchParams,
    validatedMapUrlState,
  };
};

export { useMapUrlState };
