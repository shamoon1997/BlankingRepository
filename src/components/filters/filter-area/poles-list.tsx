import * as ScrollArea from "@radix-ui/react-scroll-area";
import { PoleItem } from "./pole-item";
import { useMyContext } from "@/context/pole/pole-context";

type PoleListProps = {
  dataWithLagBuffer: any;
};

export const PolesList = ({ dataWithLagBuffer }: PoleListProps) => {
  const { myArray } = useMyContext();

  const checkPoleClicked = (hardwareId: string) => {
    return myArray.find((hardware_id) => hardware_id === hardwareId);
  };
  const clickedDevices = dataWithLagBuffer?.devices?.filter((device: any) =>
    checkPoleClicked(device.hardware_id),
  );
  const nonClickedDevices = dataWithLagBuffer?.devices?.filter(
    (device: any) => !checkPoleClicked(device.hardware_id),
  );

  console.log("dataWithLagBuffer", dataWithLagBuffer?.devices);
  return (
    <ScrollArea.Root className="h-full w-full overflow-hidden">
      <ScrollArea.Viewport className="h-full w-full pb-3">
        {clickedDevices?.map((device: any, index: number) => (
          <PoleItem key={index} device={device} />
        ))}
        {nonClickedDevices?.map((device: any, index: number) => (
          <PoleItem key={index} device={device} />
        ))}
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar className="mr-1 w-1 pb-3" orientation="vertical">
        <ScrollArea.Thumb className="rounded bg-[#1616164D]" />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
};
