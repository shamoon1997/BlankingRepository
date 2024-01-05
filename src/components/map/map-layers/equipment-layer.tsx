import { useMapUrlState } from "@/hooks";
import { Feature, Point } from "geojson";
import mapboxgl from "mapbox-gl";
import { Layer, Marker, Source } from "react-map-gl";
import { Device } from "@/api/types/types.ts";
import {
  generateLines,
  generatePoints,
} from "@/utils/map/geojson-manipulators.ts";
import { useEffect, useMemo, useRef, useState } from "react";
import { MapZoomedBoxContainer } from "@/components/map/map-zoomed-box";
import { EquipmentControlLayer } from "@/components/map/dropdown-layers/equipment-control-layer.tsx";
import { useMapboxBbox } from "@/state/map/bbox-store.tsx";
import { MapNetworkStatus } from "@/components/map/map-network-status/map-network-status.tsx";
import { useGetEquipmentLayer } from "@/api/hooks/maps/use-get-equipment-layer.ts";
import {
  HoverPinIcon,
  OfflineIcon,
  OnlineIcon,
  SpottyIcon,
} from "@/assets/pole-hover";
import { stripZeros } from "@/utils/strings/strip-zeros.ts";
import { SelectedPoleIcon, SettingsIcon } from "@/assets";
import { MapStatusContainer, MapToolTipContainer } from "@/components";
import { SettingIcon } from "@/assets/pole-view";
import { Button } from "@/components/common";
import { capitalize, intersection } from "lodash";
import { useSelectedPoles, useSelectedPolesActions } from "@/state";
import { useSelectedEquipments } from "@/state/map/selected-equipments-store.tsx";
import { SelectedPoleViews } from "@/components/map/selected-poleview-container/selected-pole-views.tsx";

const EquipmentLayerLineStyles: mapboxgl.LinePaint = {
  "line-color": ["get", "color"],
  "line-opacity": 1,
  "line-width": 8,
  "line-dasharray": [0.22, 0.24],
};

const MOUSE_HANDLER_DELAY = 200;

export const EquipmentLayer = () => {
  const { validatedMapUrlState } = useMapUrlState();
  const bbox = useMapboxBbox();
  const [hoveredPoint, setHoveredPoint] = useState<Device | null>(null);
  const { checkIfPoleIsSelected, toggleAddSelectedPole } =
    useSelectedPolesActions();
  const selectedEquipments = useSelectedEquipments();
  const selectedPoles = useSelectedPoles();

  const {
    dataWithFilterApplied: data,
    isError,
    isLoading,
    isRefetching,
    isSuccess,
  } = useGetEquipmentLayer(bbox);

  const points: Feature<Point, Device>[] = useMemo(() => {
    return generatePoints(data?.devices);
  }, [data?.devices]);

  const lines: Feature = useMemo(() => {
    return generateLines(data?.devices);
  }, [data?.devices]);

  const leaveTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const timeoutId = leaveTimeoutRef.current;
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  const handleMouseEnter = (device: Device | null) => {
    setHoveredPoint(device);
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
    }
  };

  const handleMouseLeave = () => {
    leaveTimeoutRef.current = setTimeout(() => {
      setHoveredPoint(null);
    }, MOUSE_HANDLER_DELAY) as unknown as number;
  };

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
              cursor: "pointer",
              zIndex:
                (hoveredPoint &&
                  hoveredPoint.hardware_id === i.properties.hardware_id) ??
                checkIfPoleIsSelected(i.properties.hardware_id)
                  ? 10
                  : 0,
            }}
          >
            <div
              onMouseEnter={() => handleMouseEnter(i.properties)}
              onMouseLeave={() => handleMouseLeave()}
              className="relative"
            >
              <div
                className="relative"
                onClick={() =>
                  toggleAddSelectedPole({
                    hardwareId: i.properties.hardware_id,
                    deviceSerialNumber: i.properties.device_sn,
                  })
                }
              >
                {checkIfPoleIsSelected(i.properties.hardware_id) && (
                  <div className="absolute top-[-9px] z-10 flex h-6 w-6 items-center justify-center">
                    <SelectedPoleIcon className="h-[26px] w-[26px] text-blue-400" />
                  </div>
                )}
                <div
                  className={`drop-shadow-map-dot ${color} z-0 h-6 w-6 rounded-full border-2 border-solid border-white`}
                />
              </div>

              {hoveredPoint &&
                hoveredPoint.hardware_id === i.properties.hardware_id && (
                  <MapToolTipContainer
                    className={"z-12 left-[30px] top-[-30px]"}
                  >
                    <div className="w-[250px] px-[11px] py-[11px]">
                      <div className="flex flex-grow items-center justify-between gap-2">
                        <div className="flex items-center gap-[7px]">
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
                        onClick={(e) => {
                          e.stopPropagation();
                          alert(
                            "This feature is in development and will be enabled soon!",
                          );
                        }}
                        type="button"
                        className="mt-3 min-h-[24px] w-full rounded-[5px] border-0 bg-[#ff176b] px-2.5 py-1 font-mont text-[12px] leading-normal tracking-[-0.4px] text-white shadow-sm transition-all hover:bg-[#db185f] focus:bg-[#db185f] active:bg-[#db185f]"
                        text="Pole View"
                      />
                    </div>
                  </MapToolTipContainer>
                )}
            </div>
            {(validatedMapUrlState.zoom > 16 ||
              checkIfPoleIsSelected(i.properties.hardware_id)) &&
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

      <SelectedPoleViews selectedPoles={selectedPoles} />

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
