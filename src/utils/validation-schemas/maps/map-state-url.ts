import { z } from "zod";

// derived from mapbox docs
const zoom = z.coerce.number().min(12).max(23).catch(12);
// range from -180 to 180 dervied from mapbox
const bearing = z.coerce.number().min(-180).max(180).catch(0);
// https://docs.mapbox.com/help/glossary/lat-lon/
const lat = z.coerce.number().max(90).min(-90).catch(41.03008998695652);
const lng = z.coerce.number().max(180).min(-180).catch(-73.78825148695653);

export const mapUrlStateSchema = z.object({
  zoom,
  bearing,
  lat,
  lng,
});
