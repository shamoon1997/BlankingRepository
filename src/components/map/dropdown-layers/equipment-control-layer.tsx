import { GridScopeIcon } from "@/assets";
import { SelectDropdown } from "@/components/common";
import { layerOptions } from "@/utils/select-dropdown";
import React from "react";
import {
  DropDownListItemOption,
  MultiSelectDropdown,
} from "../../common/multi-select/multi-select-dropdown.tsx";
import { useGetEquipmentsList } from "@/api/hooks/maps/use-get-equipments-list.ts";
import { capitalize, uniqBy } from "lodash";
import {
  useSelectedEquipmentActions,
  useSelectedEquipments,
} from "@/state/map/selected-equipments-store.tsx";

export const EquipmentControlLayer: React.FC = () => {
  const { data, isLoading, isError, isSuccess } = useGetEquipmentsList();

  const listOptions: DropDownListItemOption[] = [
    {
      label: "All",
      id: "all",
    },
    ...uniqBy(
      data?.data?.map((equipment) => {
        return {
          id: equipment,
          label: capitalize(equipment.slice(1).replace(/_/g, " ")),
        };
      }) ?? [],
      (equipment) => equipment.id,
    ),
  ];

  const selectedEquipments = useSelectedEquipments();
  const { setSelectedEquipments } = useSelectedEquipmentActions();

  return (
    <div className="pointer-events-none absolute z-20 flex w-full justify-end gap-2 p-2 pr-4 pt-4">
      <div className="pointer-events-none flex gap-2">
        <div className="pointer-events-auto w-[170px]">
          <MultiSelectDropdown
            data={listOptions}
            isError={isError}
            isLoading={isLoading}
            isSuccess={isSuccess}
            selectedItems={selectedEquipments}
            onChange={(v) => {
              setSelectedEquipments(v);
            }}
          />
        </div>
        <div className="pointer-events-auto w-[170px]">
          <SelectDropdown
            triggerIcon={
              <div className="mr-3 flex items-center justify-center [&_svg]:h-4 [&_svg]:w-4">
                <GridScopeIcon />
              </div>
            }
            placeholder="Options"
            options={layerOptions}
            searchParamKey="layer"
          />
        </div>
      </div>
    </div>
  );
};
