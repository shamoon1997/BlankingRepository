import * as ScrollArea from "@radix-ui/react-scroll-area";
import { BaseLayerResponse, Device } from "@/api/types/types.ts";
import { PoleItem } from "./pole-item";
import { useSelectedPoles } from "@/state";

type PoleListProps = {
  data: BaseLayerResponse | undefined;
  sortBy: string;
};

export const PolesList = ({ data, sortBy }: PoleListProps) => {
  const poleIds = useSelectedPoles();

  const checkPoleClicked = (hardwareId: string) => {
    return poleIds.find(
      (selectedPoleId) => selectedPoleId.selectedPoleId === hardwareId,
    );
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
};
