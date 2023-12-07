import { Feature, Point } from "geojson";
import { MapLikeDataPoint } from "@/utils/map/data-partitioner.ts";

export const mapDataToGeoJsonPoints = <T extends MapLikeDataPoint>(
  filtered: T[],
): Feature<Point, T>[] => {
  return filtered.map((point) => ({
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [point.longitude, point.latitude],
    },
    properties: {
      ...point,
    },
  }));
};
