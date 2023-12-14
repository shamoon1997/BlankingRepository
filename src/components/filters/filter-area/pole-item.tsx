import { PoleViewButton } from "./pole-view-button";
import { useMyContext } from "@/context/pole/pole-context";

type poleItemProps = {
  device: any;
};

export const PoleItem = ({ device }: poleItemProps) => {
  const { myArray } = useMyContext();

  const checkPoleClicked = (hardwareId: string) => {
    return myArray.find((hardware_id) => hardware_id === hardwareId);
  };

  return (
    <div
      className={`flex h-10 cursor-pointer items-center justify-between pl-4 pr-4 ${
        checkPoleClicked(device?.hardware_id)
          ? "border-[0.3px] border-y-[#DFDFDF] bg-[#F2F2F2]"
          : ""
      }`}
    >
      <p className="text-xs font-semibold text-primary">
        {device?.hardware_id?.slice(0, 6)} • {device?.device_sn}
      </p>
      <PoleViewButton />
    </div>
  );
};
