import dbScan, { Dbscan, DbscanProps } from "@turf/clusters-dbscan";
import { Units } from "@turf/turf";
import { Feature, Point, FeatureCollection } from "geojson";
import { mapDataToGeoJsonPoints } from "@/utils/map/geojson-manipulators.ts";

export type MapLikeDataPoint = {
  latitude: number;
  longitude: number;
  id: number | string;
};

export type PartitionResult<T> = Feature<
  Point,
  T & MapLikeDataPoint & DbscanProps & Record<string, unknown>
>[];

const partitionAndClusterPoints = <
  T extends MapLikeDataPoint & Record<string, never>,
>(
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

    const featureCollection: FeatureCollection<
      Point,
      T &
        MapLikeDataPoint & {
          dbscan?: Dbscan | undefined;
          cluster?: number | undefined;
        } & Record<string, never>
    > = {
      type: "FeatureCollection",
      features: mapped,
    };

    const clusteredFeatureCollection = dbScan(
      featureCollection,
      clusterMaxDistance,
      clusterOptions,
    ) as FeatureCollection<
      Point,
      T & MapLikeDataPoint & DbscanProps & Record<string, never>
    >;

    res.push(...clusteredFeatureCollection.features);
  }

  return res;
};

export { partitionAndClusterPoints };
