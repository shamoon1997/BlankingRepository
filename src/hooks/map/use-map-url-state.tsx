import { z } from "zod";
import queryString from "query-string";
import { useSearchParams } from "react-router-dom";

enum mapUrlStateKeys {
  zoom = "zoom",
  bearing = "bearing",
  lat = "lat",
  lng = "lng",
}

const mapUrlStateSchema = z.object({
  // derived from mapbox docs
  [mapUrlStateKeys.zoom]: z.coerce.number().min(0).max(23).catch(13),
  // range from -180 to 180 dervied from mapbox
  [mapUrlStateKeys.bearing]: z.coerce.number().min(-180).max(180).catch(0),
  // https://docs.mapbox.com/help/glossary/lat-lon/
  [mapUrlStateKeys.lat]: z.coerce
    .number()
    .max(90)
    .min(-90)
    .catch(40.66681718965853),
  [mapUrlStateKeys.lng]: z.coerce
    .number()
    .max(180)
    .min(-180)
    .catch(-111.94993927932325),
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

export { useMapUrlState, mapUrlStateKeys };
