import dbScan, { Dbscan } from "@turf/clusters-dbscan";
import { Units } from "@turf/turf";
import { Feature, Point, FeatureCollection, GeoJsonProperties } from "geojson";

type MapLikeDataPoint = {
  latitude: number;
  longitude: number;
  id: number | string;
};

type PartitionResult = Feature<
  Point,
  Record<string, unknown> & {
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
): PartitionResult => {
  const res: PartitionResult = [];
  for (const callable of partitionFunctions) {
    const filtered = data.filter(callable);
    const mapped: Feature<Point, GeoJsonProperties>[] = filtered.map(
      (point) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [point.longitude, point.latitude],
        },
        properties: {
          ...point,
        },
      }),
    );

    const featureCollection: FeatureCollection<Point, GeoJsonProperties> = {
      type: "FeatureCollection",
      features: mapped,
    };

    const clusteredFeatureCollection = dbScan(
      featureCollection,
      clusterMaxDistance,
      clusterOptions,
    );

    res.push(...clusteredFeatureCollection.features);
  }

  return res;
};

export { partitionAndClusterPoints };
