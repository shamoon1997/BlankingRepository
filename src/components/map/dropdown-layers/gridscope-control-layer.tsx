import { FilterIcon, GridScopeIcon } from "@/assets";
import { SelectDropdown } from "@/components/common";
import {
  gridScopeOptions,
  layerOptions,
  // poleConnectionStatusOptions,
} from "@/utils/select-dropdown";
import React from "react";

export const GridscopeControlLayer: React.FC = () => {
  return (
    <>
      <div className="absolute z-[2] flex w-full justify-end gap-2 p-2 pr-4 pt-4">
        <div className="flex gap-2">
          <div className="w-[170px]">
            <SelectDropdown
              triggerIcon={
                <div className="mb-[1.5px] mr-3 flex items-center justify-center [&_svg]:h-4 [&_svg]:w-4">
                  <FilterIcon />
                </div>
              }
              options={gridScopeOptions}
              searchParamKey={"gridscope"}
            />
          </div>
          <div className="w-[170px]">
            <SelectDropdown
              triggerIcon={
                <div className="mr-3 flex items-center justify-center [&_svg]:h-4 [&_svg]:w-4">
                  <GridScopeIcon />
                </div>
              }
              options={layerOptions}
              searchParamKey="layer"
            />
          </div>
        </div>
      </div>
    </>
  );
};
