import { create } from "zustand";
import { DropDownListItemOption } from "@/components/common/multi-select/multi-select-dropdown.tsx";

type SelectedEquipmentsStoreType = {
  selectedEquipments: DropDownListItemOption[];
  actions: {
    setSelectedEquipments: (equipments: DropDownListItemOption[]) => void;
  };
};

const useSelectedEquipmentsStore = create<SelectedEquipmentsStoreType>(
  (set) => ({
    selectedEquipments: [],
    actions: {
      setSelectedEquipments: (equipments) =>
        set({ selectedEquipments: equipments }),
    },
  }),
);

// separate hooks for data
export const useSelectedEquipments = () => {
  return useSelectedEquipmentsStore((state) => state.selectedEquipments);
};

// separate hook for actions related to the data
export const useSelectedEquipmentActions = () => {
  return useSelectedEquipmentsStore((state) => state.actions);
};
