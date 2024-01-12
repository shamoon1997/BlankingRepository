import * as Tabs from "@radix-ui/react-tabs";
import { useGetPoleView } from "@/api/hooks/poles/use-get-pole-view";
import { MapsIcon, LocationIcon, SettingIcon } from "@/assets/pole-view";
import { MinimizeIcon, CloseIcon } from "@/assets/misc";
import {
  useSelectedPolesActions,
  useSelectedPoles,
  useCalendarTimeZone,
} from "@/state";
import { MapMinimizedView } from "@/components/map/map-minimize-view/map-minimized-view.tsx";
import { stripZeros } from "@/utils/strings/strip-zeros.ts";
import { MapPopUpLoadingView } from "@/components/map/map-pop-up/map-pop-up-loading-view.tsx";
import { MapMinimizedViewLoadingView } from "@/components/map/map-minimize-view/map-minimized-loading-view.tsx";
import { MapPopUpErrorView } from "@/components/map/map-pop-up/map-pop-up-error-view.tsx";
import { MapMinimizedViewErrorView } from "@/components/map/map-minimize-view/map-minimized-error-view.tsx";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { formatInTimeZone } from "date-fns-tz";
import enUS from "date-fns/locale/en-US";

type MapPopProps = {
  selectedPoleHardwareId: string;
  isMinimized: boolean;
  assignedColor: string;
};

const getNetworkMode = (networkMode: number | undefined) => {
  switch (networkMode) {
    case 1:
      return "Cellular";
    case 2:
      return "Lora";
    case 3:
      return "Unknown";
    default:
      return "Unknown";
  }
};

const openGoogleMaps = (
  latitude: number | undefined,
  longitude: number | undefined,
) => {
  const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
  window.open(url, "_blank");
};

