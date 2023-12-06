import { Feature, Point } from "geojson";
import { MapLikeDataPoint } from "@/utils/map/data-partitioner.ts";

export const mapDataToGeoJsonPoints = <T extends MapLikeDataPoint>(
  filtered: T[],
) => {
  const mapped: Feature<Point, T>[] = filtered.map((point) => ({
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [point.longitude, point.latitude],
    },
    properties: {
      ...point,
    },
  }));
  return mapped;
};
