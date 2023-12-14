import * as ScrollArea from "@radix-ui/react-scroll-area";
import { BaseLayerResponse, Device } from "@/api/types/types.ts";
import { PoleItem } from "./pole-item";
import { usePoleContext } from "@/state/providers";

type PoleListProps = {
  data: BaseLayerResponse | undefined;
};

export const PolesList = ({ data }: PoleListProps) => {
  const { poleIds } = usePoleContext();

  const checkPoleClicked = (hardwareId: string) => {
    return poleIds.find((hardware_id) => hardware_id === hardwareId);
  };
  const clickedPoles = data?.devices?.filter((device: Device) =>
    checkPoleClicked(device.hardware_id),
  );
  const nonClickedPoles = data?.devices?.filter(
    (device: Device) => !checkPoleClicked(device.hardware_id),
  );

  return (
    <ScrollArea.Root className="h-full w-full overflow-hidden">
      <ScrollArea.Viewport className="h-full w-full pb-3">
        {clickedPoles?.map((device: Device, index: number) => (
          <PoleItem key={index} device={device} />
        ))}
        {nonClickedPoles?.map((device: Device, index: number) => (
          <PoleItem key={index} device={device} />
        ))}
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar className="mr-1 w-1 pb-3" orientation="vertical">
        <ScrollArea.Thumb className="rounded bg-[#1616164D]" />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
};
