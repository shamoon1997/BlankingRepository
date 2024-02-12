import { Feature, GeoJsonProperties, Geometry, Point, Position } from "geojson";
import { MapLikeDataPoint } from "@/utils/map/data-partitioner.ts";
import { Device } from "@/api/types/types.ts";

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

export const generateLines = (
  devices?: Device[],
  color = "#8A8A8A",
): Feature<Geometry, GeoJsonProperties> => {
  if (!devices) {
    return {
      type: "Feature",
      geometry: {
        type: "MultiLineString",
        coordinates: [],
      },
      properties: {
        color,
      },
    };
  }

  const visitedPairs = new Set();
  const coordinates: Position[][] = [];

  if (devices && devices.length > 0) {
    devices.forEach((device) => {
      return device.neighbors.forEach((neighborId) => {
        const neighborDevice = devices.find(
          (d) => d.hardware_id === neighborId,
        );

        // sort is needed to ensure key consistency don't remove
        const pairKey = [device.hardware_id, neighborId].sort().join("-");

        if (!visitedPairs.has(pairKey) && neighborDevice) {
          visitedPairs.add(pairKey);

          coordinates.push([
            [device.longitude, device.latitude],
            [neighborDevice.longitude, neighborDevice.latitude],
          ]);
        }
      });
    });
  }

  return {
    type: "Feature",
    geometry: {
      type: "MultiLineString",
      coordinates,
    },
    properties: {
      color: "#8A8A8A",
    },
  };
};

export const generatePoints = <T extends Device>(devices?: T[]) => {
  if (!devices || devices.length === 0) return [];

  const modify = devices.map((item) => {
    return {
      ...item,
      id: item.hardware_id,
    };
  });
  return mapDataToGeoJsonPoints(modify);
};
