import { FilterIcon, GridScopeIcon } from "@/assets";
import { SelectDropdown } from "@/components/common";
import CalendarInput from "@/components/common/calendar/calendar-input";
import {
  layerOptions,
  poleConnectionStatusOptions,
  polePropertyOptions,
} from "@/utils/select-dropdown";
import { useLayerOptions } from "@/hooks";
import React from "react";

const DropDownLayers: React.FC = () => {
  const { validatedLayerUrlState } = useLayerOptions();

  return (
    <>
      <div className="absolute z-[2] flex w-full justify-between gap-2 p-2 pr-4 pt-4">
        {/* LEFT GROUP */}

        <div className="flex gap-2">
          <div className="w-[240px]">
            {validatedLayerUrlState.layer !== "gridscope" && <CalendarInput />}
          </div>
        </div>

        {/* RIGHT GROUP */}
        <div className="flex gap-2">
          {/* <div className="w-[170px]">
            <SelectDropdown
              options={polePropertyOptions}
              searchParamKey="pole-property"
            />
          </div> */}
          <div className="w-[170px]">
            <SelectDropdown
              triggerIcon={
                <div className="mb-[1.5px] mr-3 flex items-center justify-center [&_svg]:h-4 [&_svg]:w-4">
                  <FilterIcon />
                </div>
              }
              placeholder="Status"
              options={poleConnectionStatusOptions}
              searchParamKey="gridScopeOptions"
            />
          </div>
          <div className="w-[170px]">
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
    </>
  );
};

export default DropDownLayers;