export const MapPopup = ({
  selectedPoleHardwareId,
  isMinimized,
  assignedColor,
}: MapPopProps) => {
  const { data, isLoading, isError, isSuccess } = useGetPoleView([
    selectedPoleHardwareId,
  ]);
  const { setSelectedPoleIds } = useSelectedPolesActions();
  const selectedPoles = useSelectedPoles();

  const deviceData = data?.[0];

  const timeZone = useCalendarTimeZone();
  const tabs = ["Overview", "Per-Blob", "High-res", "Photos"];

  const handleClose = () => {
    const filteredSelectedPoles = selectedPoles.filter(
      (selectedPoleIdO) =>
        selectedPoleIdO.selectedPoleHardwareId !== selectedPoleHardwareId,
    );
    setSelectedPoleIds([...filteredSelectedPoles]);
  };

  const handleMinimize = () => {
    const updatedSelectedPoles = selectedPoles.map((selectedPole) => {
      if (selectedPole.selectedPoleHardwareId == selectedPoleHardwareId) {
        return {
          ...selectedPole,
          isMinimized: true,
        };
      } else {
        return selectedPole;
      }
    });
    setSelectedPoleIds(updatedSelectedPoles);
  };

  const handleMaximize = () => {
    const updatedSelectedPoles = selectedPoles.map((selectedPole) => {
      if (selectedPole.selectedPoleHardwareId == selectedPoleHardwareId) {
        return {
          ...selectedPole,
          isMinimized: false,
        };
      } else {
        return selectedPole;
      }
    });
    setSelectedPoleIds(updatedSelectedPoles);
  };

  if (isLoading && isMinimized) {
    return (
      <div
        onClick={() => handleMaximize()}
        className="mb-4 flex flex-col justify-end gap-0 first:ml-10 hover:cursor-pointer"
      >
        <MapMinimizedViewLoadingView />
      </div>
    );
  }

  if (isError && isMinimized) {
    return (
      <div
        onClick={() => handleMaximize()}
        className="mb-4 flex flex-col justify-end gap-0 first:ml-10 hover:cursor-pointer"
      >
        <MapMinimizedViewErrorView />
      </div>
    );
  }

  if (isSuccess && isMinimized) {
    return (
      <div
        className="mb-4 flex flex-col justify-end gap-0 first:ml-10 hover:cursor-pointer"
        onClick={() => handleMaximize()}
      >
        <MapMinimizedView
          assignedColor={assignedColor}
          selectedPoleId={stripZeros(deviceData?.device_sn ?? "")}
        />
      </div>
    );
  }

  if (isLoading && !isMinimized) {
    return (
      <MapPopUpLoadingView
        tabs={tabs}
        handleClose={handleClose}
        handleMinimize={handleMinimize}
      />
    );
  }

  if (isError && !isMinimized) {
    return (
      <MapPopUpErrorView
        handleClose={handleClose}
        handleMinimize={handleMinimize}
      />
    );
  }

  if (isSuccess && !isMinimized) {
    return (
      <>
        <div className="flex h-full w-[275px] flex-col gap-0 rounded-sm bg-white shadow-pole-view">
          <div className="relative flex h-[214px] shrink-0 rounded-sm">
            <div className="absolute right-1 top-1 z-[2] flex items-center justify-center gap-2 hover:cursor-pointer">
              <MinimizeIcon
                className="h-[15px] w-[15px] shrink-0"
                onClick={() => handleMinimize()}
              />
              <CloseIcon
                className="h-[16px] w-[16px]  shrink-0"
                onClick={() => handleClose()}
              />
            </div>
            <TransformWrapper
              doubleClick={{ step: 0.7 }}
              pinch={{ step: 0.5 }}
              limitToBounds
              wheel={{ smoothStep: 0.01, step: 0.2 }}
            >
              <TransformComponent wrapperClass="h-full w-full shrink-0 rounded-sm object-cover">
                <img
                  /*  find the first non null url*/
                  className={"h-full w-full shrink-0 rounded-sm object-cover"}
                  src={deviceData?.installation_photos?.find((i) => Boolean(i))}
                  alt="Image of pole installation"
                />
              </TransformComponent>
            </TransformWrapper>
          </div>
          <div className="h-full overflow-y-auto">
            <div className="flex flex-col items-start gap-2.5 px-5 pb-2.5 pt-3.5">
              <div className="flex w-full justify-between">
                <div className="flex items-center gap-2">
                  <div className="font-mont text-base font-semibold leading-normal text-[#5B5B5B]">
                    Pole
                  </div>
                  <div className="font-mont text-base font-normal leading-normal text-[#5B5B5B]">
                    {deviceData?.pole_id ?? "N/A"}
                  </div>
                  <span>•</span>
                  <div className="font-mont text-base font-normal leading-normal text-[#5B5B5B]">
                    {stripZeros(deviceData?.device_sn ?? "N/A")}
                  </div>
                </div>

                <div
                  className={`mt-[-5px] flex items-center justify-center [&_path]:fill-[${assignedColor}]`}
                >
                  <MapsIcon />
                </div>
              </div>

              <div className="inline-flex items-center gap-[7px]">
                <div
                  className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                    deviceData?.online === 0 ? "bg-offline" : "bg-online"
                  }`}
                />
                <div className="font-mont text-[12px] font-normal leading-normal tracking-[-0.5px] text-[#161616]">
                  {deviceData?.online === 0 ? "Offline" : "Online"}
                </div>
              </div>
            </div>
            <div className="mx-auto mb-8 w-full">
              <Tabs.Root defaultValue="Overview">
                <Tabs.List className="flex gap-3.5 overflow-x-auto border-b border-solid border-[#d9d9d9] px-6">
                  {tabs.map((tab) => {
                    return (
                      <Tabs.Trigger
                        key={tab}
                        value={tab}
                        className="overflow-hidden whitespace-nowrap border-b border-solid border-transparent py-[7px] font-mont text-[11px] font-normal leading-[100%] text-[#5B5B5B] data-[state=active]:border-[#628fee] data-[state=active]:text-[#628fee]"
                      >
                        {tab}
                      </Tabs.Trigger>
                    );
                  })}
                </Tabs.List>

                <Tabs.Content value="Overview">
                  <div className="border-b border-solid border-[#d9d9d9] p-5 text-[12px] ">
                    <div className="grid grid-cols-2 gap-y-[10px]">
                      <div className="font-mont font-semibold leading-normal text-[#5B5B5B]">
                        Pole
                      </div>
                      <div className="text-left font-mont font-normal leading-normal text-[#474747]">
                        {deviceData?.pole_id ?? "N/A"}
                      </div>

                      <div className=" font-mont font-semibold leading-normal text-[#5B5B5B]">
                        Serial{" "}
                      </div>
                      <div className="text-left font-mont font-normal leading-normal text-[#474747]">
                        {deviceData?.device_sn ?? "N/A"}
                      </div>

                      <div className=" font-mont font-semibold leading-normal text-[#5B5B5B]">
                        Deployment
                      </div>
                      <div className="text-left font-mont font-normal leading-normal text-[#474747]">
                        {deviceData?.deployment ?? "N/A"}
                      </div>

                      <div className=" font-mont font-semibold leading-normal text-[#5B5B5B]">
                        Network
                      </div>
                      <div className="text-left font-mont font-normal leading-normal text-[#474747]">
                        {getNetworkMode(deviceData?.network_mode)}
                      </div>

                      <div className=" font-mont font-semibold leading-normal text-[#5B5B5B]">
                        Last seen
                      </div>
                      <div className="text-left font-mont font-normal leading-normal text-[#474747]">
                        {deviceData?.last_health_report
                          ? formatInTimeZone(
                              new Date(deviceData.last_health_report),
                              timeZone,
                              "M/dd/yyyy h:mm:ss a zzz",
                              {
                                locale: enUS,
                              },
                            )
                          : "N/A"}
                      </div>
                    </div>
                  </div>
                  <div className="border-b border-solid border-[#d9d9d9] p-5">
                    <div className="flex flex-col gap-2.5">
                      <div className="flex items-center gap-[5px]">
                        <div className="flex h-3 w-3 items-center justify-center">
                          <LocationIcon />
                        </div>
                        <div
                          className="font-mont font-normal capitalize leading-normal text-[#5B5B5B] underline hover:cursor-pointer"
                          onClick={() =>
                            openGoogleMaps(
                              deviceData?.latitude,
                              deviceData?.longitude,
                            )
                          }
                        >
                          Open in Google Map
                        </div>
                      </div>

                      <div className="flex items-center gap-[5px]">
                        <div className="flex h-3 w-3 items-center justify-center">
                          <SettingIcon />
                        </div>
                        <div className="font-mont font-normal leading-normal text-[#5B5B5B]">
                          N/A
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-b border-solid border-[#d9d9d9] p-5">
                    <div className="flex flex-col gap-[3px]">
                      <div className="font-mont font-semibold leading-normal text-[#5B5B5B]">
                        Vegetation
                      </div>
                      <div className="font-mont font-normal leading-normal text-[#5B5B5B]">
                        {deviceData?.vegetation_notes ?? "No notes found."}
                      </div>
                    </div>
                  </div>

                  <div className=" p-5">
                    <div className="flex flex-col gap-[3px]">
                      <div className="font-mont font-semibold leading-normal text-[#5B5B5B]">
                        Installation Notes
                      </div>
                      <div className="font-mont font-normal leading-normal text-[#5B5B5B]">
                        {deviceData?.installation_notes ?? "No notes found."}
                      </div>
                    </div>
                  </div>
                </Tabs.Content>

                <Tabs.Content value="Per-Blob">
                  <div className="p-5">Not Implemented yet</div>
                </Tabs.Content>

                <Tabs.Content value="High-res">
                  <div className="p-5">Not Implemented yet</div>
                </Tabs.Content>

                <Tabs.Content value="Photos">
                  <div className="p-5">Not Implemented yet</div>
                </Tabs.Content>
              </Tabs.Root>
            </div>
          </div>
        </div>
      </>
    );
  }
};
