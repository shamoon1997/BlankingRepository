import { GridScopeIcon } from "@/assets";
import { SelectDropdown } from "@/components/common";
import { heatMapOptions, layerOptions } from "@/utils/select-dropdown";
import React from "react";
import CalendarInput from "@/components/common/calendar/calendar-input.tsx";

export const HeatMapControlLayer: React.FC = () => {
  return (
    <div className="absolute z-[2] flex w-full justify-between gap-2 p-2 pr-4 pt-4">
      <div className="flex gap-2">
        <div className="w-[240px]">
          <CalendarInput />
        </div>
      </div>

      <div className="flex gap-2">
        <div className="w-[170px]">
          <SelectDropdown options={heatMapOptions} searchParamKey={"heatmap"} />
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
  );
};
