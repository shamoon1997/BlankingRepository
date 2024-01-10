import { MapPopup } from "@/components/map/map-pop-up/map-pop-up.tsx";
import { SelectedPoleType } from "@/state/map/selected-poles-store.tsx";

type SelectedPoleViewProps = {
  selectedPoles: SelectedPoleType[];
};
export const SelectedPoleViews = ({ selectedPoles }: SelectedPoleViewProps) => {
  return (
    <div
      className={`${
        selectedPoles.length > 0 ? "pl-3 pr-3" : ""
      }  absolute bottom-4 top-16 z-[15] flex gap-3`}
    >
      {selectedPoles.map((selectedPole) => (
        <MapPopup
          selectedPoleHardwareId={selectedPole.selectedPoleHardwareId}
          isMinimized={selectedPole.isMinimized}
          key={selectedPole.selectedPoleHardwareId}
        />
      ))}
    </div>
  );
};
