import {
  SearchIcon,
  CalendarOpenIcon,
  PoleStatusIcon,
  LayerStatusIcon,
} from "@/assets";
import { SelectDropdown } from "@/components/common";
import { gridscopeOptions } from "@/utils/select-dropdown";

export const PoleMiniFilter = () => {
  return (
    <div className="shadow-pole-filter rounded-5 max-w-[280px] flex-shrink-0 bg-white p-2">
      <div className="flex justify-between p-1">
        <div className="rounded-5 h-[23px] w-[23px] flex-shrink-0 border border-solid border-[#D9D9D9] bg-white">
          <SearchIcon />
        </div>
        <div className="flex gap-[10px]">
          <div className="rounded-5 align-center flex h-[23px] w-[37px] flex-shrink-0 flex-col  justify-center border border-solid border-[#D9D9D9] bg-white">
            <div>
              <CalendarOpenIcon />
            </div>
          </div>
          <div className="rounded-5 align-center flex h-[23px] w-[37px] flex-shrink-0 flex-col  justify-center border border-solid border-[#D9D9D9] bg-white">
            <div>
              <SelectDropdown
                options={gridscopeOptions}
                triggerIcon={
                  <div>
                    <PoleStatusIcon />
                  </div>
                }
              />
            </div>
          </div>
          <div className="rounded-5 align-center flex h-[23px] w-[37px] flex-shrink-0 flex-col  justify-center border border-solid border-[#D9D9D9] bg-white">
            <div>
              <div>
                <SelectDropdown
                  options={gridscopeOptions}
                  triggerIcon={
                    <div>
                      <LayerStatusIcon />
                    </div>
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
