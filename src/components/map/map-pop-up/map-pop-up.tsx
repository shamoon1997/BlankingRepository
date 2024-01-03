import { useEffect, useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { useGetPoleView } from "@/api/hooks/poles/use-get-pole-view";
import { PoleView } from "@/api/types/types.ts";
import { MapsIcon, LocationIcon, SettingIcon } from "@/assets/pole-view";
import { MinimizeIcon, CloseIcon } from "@/assets/misc";
import { useSelectedPolesActions, useSelectedPoles } from "@/state";
import { MapMinimizeView } from "@/components/map/map-minimize-view/map-minimize-view";
import { format } from "date-fns";
import { stripZeros } from "@/utils/strings/strip-zeros.ts";

type MapPopProps = {
  selectedPoleHardwareId: string;
  isMinimized: boolean;
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
}: MapPopProps) => {
  const { data, error, isLoading } = useGetPoleView([selectedPoleHardwareId]);
  const { setSelectedPoleIds } = useSelectedPolesActions();
  const selectedPoles = useSelectedPoles();

  const [deviceData, setDeviceData] = useState<PoleView | undefined>();

  const tabs = ["Overview", "Per-Blob", "High-res", "Audio", "Frequency"];

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
      (selectedPoleId) =>
        selectedPoleId.selectedPoleHardwareId == selectedPoleHardwareId,
    );
    selectedPoles[foundIndex].isMinimized = false;
    setSelectedPoleIds([...selectedPoles]);
  };

  return !isMinimized ? (
    <div className="flex h-full w-[340px] flex-col gap-0 rounded-sm bg-white shadow-pole-view">
      {isLoading ? (
        <div>Loading....</div>
      ) : (
        <>
          <div className="relative flex h-[214px] shrink-0 rounded-sm">
            <div className="absolute right-1 top-1 flex items-center justify-center gap-2 hover:cursor-pointer">
              <MinimizeIcon
                className="h-[15px] w-[15px] shrink-0"
                onClick={() => handleMinimize()}
              />
              <CloseIcon
                className="h-[16px] w-[16px]  shrink-0"
                onClick={() => handleClose()}
              />
            </div>
            <img
              /*  find the first non null url*/
              src={deviceData?.installation_photos?.find((i) => Boolean(i))}
              alt="Image of pole installation"
              className="h-full w-full shrink-0 rounded-sm object-cover"
            />
          </div>
          <div className="h-full overflow-y-auto">
            <div className="flex flex-col items-start gap-2.5 px-5 pb-2.5 pt-3.5">
              <div className="flex w-full justify-between">
                <div className="flex items-center gap-2">
                  <div className="font-mont text-base font-semibold leading-normal text-[#5B5B5B]">
                    Pole
                  </div>
                  <div className="font-mont text-base font-normal leading-normal text-[#5B5B5B]">
                    {deviceData?.pole_id}
                  </div>
                  <span>•</span>
                  <div className="font-mont text-base font-normal leading-normal text-[#5B5B5B]">
                    {stripZeros(deviceData?.device_sn ?? "")}
                  </div>
                </div>

                <div className="mt-[-5px] flex items-center justify-center">
                  <MapsIcon className="text-blue-400" />
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
                        {deviceData?.pole_id}
                      </div>

                      <div className=" font-mont font-semibold leading-normal text-[#5B5B5B]">
                        Serial{" "}
                      </div>
                      <div className="text-left font-mont font-normal leading-normal text-[#474747]">
                        {deviceData?.device_sn}
                      </div>

                      <div className=" font-mont font-semibold leading-normal text-[#5B5B5B]">
                        Deployment
                      </div>
                      <div className="text-left font-mont font-normal leading-normal text-[#474747]">
                        {deviceData?.deployment}
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
                        {deviceData?.last_health_report &&
                          format(
                            new Date(deviceData.last_health_report),
                            "M/dd/yyyy h:mm:ss a",
                          )}
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
                          Insulators, Transformers, Conductors
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
      className="flex flex-col justify-end gap-0 hover:cursor-pointer"
      onClick={() => handleMaximize()}
    >
      <MapMinimizeView
        selectedPoleId={stripZeros(deviceData?.device_sn ?? "")}
      />
    </div>
  );
};
