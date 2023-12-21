import { PoleViewButton } from "./pole-view-button";
import { Device } from "@/api/types/types.ts";
import { useNavigate } from "react-router-dom";
import { useSelectedPoles, useSelectedPolesActions } from "@/state";

type poleItemProps = {
  device: Device;
  devices: Device[] | undefined;
};

export const PoleItem = ({ device }: poleItemProps) => {
  const poleIds = useSelectedPoles();
  const { setPoleIds } = useSelectedPolesActions();
  const navigate = useNavigate();

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
    >
      <div onClick={() => handlePoleClicked(device?.hardware_id)}>
        <p className="text-xs font-semibold text-primary">
          {device?.hardware_id?.slice(0, 6)} • {device?.device_sn}
        </p>
      </div>
      <PoleViewButton
        onClick={() => {
          if (checkPoleClicked(device?.hardware_id)) {
            if (poleIds.length > 0) {
              const queryParams = poleIds
                .map((poleId) => `deviceId=${poleId}`)
                .join("&");
              navigate(`/dashboard/poleView?${queryParams}`, { replace: true });
            }
          }
        }}
      />
    </div>
  );
};
