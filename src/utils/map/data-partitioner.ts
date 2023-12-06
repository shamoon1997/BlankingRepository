import dbScan, { Dbscan } from "@turf/clusters-dbscan";
import { Units } from "@turf/turf";
import { Feature, Point, FeatureCollection, GeoJsonProperties } from "geojson";
import { mapDataToGeoJsonPoints } from "@/utils/map/geojson-manipulators.ts";

export type MapLikeDataPoint = {
  latitude: number;
  longitude: number;
  id: number | string;
};

export type PartitionResult<T> = Feature<
  Point,
  T & {
    dbscan?: Dbscan | undefined;
    cluster?: number | undefined;
  }
>[];

const partitionAndClusterPoints = <T extends MapLikeDataPoint>(
  data: T[],
  partitionFunctions: ((data: T) => boolean)[],
  clusterMaxDistance = 0.1,
  clusterOptions?:
    | {
        units?: Units | undefined;
        minPoints?: number | undefined;
        mutate?: boolean | undefined;
      }
    | undefined,
): PartitionResult<T> => {
  const res: PartitionResult<T> = [];
  for (const callable of partitionFunctions) {
    const filtered = data.filter(callable);
    const mapped = mapDataToGeoJsonPoints<T>(filtered);

    const featureCollection: FeatureCollection<Point, GeoJsonProperties> = {
      type: "FeatureCollection",
      features: mapped,
    };

    const clusteredFeatureCollection = dbScan(
      featureCollection,
      clusterMaxDistance,
      clusterOptions,
    );

    // @ts-expect-error TODO: fix type issues in the future ignoring them for now
    res.push(...clusteredFeatureCollection.features);
  }

  return res;
};

export { partitionAndClusterPoints };
