import { FilterIcon, GridScopeIcon } from "@/assets";
import { SelectDropdown } from "@/components/common";
import { layerOptions, networkOptions } from "@/utils/select-dropdown";
import React from "react";

export const NetworkControlLayer: React.FC = () => {
  return (
    <div className="pointer-events-none relative z-[20] flex w-full justify-end gap-2 p-2 pr-4 pt-4">
      <div className="pointer-events-none flex gap-2">
        <div
          id={"network-options"}
          className="hack pointer-events-auto w-[170px]"
        >
          <SelectDropdown
            portalId={"network-options"}
            zIndex={20}
            triggerIcon={
              <div className="mb-[1.5px] mr-3 flex items-center justify-center [&_svg]:h-4 [&_svg]:w-4">
                <FilterIcon />
              </div>
            }
            options={networkOptions}
            searchParamKey={"network"}
          />
        </div>
        <div
          id={"layer-options"}
          className="hack pointer-events-auto w-[170px]"
        >
          <SelectDropdown
            zIndex={20}
            portalId={"layer-options"}
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
  );
};
