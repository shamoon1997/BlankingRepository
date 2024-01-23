import { GridScopeIcon } from "@/assets";
import { SelectDropdown } from "@/components/common";
import { heatMapOptions, layerOptions } from "@/utils/select-dropdown";
import React from "react";
import CalendarInput from "@/components/common/calendar/calendar-input.tsx";

export const HeatMapControlLayer: React.FC = () => {
  return (
    <div className="pointer-events-none relative z-[20] flex w-full justify-between gap-2 p-2 pr-4 pt-4">
      <div className="pointer-events-none flex gap-2">
        <div className="pointer-events-none">
          <CalendarInput />
        </div>
      </div>

      <div className="pointer-events-none flex gap-2 self-start">
        <div className="hack pointer-events-auto w-[170px]">
          <SelectDropdown options={heatMapOptions} searchParamKey={"heatmap"} />
        </div>
        <div className="hack pointer-events-auto w-[170px]">
          <SelectDropdown
            zIndex={20}
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
