import { useLayerControlUrlState, useMapUrlState } from "@/hooks";
import { Feature, Point, Position } from "geojson";
import mapboxgl from "mapbox-gl";
import { Layer, Marker, Source } from "react-map-gl";
import { GridscopeControlLayer } from "../dropdown-layers/gridscope-control-layer.tsx";
import { Device } from "@/api/types/types.ts";
import { mapDataToGeoJsonPoints } from "@/utils/map/geojson-manipulators.ts";
import { useMemo } from "react";
import { MapZoomedBoxContainer } from "@/components/map/map-zoomed-box";
import {
  HoverPinIcon,
  OfflineIcon,
  OnlineIcon,
  SpottyIcon,
} from "@/assets/pole-hover";
import { stripZeros } from "@/utils/strings/strip-zeros.ts";
import { LegendRange, MapStatusContainer } from "@/components";
import { MapNetworkStatus } from "@/components/map/map-network-status/map-network-status.tsx";
import { useGetGridScopeLayer } from "@/api/hooks/maps/use-get-gridscope-layer.ts";
import { useMapboxBbox } from "@/state/map/bbox-store.tsx";
import { useSelectedPoles, useSelectedPolesActions } from "@/state";
import { MapPopup } from "@/components/map/map-pop-up/map-pop-up.tsx";
import { SelectedPoleIcon } from "@/assets";

const GridScopeLayerLineStyles: mapboxgl.LinePaint = {
  "line-color": ["get", "color"],
  "line-opacity": 1,
  "line-width": 8,
  "line-dasharray": [0.22, 0.24],
};

export const GridScopeLayer = () => {
  const { validatedMapUrlState } = useMapUrlState();
  const { validatedLayerUrlState } = useLayerControlUrlState();
  const bbox = useMapboxBbox();
  const selectedPoleIds = useSelectedPoles();
  const { toggleAddSelectedPole, checkIfPoleIsSelected } =
    useSelectedPolesActions();

  const {
    dataWithFilterApplied: data,
    isError,
    isLoading,
    isRefetching,
    isSuccess,
  } = useGetGridScopeLayer(bbox);

  const filteredData = data?.devices.filter((i) => {
    const gridscopeFilter = validatedLayerUrlState.gridscope;
    if (gridscopeFilter === "offline") {
      return i.online === 0;
    } else if (gridscopeFilter === "online") {
      return i.online === 1;
    } else if (gridscopeFilter === "spotty") {
      return i.online === 2;
    } else if (gridscopeFilter === "all") {
      return true;
    }
  });

  const points: Feature<Point, Device>[] = useMemo(() => {
    if (filteredData && filteredData.length > 0) {
      const modify = filteredData.map((item) => {
        return {
          ...item,
          id: item.hardware_id,
        };
      });
      return mapDataToGeoJsonPoints(modify);
    }

    return [];
  }, [filteredData]);

  const lines: Feature = useMemo(() => {
    const visitedPairs = new Set();
    const coordinates: Position[][] = [];

    if (filteredData && filteredData.length > 0) {
      filteredData.forEach((device) => {
        return device.neighbors.forEach((neighborId) => {
          const neighborDevice = filteredData.find(
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
  }, [filteredData]);

  return (
    <>
      <div className="absolute z-[200] flex">
        {selectedPoleIds
          .slice()
          .sort((a, b) =>
            a.isMinimized === b.isMinimized ? 0 : a.isMinimized ? 1 : -1,
          )
          .map((selectedPole) => (
            <MapPopup
              selectedPoleHardwareId={selectedPole.selectedPoleHardwareId}
              isMinimized={selectedPole.isMinimized}
              key={selectedPole.selectedPoleHardwareId}
            />
          ))}
      </div>
      {points.map((i) => {
        const [lng, lat] = i.geometry.coordinates;
        let color = "bg-unknown";

        if (i.properties.online === 0) {
          color = "bg-offline";
        } else if (i.properties.online === 1) {
          color = "bg-online";
        } else if (i.properties.online === 2) {
          color = "bg-spotty";
        }

        const id = i.properties.hardware_id;

        const iconWidth = "w-[13px]";
        let networkStatusText = "Offline";
        let NetworkStatusIcon = <OfflineIcon className={iconWidth} />;
        if (i.properties.online === 0) {
          networkStatusText = "Offline";
          NetworkStatusIcon = <OfflineIcon className={iconWidth} />;
        } else if (i.properties.online === 1) {
          networkStatusText = "Online";
          NetworkStatusIcon = <OnlineIcon className={iconWidth} />;
        } else if (i.properties.online === 2) {
          networkStatusText = "Spotty";
          NetworkStatusIcon = <SpottyIcon className={iconWidth} />;
        }

        return (
          <Marker
            key={id}
            latitude={lat}
            longitude={lng}
            onClick={() =>
              toggleAddSelectedPole({
                hardwareId: i.properties.hardware_id,
                deviceSerialNumber: i.properties.device_sn,
              })
            }
            style={{
              zIndex: checkIfPoleIsSelected(i.properties.hardware_id) ? 200 : 0,
            }}
          >
            <div>
              <div className="relative">
                {checkIfPoleIsSelected(i.properties.hardware_id) && (
                  <div className="absolute top-[-9px] z-10 flex h-6 w-6 items-center justify-center">
                    <SelectedPoleIcon className="h-[26px] w-[26px] text-blue-400" />
                  </div>
                )}
                <div
                  className={`drop-shadow-map-dot ${color} z-0 h-6 w-6 rounded-full border-2 border-solid border-white`}
                />
              </div>

              {(validatedMapUrlState.zoom > 16 ||
                checkIfPoleIsSelected(i.properties.hardware_id)) && (
                <MapZoomedBoxContainer>
                  <div className="z-100 flex flex-col gap-[3px] whitespace-nowrap px-[2px] text-[11px] text-white">
                    <div className="flex items-center gap-[7px] font-medium">
                      <HoverPinIcon className="w-[11px]" />
                      <p>
                        {i.properties.pole_id} •{" "}
                        {stripZeros(i.properties.device_sn ?? "")}
                      </p>
                    </div>
                    <div className="flex items-center gap-[5px]">
                      {NetworkStatusIcon}
                      <p>{networkStatusText}</p>
                    </div>
                  </div>
                </MapZoomedBoxContainer>
              )}
            </div>
          </Marker>
        );
      })}

      <GridscopeControlLayer />

      <Source id="line-source" type="geojson" data={lines}>
        <Layer id="line-layer" type="line" paint={GridScopeLayerLineStyles} />
      </Source>

      <MapStatusContainer>
        {(isLoading || isRefetching) && (
          <MapNetworkStatus>Loading...</MapNetworkStatus>
        )}
        {!isLoading &&
          !isRefetching &&
          isSuccess &&
          data?.devices.length === 0 && (
            <MapNetworkStatus>No poles found in this area</MapNetworkStatus>
          )}
        {isError && (
          <MapNetworkStatus>
            An Error Occurred. Please share logs with the developer team.
          </MapNetworkStatus>
        )}
        <LegendRange
          width={270}
          colors={["bg-online", "bg-offline", "bg-spotty"]}
          labels={["Online", "Offline", "Spotty"]}
        />
      </MapStatusContainer>
    </>
  );
};
