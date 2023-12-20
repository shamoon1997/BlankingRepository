import { useMapUrlState } from "@/hooks";
import { Feature, Point, Position } from "geojson";
import mapboxgl from "mapbox-gl";
import { Layer, Marker, Source } from "react-map-gl";
import { Device } from "@/api/types/types.ts";
import { mapDataToGeoJsonPoints } from "@/utils/map/geojson-manipulators.ts";
import { useMemo, useState } from "react";
import { MapZoomedBoxContainer } from "@/components/map/map-zoomed-box";
import { EquipmentControlLayer } from "@/components/map/dropdown-layers/equipment-control-layer.tsx";
import { useMapboxBbox } from "@/state/map/bbox-store.tsx";
import { MapNetworkStatus } from "@/components/map/map-network-status/map-network-status.tsx";
import { useGetEquipmentLayer } from "@/api/hooks/maps/use-get-equipment-layer.ts";
import {
  HoverPinIcon,
  MapsIcon,
  OfflineIcon,
  OnlineIcon,
  SpottyIcon,
} from "@/assets/pole-hover";
import { stripZeros } from "@/utils/strings/strip-zeros.ts";
import { SettingsIcon } from "@/assets";
import { MapStatusContainer, MapToolTipContainer } from "@/components";
import { SettingIcon } from "@/assets/pole-view";
import { Button } from "@/components/common";
import { capitalize, intersection } from "lodash";
import { useSelectedEquipments } from "@/state/map/selected-equipments-store.tsx";

const EquipmentLayerLineStyles: mapboxgl.LinePaint = {
  "line-color": ["get", "color"],
  "line-opacity": 1,
  "line-width": 8,
  "line-dasharray": [0.22, 0.24],
};

export const EquipmentLayer = () => {
  const { validatedMapUrlState } = useMapUrlState();
  const bbox = useMapboxBbox();
  const [hoveredPoint, setHoveredPoint] = useState<Device | null>(null);

  const selectedEquipments = useSelectedEquipments();

  const {
    dataWithLagBuffer: data,
    isError,
    isLoading,
    isRefetching,
    isSuccess,
  } = useGetEquipmentLayer(bbox);

  const points: Feature<Point, Device>[] = useMemo(() => {
    if (data?.devices && data.devices.length > 0) {
      const modify = data.devices.map((item) => {
        return {
          ...item,
          id: item.hardware_id,
        };
      });
      return mapDataToGeoJsonPoints(modify);
    }

    return [];
  }, [data?.devices]);

  const lines: Feature = useMemo(() => {
    const visitedPairs = new Set();
    const coordinates: Position[][] = [];

    if (data?.devices && data.devices.length > 0) {
      data.devices.forEach((device) => {
        return device.neighbors.forEach((neighborId) => {
          const neighborDevice = data.devices.find(
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
  }, [data?.devices]);

  return (
    <>
      {points.map((i) => {
        const [lng, lat] = i.geometry.coordinates;
        const isAllSelected = selectedEquipments.find(
          (equipmentOption) => equipmentOption.id === "all",
        );

        const areIntersecting = intersection(
          i.properties.equipment,
          // if all option is selected we intersect with the same array so all options are included then
          isAllSelected
            ? i.properties.equipment
            : selectedEquipments.map((i) => i.id),
        );

        let color = "bg-radio-button";
        if (selectedEquipments.length === 0) {
          color = "bg-radio-button";
        } else if (areIntersecting.length > 0) {
          color = "bg-btn-primary";
        } else if (areIntersecting.length === 0) {
          color = "bg-radio-button";
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
            style={{
              zIndex:
                hoveredPoint &&
                hoveredPoint.hardware_id === i.properties.hardware_id
                  ? 1000
                  : 0,
            }}
          >
            <div
              onMouseEnter={() => setHoveredPoint(i.properties)}
              onMouseLeave={() => setHoveredPoint(null)}
            >
              <div
                className={`drop-shadow-map-dot ${color} h-6 w-6 rounded-full border-2 border-solid border-white `}
              />

              {hoveredPoint &&
                hoveredPoint.hardware_id === i.properties.hardware_id && (
                  <MapToolTipContainer
                    className={"left-[30px] top-[-30px] z-50"}
                  >
                    <div className="w-[250px] px-[11px] py-[11px]">
                      <div className="flex flex-grow items-center justify-between gap-2">
                        <div className="flex items-center gap-[7px]">
                          <MapsIcon className="h-[17px]" />
                          <div className="font-mont  text-[11px] font-normal leading-normal text-black">
                            {i.properties.pole_id} •{" "}
                            {stripZeros(i.properties.device_sn ?? "")}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <OnlineIcon className={"h-4 w-4"} />

                          <div className="font-mont text-[11px] font-normal capitalize leading-normal text-black">
                            Online
                          </div>
                        </div>
                      </div>

                      <div className="mt-2 flex flex-grow items-start gap-[5px]">
                        <SettingIcon className="mt-[2px] h-3 w-3 shrink-0" />

                        <div className="flex  flex-wrap gap-[4px] text-[11px] font-semibold">
                          {i.properties.equipment.map((equipment, index) => (
                            <div
                              key={equipment + index}
                              className="font-mont  font-normal leading-normal text-[#161616]"
                            >
                              {capitalize(equipment.slice(1))}
                            </div>
                          ))}
                        </div>
                      </div>

                      <Button
                        type="button"
                        className="mt-3 min-h-[24px] w-full rounded-[5px] border-0 bg-[#ff176b] px-2.5 py-1 font-mont text-[12px] leading-normal tracking-[-0.4px] text-white shadow-sm transition-all hover:bg-[#db185f] focus:bg-[#db185f] active:bg-[#db185f]"
                        text="Pole View"
                      />
                    </div>
                  </MapToolTipContainer>
                )}
            </div>

            {validatedMapUrlState.zoom > 16 &&
              !(
                hoveredPoint &&
                hoveredPoint.hardware_id === i.properties.hardware_id
              ) && (
                <MapZoomedBoxContainer>
                  <div className="flex flex-col gap-[3px] whitespace-nowrap px-[2px] text-[11px] text-white">
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
                    <div className="flex items-center gap-[5px]">
                      <SettingsIcon className="h-3 w-3" />
                      <p>{i.properties.equipment.length}</p>
                    </div>
                  </div>
                </MapZoomedBoxContainer>
              )}
          </Marker>
        );
      })}

      <EquipmentControlLayer />

      <Source id="line-source" type="geojson" data={lines}>
        <Layer id="line-layer" type="line" paint={EquipmentLayerLineStyles} />
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
      </MapStatusContainer>
    </>
  );
};
