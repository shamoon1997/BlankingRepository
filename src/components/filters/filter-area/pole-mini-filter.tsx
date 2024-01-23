import {
  CalendarNoDaysIcon,
  ChevronIcon,
  FilterIcon,
  GridScopeIcon,
  SearchIcon,
} from "@/assets";
import { useLayerControlUrlState } from "@/hooks";
import MiniSelectDropdown, {
  Option,
} from "@/components/common/select/mini-select-dropdown.tsx";
import {
  MiniGridScopeOptions,
  MiniHeatMapOptions,
  MiniLayerOptions,
  MiniNetworkOptions,
} from "@/utils/select-dropdown";
import * as Select from "@radix-ui/react-select";
import { LayerControlsSchemaType } from "@/utils/validation-schemas";
import { useState } from "react";
import { useMiniFilterSearchActions, useMiniFilterSearchValue } from "@/state";

type PoleMiniFilterProps = {
  onCalendarButtonClick: () => void;
  isCalendarActive: boolean;
};
export const PoleMiniFilter = ({
  onCalendarButtonClick,
  isCalendarActive,
}: PoleMiniFilterProps) => {
  const { validatedLayerUrlState } = useLayerControlUrlState();
  let layerOptions: Option[] = [];
  let searchParamKey: keyof LayerControlsSchemaType = "layer";
  const [searchActive, setSearchActive] = useState(false);
  const searchValue = useMiniFilterSearchValue();
  const { setSearch } = useMiniFilterSearchActions();

  switch (validatedLayerUrlState.layer) {
    case "gridscope":
      layerOptions = MiniGridScopeOptions;
      searchParamKey = "gridscope";
      break;

    case "heatmap":
      layerOptions = MiniHeatMapOptions;
      searchParamKey = "heatmap";
      break;

    case "network":
      layerOptions = MiniNetworkOptions;
      searchParamKey = "network";
      break;
  }

  return (
    <div className="h-[40px] w-full rounded-[5px] rounded-bl-[0px] rounded-br-[0px] bg-white p-[9px]">
      <div className="flex justify-between">
        <div
          className={`flex h-[26px]  ${
            searchActive ? "w-full hover:border-[#628FEE]" : "w-[26px]"
          }  mr-1 cursor-pointer justify-center rounded-[5px] border border-solid border-[#D9D9D9]  hover:border-[#222222]`}
        >
          <button
            onClick={() => setSearchActive(!searchActive)}
            className={
              "flex h-full w-[26px] shrink-0 items-center justify-center"
            }
          >
            <SearchIcon className="h-3.5 w-3.5 shrink-0 cursor-pointer" />
          </button>
          {searchActive && (
            <input
              value={searchValue}
              onChange={(e) => setSearch(e.target.value)}
              className={
                "w-full rounded-[5px]  font-mont text-[10px] font-medium  outline-none"
              }
            />
          )}
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <button
            onClick={onCalendarButtonClick}
            disabled={validatedLayerUrlState.layer !== "heatmap"}
            className={`group  ${
              isCalendarActive ? "bg-mini-selected-state" : ""
            } flex h-[26px] w-[26px] flex-shrink-0 cursor-pointer flex-col items-center justify-center rounded-[5px] border border-solid border-[#D9D9D9] px-[7px]  hover:border-[#222222] disabled:cursor-not-allowed disabled:hover:border-[#D9D9D9] group-data-[state=active]:border-primary-blue`}
          >
            <CalendarNoDaysIcon
              className={`h-3 w-3 shrink-0  group-disabled:text-[#D9D9D9] ${
                isCalendarActive ? "text-white" : ""
              }`}
            />
          </button>

          {(validatedLayerUrlState.layer === "network" ||
            validatedLayerUrlState.layer === "gridscope" ||
            validatedLayerUrlState.layer === "heatmap") && (
            <MiniSelectDropdown
              zIndex={20}
              portalId={"1"}
              trigger={
                <Select.Trigger
                  disabled={isCalendarActive}
                  className="group flex h-[26px] min-w-[37px] shrink-0 cursor-pointer flex-row items-center justify-center gap-[7px] rounded-[5px] border border-solid border-[#D9D9D9] px-[7px] outline-none hover:border-[#222222] disabled:cursor-not-allowed disabled:hover:border-[#D9D9D9] data-[state=open]:border-mini-selected-state  data-[state=open]:bg-mini-selected-state"
                  aria-label="dropdown"
                >
                  <FilterIcon className="h-3 w-3 shrink-0  group-data-[state=open]:text-white" />
                  <ChevronIcon className="h-3 w-3 shrink-0 rotate-180 group-data-[state=open]:rotate-0 group-data-[state=open]:text-white" />
                </Select.Trigger>
              }
              options={layerOptions}
              searchParamKey={searchParamKey}
            />
          )}

          {/*TODO: equipment layer*/}

          {/*TODO: calendar*/}

          <MiniSelectDropdown
            portalId={"2"}
            zIndex={20}
            trigger={
              <Select.Trigger
                disabled={isCalendarActive}
                className="group flex h-[26px] min-w-[37px] shrink-0 cursor-pointer flex-row items-center justify-center gap-[7px] rounded-[5px] border border-solid border-[#D9D9D9] px-[7px] outline-none hover:border-[#222222] disabled:cursor-not-allowed disabled:hover:border-[#D9D9D9] data-[state=open]:border-mini-selected-state  data-[state=open]:bg-mini-selected-state"
                aria-label="dropdown"
              >
                <GridScopeIcon className="h-3 w-3 shrink-0  group-data-[state=open]:text-white" />
                <ChevronIcon className="h-3 w-3 shrink-0 rotate-180 group-data-[state=open]:rotate-0 group-data-[state=open]:text-white" />
              </Select.Trigger>
            }
            options={MiniLayerOptions}
            searchParamKey="layer"
          />
        </div>
      </div>
    </div>
  );
};
