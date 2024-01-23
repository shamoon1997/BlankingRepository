import { useLayerControlUrlState } from "@/hooks";
import { Feature, Point } from "geojson";
import mapboxgl from "mapbox-gl";
import { Layer, Marker, Source } from "react-map-gl";
import { Device } from "@/api/types/types.ts";
import {
  generateLines,
  generatePoints,
} from "@/utils/map/geojson-manipulators.ts";
import { useMemo } from "react";
import { useGetGridScopeLayer } from "@/api/hooks/maps/use-get-gridscope-layer.ts";
import { useMapboxBbox } from "@/state/map/bbox-store.tsx";
import { useSelectedPoles, useSelectedPolesActions } from "@/state";
import { GridScopeIcon, SelectedPoleIcon } from "@/assets";
import MiniLegendRange from "@/components/legend/mini-legend-range/mini-legend-range.tsx";
import MiniMapStatusContainer from "@/components/legend/mini-legend-container/mini-map-status-container.tsx";
import { MiniMapNetworkStatus } from "@/components/map/mini-map-network-status/mini-map-network-status.tsx";
import MiniCurrentLayerContainer from "@/components/legend/mini-legend-container/mini-current-layer-container.tsx";

const GridScopeLayerLineStyles: mapboxgl.LinePaint = {
  "line-color": "#B86E00",
  "line-opacity": 1,
  "line-width": 2,
};

export const MiniGridScopeLayer = () => {
  const { validatedLayerUrlState } = useLayerControlUrlState();
  const bbox = useMapboxBbox();
  const { toggleAddSelectedPole, checkIfPoleIsSelected } =
    useSelectedPolesActions();
  // don't remove this is to make sure the component re-renders when selected poles change
  useSelectedPoles();

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
                    className={`absolute top-[-10px] z-10 flex h-[18px] w-[18px] items-center justify-center [&_path]:fill-[${selectedPole?.assignedColor}]`}
                  >
                    <SelectedPoleIcon className="h-[26px] w-[26px]" />
                  </div>
                )}
                <div
                  className={`drop-shadow-map-dot ${color} z-0 h-[18px] w-[18px] rounded-full border-2 border-solid border-white`}
                />
              </div>
            </div>
          </Marker>
        );
      })}

      <div
        className={
          "absolute left-0 right-1 top-1 flex justify-end gap-1 bg-red-500"
        }
      >
        <div id={"1"} className={"hidden w-[80px]  [&:has(div)]:block"}></div>
        <div id={"2"} className={"hidden w-[80px]  [&:has(div)]:block"}></div>
      </div>

      <Source id="line-source" type="geojson" data={lines}>
        <Layer id="line-layer" type="line" paint={GridScopeLayerLineStyles} />
      </Source>

      <MiniCurrentLayerContainer>
        <div
          className={
            "flex items-center gap-1 p-1 px-1.5 font-mont text-[9px] font-medium"
          }
        >
          <GridScopeIcon className="h-3 w-3 shrink-0" />
          <span>Gridscope</span>
        </div>
      </MiniCurrentLayerContainer>

      <MiniMapStatusContainer>
        {(isLoading || isRefetching) && (
          <MiniMapNetworkStatus>Loading...</MiniMapNetworkStatus>
        )}
        {!isLoading &&
          !isRefetching &&
          isSuccess &&
          data?.devices.length === 0 && (
            <MiniMapNetworkStatus>
              No poles found in this area
            </MiniMapNetworkStatus>
          )}
        {isError && (
          <MiniMapNetworkStatus>An Error Occurred.</MiniMapNetworkStatus>
        )}
        <MiniLegendRange
          width={120}
          colors={["bg-online", "bg-offline", "bg-spotty"]}
        />
      </MiniMapStatusContainer>
    </>
  );
};
