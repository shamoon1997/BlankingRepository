import * as ScrollArea from "@radix-ui/react-scroll-area";
import { BaseLayerResponse, Device } from "@/api/types/types.ts";
import { PoleItem } from "./pole-item";
import { useSelectedPoles, useSelectedPolesActions } from "@/state";

export type SortingOrder = "asc" | "desc";

type PoleListProps = {
  data: BaseLayerResponse | undefined;
  sortBy: string;
  sortingOrder: SortingOrder;
  isError: boolean;
  isSuccess: boolean;
};

export const PolesList = ({
  data,
  sortBy,
  isError,
  isSuccess,
  sortingOrder,
}: PoleListProps) => {
  const selectedPoles = useSelectedPoles();
  const { checkIfPoleIsSelected } = useSelectedPolesActions();

  const sortDevices = (devices: Device[] | undefined) => {
    if (!devices) return [];

    // Use sort based on the sortBy prop
    switch (sortBy) {
      case "sr-no":
        return devices.slice().sort((a, b) => {
          if (sortingOrder === "asc") {
            return a.device_sn.localeCompare(b.device_sn);
          } else {
            return b.device_sn.localeCompare(a.device_sn);
          }
        });
      case "last-seen":
        return devices.slice().sort((a, b) => {
          if (sortingOrder === "asc") {
            return (
              new Date(a.last_health_report).getTime() -
              new Date(b.last_health_report).getTime()
            );
          } else {
            return (
              new Date(b.last_health_report).getTime() -
              new Date(a.last_health_report).getTime()
            );
          }
        });
      case "connectivity":
        return devices.slice().sort((a, b) => {
          if (sortingOrder === "asc") {
            return a.online - b.online;
          } else {
            return b.online - a.online;
          }
        });
      case "lifecycle":
        return devices.slice().sort((a, b) => {
          if (sortingOrder === "asc") {
            return a.network_mode - b.network_mode;
          } else {
            return b.network_mode - a.network_mode;
          }
        });

      default:
        return devices;
    }
  };

  const nonSelectedPoles = sortDevices(
    data?.devices?.filter(
      (device: Device) => !checkIfPoleIsSelected(device.hardware_id),
    ),
  );

  if (nonSelectedPoles.length === 0 && isSuccess) {
    return (
      <p className="pl-4 pr-4 text-[12px]">
        No poles found in this area. Expanding your search may help.
      </p>
    );
  }

  // when our fetch is successful we render the list
  if (isSuccess) {
    return (
      <ScrollArea.Root className="h-full w-full overflow-hidden">
        <ScrollArea.Viewport className="h-full w-full pb-3">
          {selectedPoles.map((selectedPole, index: number) => (
            <PoleItem
              key={index}
              hardwareId={selectedPole.selectedPoleHardwareId}
              deviceSerialNumber={selectedPole.deviceSerialNumber}
            />
          ))}
          {nonSelectedPoles.map((device: Device, index: number) => (
            <PoleItem
              key={index}
              hardwareId={device.hardware_id}
              deviceSerialNumber={device.device_sn}
            />
          ))}
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar className="mr-1 w-1 pb-3" orientation="vertical">
          <ScrollArea.Thumb className="rounded bg-[#1616164D]" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    );
  }

  // otherwise return nothing
  if (isError) {
    return null;
  }

  // default is loading state as the map takes time to load, and we do not want to wait for it to reach the loading state, we just show it by default
  return (
    <ScrollArea.Root className="h-full w-full overflow-hidden">
      <ScrollArea.Viewport className="h-full w-full pb-3">
        {[...Array(20)].map((_, i) => {
          return (
            <div
              className="flex h-10 items-center justify-between pl-4 pr-4"
              key={i}
            >
              <div className="flex items-center gap-1">
                <p className="h-[16px] w-[38px] animate-pulse rounded bg-[#EEEEEE]" />
                <span className="text-[#EEEEEE]">•</span>
                <p className="h-[16px] w-[70px] animate-pulse rounded bg-[#EEEEEE]" />
              </div>

              <div className="h-[25px] w-[66px] animate-pulse rounded bg-[#EEEEEE]" />
            </div>
          );
        })}
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar className="mr-1 w-1 pb-3" orientation="vertical">
        <ScrollArea.Thumb className="rounded bg-[#1616164D]" />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
};
