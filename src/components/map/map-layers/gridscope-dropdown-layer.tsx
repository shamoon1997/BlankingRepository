import { FilterIcon, GridScopeIcon } from "@/assets";
import { SelectDropdown } from "@/components/common";
import CalendarInput from "@/components/common/calendar/calendar-input";
import {
  gridscopeOptions,
  poleConnectionStatusOptions,
  polePropertyOptions,
} from "@/utils/select-dropdown";
import React from "react";

const GridscopeDropdownLayer: React.FC = () => {
  return (
    <>
      <div className="absolute z-[2] flex w-full justify-between gap-2 p-2">
        {/* LEFT GROUP */}
        <div className="flex gap-2">
          <div className="w-[240px]">
            <CalendarInput />
          </div>
        </div>

        {/* RIGHT GROUP */}
        <div className="flex gap-2">
          <div className="w-[140px]">
            <SelectDropdown
              placeholder="Property"
              options={polePropertyOptions}
              searchParamKey="pole-property"
            />
          </div>
          <div className="w-[130px]">
            <SelectDropdown
              dropdownIcon={
                <span className="mr-[9px] h-[12px] w-[12px]">
                  <FilterIcon />
                </span>
              }
              placeholder="Status"
              options={poleConnectionStatusOptions}
              searchParamKey="connection-status"
            />
          </div>
          <div className="w-[130px]">
            <SelectDropdown
              dropdownIcon={
                <span className="mr-[10px] grid h-[12px] w-[12px] place-content-center">
                  <GridScopeIcon />
                </span>
              }
              placeholder="Options"
              options={gridscopeOptions}
              searchParamKey="gridscope-options"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default GridscopeDropdownLayer;
