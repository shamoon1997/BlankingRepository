import { PoleViewButton } from "./pole-view-button";
import { Device } from "@/api/types/types.ts";
import { usePoleContext } from "@/state/providers";

type poleItemProps = {
  device: Device;
};

export const PoleItem = ({ device }: poleItemProps) => {
  const { poleIds, setPoleIds } = usePoleContext();

  const checkPoleClicked = (hardwareId: string) => {
    return poleIds.find((poleId) => poleId === hardwareId);
  };

  const handlePoleClicked = (hardwareId: string) => {
    const filteredPole = poleIds.filter((poleId) => poleId !== hardwareId);
    setPoleIds([...filteredPole]);
  };

  return (
    <div
      className={`flex h-10 cursor-pointer items-center justify-between pl-4 pr-4 ${
        checkPoleClicked(device?.hardware_id)
          ? "border-[0.3px] border-y-[#DFDFDF] bg-[#F2F2F2]"
          : ""
      }`}
      onClick={() => handlePoleClicked(device?.hardware_id)}
    >
      <p className="text-xs font-semibold text-primary">
        {device?.hardware_id?.slice(0, 6)} • {device?.device_sn}
      </p>
      <PoleViewButton />
    </div>
  );
};
