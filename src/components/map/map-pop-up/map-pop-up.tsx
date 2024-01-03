import { useEffect, useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { useGetPoleView } from "@/api/hooks/poles/use-get-pole-view";
import { PoleView } from "@/api/types/types.ts";
import { MapsIcon, LocationIcon, SettingIcon } from "@/assets/pole-view";
import { MinimizeIcon, CloseIcon } from "@/assets/misc";
import { useSelectedPolesActions, useSelectedPoles } from "@/state";
import { MapMinimizeView } from "@/components/map/map-minimize-view/map-minimize-view";

type MapPopProps = {
  selectedPoleHardwareId: string;
  isMinimized: boolean;
};

const getNetworkMode = (networkMode: number | undefined) => {
  switch (networkMode) {
    case 1:
      return "cellular";
    case 2:
      return "lora";
    case 3:
      return "unknown";
    default:
      return "all";
  }
};

const calculateTimeDifference = (lastHealthReportTimestamp: string): string => {
  const now: Date = new Date();
  const reportTime: Date = new Date(lastHealthReportTimestamp);

  const differenceInMilliseconds: number = now.getTime() - reportTime.getTime();

  const differenceInSeconds: number = Math.floor(
    differenceInMilliseconds / 1000,
  );
  const minutes: number = Math.floor(differenceInSeconds / 60);
  const hours: number = Math.floor(minutes / 60);
  const remainingMinutes: number = minutes % 60;

  if (hours > 0) {
    return `${hours} hour ${remainingMinutes}m`;
  } else {
    return `${minutes}m`;
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
}: MapPopProps) => {
  const { data, error, isLoading } = useGetPoleView([selectedPoleHardwareId]);
  const { setSelectedPoleIds } = useSelectedPolesActions();
  const selectedPoles = useSelectedPoles();

  const [deviceData, setDeviceData] = useState<PoleView | undefined>();

  const tabs = ["overview", "Per-Blob", "High-res", "Audio", "Frequency"];

  useEffect(() => {
    if (!isLoading && !error) {
      setDeviceData(data?.[0]);
    }
  }, [data, isLoading, error]);

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
    const foundIndex = selectedPoles.findIndex(
      (selectedPoleIdO) =>
        selectedPoleIdO.selectedPoleHardwareId == selectedPoleHardwareId,
    );
    selectedPoles[foundIndex].isMinimized = false;
    setSelectedPoleIds([...selectedPoles]);
  };

  return !isMinimized ? (
    <div className="ml-5 mt-5 flex h-[84vh] w-full max-w-[292px] flex-col  gap-0 rounded-sm bg-white shadow-pole-view">
      {isLoading ? (
        <div className="w-[292px]">Loading....</div>
      ) : (
        <>
          <div className="relative flex h-[214px] items-center justify-center">
            <div className="absolute right-1 top-1 flex items-center justify-center hover:cursor-pointer">
              <MinimizeIcon onClick={() => handleMinimize()} />
              <CloseIcon onClick={() => handleClose()} />
            </div>
            <img
              src={deviceData?.installation_photos[0]}
              alt="Your Image Alt Text"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="h-full overflow-y-auto">
            <div className="flex flex-col items-start gap-2.5 px-5 pb-2.5 pt-3.5">
              <div className="flex w-full justify-between">
                <div className="flex gap-1">
                  <div className="min-w-[38px] font-mont text-sm font-semibold leading-normal text-[#5B5B5B]">
                    Pole
                  </div>
                  <div className="font-mont text-sm font-normal leading-normal text-[#5B5B5B]">
                    {deviceData?.device_sn}
                  </div>
                </div>
                <div className="mt-[-5px] flex items-center justify-center">
                  <MapsIcon className="text-blue-400" />
                </div>
              </div>
              <div className="inline-flex items-center gap-[5px] py-1">
                <div
                  className={`mt-px h-2 w-2 shrink-0 rounded-full ${
                    deviceData?.online === 0 ? "bg-offline" : "bg-online"
                  }`}
                />
                <div className="font-mont text-[10px] font-normal leading-normal tracking-[-0.5px] text-[#161616]">
                  {deviceData?.online === 0 ? "Offline" : "Online"}
                </div>
              </div>
            </div>
            <div className="mx-auto mb-8 w-full">
              <Tabs.Root defaultValue="overview">
                <Tabs.List className="flex gap-3.5 overflow-x-auto border-b border-solid border-[#d9d9d9] px-6">
                  {tabs.map((tab) => {
                    return (
                      <Tabs.Trigger
                        key={tab}
                        value={tab}
                        className="whitespace-nowrap border-b border-solid border-transparent py-[7px] font-mont text-[8px] font-normal leading-[100%] text-[#5B5B5B] data-[state=active]:border-[#628fee] data-[state=active]:text-[#628fee]"
                      >
                        {tab}
                      </Tabs.Trigger>
                    );
                  })}
                </Tabs.List>

                <Tabs.Content value="overview">
                  <div className="border-b border-solid border-[#d9d9d9] p-5">
                    <div className="flex flex-col gap-2.5">
                      <div className="flex gap-8">
                        <div className="min-w-[62px] font-mont text-[10px] font-semibold leading-normal text-[#5B5B5B]">
                          Pole
                        </div>
                        <div className="text-left font-mont text-[10px] font-normal leading-normal text-[#474747]">
                          {deviceData?.pole_id}
                        </div>
                      </div>
                      <div className="flex gap-8">
                        <div className="min-w-[62px] font-mont text-[10px] font-semibold leading-normal text-[#5B5B5B]">
                          Serial{" "}
                        </div>
                        <div className="text-left font-mont text-[10px] font-normal leading-normal text-[#474747]">
                          {deviceData?.device_sn}
                        </div>
                      </div>

                      <div className="flex gap-8">
                        <div className="min-w-[62px] font-mont text-[10px] font-semibold leading-normal text-[#5B5B5B]">
                          Deployment
                        </div>
                        <div className="text-left font-mont text-[10px] font-normal leading-normal text-[#474747]">
                          {deviceData?.deployment}
                        </div>
                      </div>

                      <div className="flex gap-8">
                        <div className="min-w-[62px] font-mont text-[10px] font-semibold leading-normal text-[#5B5B5B]">
                          Network
                        </div>
                        <div className="text-left font-mont text-[10px] font-normal leading-normal text-[#474747]">
                          {getNetworkMode(deviceData?.network_mode)}
                        </div>
                      </div>

                      <div className="flex gap-8">
                        <div className="min-w-[62px] font-mont text-[10px] font-semibold leading-normal text-[#5B5B5B]">
                          Last seen
                        </div>
                        <div className="text-left font-mont text-[10px] font-normal leading-normal text-[#474747]">
                          {deviceData?.last_health_report &&
                            calculateTimeDifference(
                              deviceData.last_health_report,
                            )}
                        </div>
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
                          className="font-mont text-[10px] font-normal capitalize leading-normal text-[#5B5B5B] underline hover:cursor-pointer"
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
                        <div className="font-mont text-[10px] font-normal leading-normal text-[#5B5B5B]">
                          Insulators, Transformers, Conductors
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-b border-solid border-[#d9d9d9] p-5">
                    <div className="flex flex-col gap-[3px]">
                      <div className="font-mont text-[10px] font-semibold leading-normal text-[#5B5B5B]">
                        Vegetation
                      </div>
                      <div className="font-mont text-[10px] font-normal leading-normal text-[#5B5B5B]">
                        {deviceData?.vegetation_notes}
                      </div>
                    </div>
                  </div>

                  <div className=" p-5">
                    <div className="flex flex-col gap-[3px]">
                      <div className="font-mont text-[10px] font-semibold leading-normal text-[#5B5B5B]">
                        Installation Notes
                      </div>
                      <div className="font-mont text-[10px] font-normal leading-normal text-[#5B5B5B]">
                        {deviceData?.installation_notes}
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

                <Tabs.Content value="Audio">
                  <div className="p-5">Not Implemented yet</div>
                </Tabs.Content>

                <Tabs.Content value="Frequency">
                  <div className="p-5">Not Implemented yet</div>
                </Tabs.Content>
              </Tabs.Root>
            </div>
          </div>
        </>
      )}
    </div>
  ) : (
    <div
      className="flex h-[84vh] w-full max-w-[292px] flex-col justify-end gap-0 hover:cursor-pointer"
      onClick={() => handleMaximize()}
    >
      <MapMinimizeView selectedPoleId={selectedPoleHardwareId} />
    </div>
  );
};
