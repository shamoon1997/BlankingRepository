import { PoleViewButton } from "./pole-view-button";
import { Device } from "@/api/types/types.ts";
import { useNavigate } from "react-router-dom";
import { useSelectedPoles, useSelectedPolesActions } from "@/state";

type poleItemProps = {
  device: Device;
  devices: Device[] | undefined;
};

export const PoleItem = ({ device }: poleItemProps) => {
  const selectedPoleIds = useSelectedPoles();
  const { setSelectedPoleIds } = useSelectedPolesActions();
  const navigate = useNavigate();

  const checkPoleClicked = (hardwareId: string) => {
    return selectedPoleIds.find(
      (selectedPoleId) => selectedPoleId.selectedPoleId === hardwareId,
    );
  };

  const handlePoleClicked = (hardwareId: string) => {
    const filteredPole = selectedPoleIds.filter(
      (selectedPoleId) => selectedPoleId.selectedPoleId !== hardwareId,
    );
    setSelectedPoleIds([...filteredPole]);
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
            if (selectedPoleIds.length > 0) {
              const queryParams = selectedPoleIds
                .map(
                  (selectedPoleId) =>
                    `deviceId=${selectedPoleId.selectedPoleId}`,
                )
                .join("&");
              navigate(`/dashboard/poleView?${queryParams}`, { replace: true });
            }
          }
        }}
      />
    </div>
  );
};
