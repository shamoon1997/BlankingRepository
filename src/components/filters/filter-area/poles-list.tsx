import * as ScrollArea from "@radix-ui/react-scroll-area";
import { BaseLayerResponse, Device } from "@/api/types/types.ts";
import { PoleItem } from "./pole-item";
import { useSelectedPoles } from "@/state";

type PoleListProps = {
  data: BaseLayerResponse | undefined;
  sortBy: string;
  isError: boolean;
  isSuccess: boolean;
};

export const PolesList = ({
  data,
  sortBy,
  isError,
  isSuccess,
}: PoleListProps) => {
  const poleIds = useSelectedPoles();

  const checkPoleClicked = (hardwareId: string) => {
    return poleIds.find((hardware_id) => hardware_id === hardwareId);
  };

  const sortDevices = (devices: Device[] | undefined) => {
    if (!devices) return [];

    // Use sort based on the sortBy prop
    switch (sortBy) {
      case "sr-no":
        return devices
          .slice()
          .sort((a, b) => a.device_sn.localeCompare(b.device_sn));
      case "last-seen":
        return devices
          .slice()
          .sort(
            (a, b) =>
              new Date(a.last_health_report).getTime() -
              new Date(b.last_health_report).getTime(),
          );
      case "connectivity":
        return devices.slice().sort((a, b) => a.online - b.online);
      case "lifecycle":
        return devices.slice().sort((a, b) => a.network_mode - b.network_mode);

      default:
        return devices;
    }
  };

  const clickedPoles = sortDevices(
    data?.devices?.filter((device: Device) =>
      checkPoleClicked(device.hardware_id),
    ),
  );

  const nonClickedPoles = sortDevices(
    data?.devices?.filter(
      (device: Device) => !checkPoleClicked(device.hardware_id),
    ),
  );

  if (nonClickedPoles.length === 0 && isSuccess) {
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
          {clickedPoles.map((device: Device, index: number) => (
            <PoleItem key={index} device={device} devices={data?.devices} />
          ))}
          {nonClickedPoles.map((device: Device, index: number) => (
            <PoleItem key={index} device={device} devices={data?.devices} />
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
