import { useLayerControlUrlState, useMapUrlState } from "@/hooks";
import { Feature, Point } from "geojson";
import mapboxgl from "mapbox-gl";
import { Layer, Marker, Source } from "react-map-gl";
import { GridscopeControlLayer } from "../dropdown-layers/gridscope-control-layer.tsx";
import { Device } from "@/api/types/types.ts";
import {
  generateLines,
  generatePoints,
} from "@/utils/map/geojson-manipulators.ts";
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
import { SelectedPoleIcon } from "@/assets";
import { SelectedPoleViews } from "@/components/map/selected-poleview-container/selected-pole-views.tsx";

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
  const { toggleAddSelectedPole, checkIfPoleIsSelected } =
    useSelectedPolesActions();
  const selectedPoles = useSelectedPoles();

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
    return generatePoints(filteredData);
  }, [filteredData]);

  const lines: Feature = useMemo(() => {
    return generateLines(filteredData);
  }, [filteredData]);

  return (
    <>
      {points.map((i) => {
        const [lng, lat] = i.geometry.coordinates;
        let color = "bg-unknown";

        const selectedPole = checkIfPoleIsSelected(i.properties.hardware_id);

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
            style={{ cursor: "pointer", zIndex: selectedPole ? 10 : 0 }}
          >
            <div>
              <div className="relative">
                {Boolean(selectedPole) && (
                  <div
                    className={`absolute top-[-9px] z-10 flex h-6 w-6 items-center justify-center [&_path]:fill-[${selectedPole?.assignedColor}]`}
                  >
                    <SelectedPoleIcon className="h-[26px] w-[26px]" />
                  </div>
                )}
                <div
                  className={`drop-shadow-map-dot ${color} z-0 h-6 w-6 rounded-full border-2 border-solid border-white`}
                />
              </div>

              {(validatedMapUrlState.zoom > 16 || Boolean(selectedPole)) && (
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

      <SelectedPoleViews selectedPoles={selectedPoles} />

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
