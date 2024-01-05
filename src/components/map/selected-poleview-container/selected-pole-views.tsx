import { useSelectedPoles } from "@/state";
import { MapPopup } from "@/components/map/map-pop-up/map-pop-up.tsx";

export const SelectedPoleViews = () => {
  const selectedPoles = useSelectedPoles();

  return (
    <div
      className={`${
        selectedPoles.length > 0 ? "pl-3 pr-3" : ""
      }  absolute bottom-4 top-16 z-[15] flex gap-3`}
    >
      {selectedPoles
        .slice()
        .sort((a, b) =>
          a.isMinimized === b.isMinimized ? 0 : a.isMinimized ? 1 : -1,
        )
        .map((selectedPole) => (
          <MapPopup
            selectedPoleHardwareId={selectedPole.selectedPoleHardwareId}
            isMinimized={selectedPole.isMinimized}
            key={selectedPole.selectedPoleHardwareId}
          />
        ))}
    </div>
  );
};
