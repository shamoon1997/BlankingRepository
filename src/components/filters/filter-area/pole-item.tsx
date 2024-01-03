import { PoleViewButton } from "./pole-view-button";
import { useSelectedPolesActions } from "@/state";
// import { useNavigate } from "react-router-dom";
// import { useSelectedPoles, useSelectedPolesActions } from "@/state";

type poleItemProps = {
  hardwareId: string;
  deviceSerialNumber: string;
};

export const PoleItem = ({ hardwareId, deviceSerialNumber }: poleItemProps) => {
  // const selectedPoles = useSelectedPoles();
  const { checkIfPoleIsSelected, toggleAddSelectedPole } =
    useSelectedPolesActions();
  // const navigate = useNavigate();

  return (
    <div
      onClick={() => toggleAddSelectedPole({ hardwareId, deviceSerialNumber })}
      className={`flex h-10 cursor-pointer items-center justify-between pl-4 pr-4 ${
        checkIfPoleIsSelected(hardwareId)
          ? "border-[0.3px] border-y-[#DFDFDF] bg-[#F2F2F2]"
          : ""
      }`}
    >
      <div className="flex-1">
        <p className="text-xs font-semibold text-primary">
          <span> {hardwareId?.slice(0, 6)}</span> •{" "}
          <span>{deviceSerialNumber}</span>
        </p>
      </div>
      <PoleViewButton
        onClick={(e) => {
          e.stopPropagation();
          alert("This is disable temporarily will be enabled soon!");
          // if (checkIfPoleIsSelected(hardwareId)) {
          //   if (selectedPoles.length > 0) {
          //     const queryParams = selectedPoles
          //       .map(
          //         (selectedPoleId) =>
          //           `deviceId=${selectedPoleId.selectedPoleHardwareId}`,
          //       )
          //       .join("&");
          //     navigate(`/dashboard/poleView?${queryParams}`);
          //   }
          // }
        }}
      />
    </div>
  );
};
