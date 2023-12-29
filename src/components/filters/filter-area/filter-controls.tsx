import { useState } from "react";
import { FilterInputControl } from "./filter-input-control";
import { FilterSelectControl } from "./filter-select-control";
import { SearchBar } from "./filter-search-bar";
import { useApplyFilter } from "@/state/map";
import {
  FilterEnum,
  filtersList,
  filtersListNetworkOptions,
  operatorsList,
} from "@/utils/filters";
import { getSelectDefaultVal } from "@/utils/map";

const filterInitial = filtersList?.[0].value;
const operatorInitial = operatorsList[filterInitial]?.[0].value;

export const FilterControls = () => {
  const [filterActive, setFilterActive] = useState(false);
  const [filter, setFilter] = useState<string>(filterInitial);
  const [operator, setOperator] = useState<string>(operatorInitial);
  const [valueForFilter, setValueForFilter] = useState<string>("");

  const apply = useApplyFilter();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
  const isNetwork: boolean = filter === FilterEnum.network;

  const toggleFilterActive = () => setFilterActive(!filterActive);

  return (
    <div
      className={`mb-5 ml-2 mr-2 mt-3 flex flex-col justify-start rounded-md border-[0.5px] border-solid border-[#D9D9D9] px-2.5 pt-2 ${
        !filterActive ? "pb-2" : ""
      }`}
    >
      <SearchBar
        toggleFilterActive={toggleFilterActive}
        filterActive={filterActive}
      />

      {filterActive && (
        <div className="mb-4 ml-1 mr-1 mt-5 flex flex-col gap-4">
          <FilterSelectControl
            selectItems={filtersList}
            onChange={(val) => {
              setFilter(val);
              setOperator(operatorsList[val]?.[0].value);
              setValueForFilter("");

              // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
              if (val === FilterEnum.network) {
                setValueForFilter(filtersListNetworkOptions[0].value);
              }
            }}
            valToPass={filter}
            title="Filter"
          />

          <FilterSelectControl
            selectItems={operatorsList[filter]}
            title="Operator"
            valToPass={operator}
            onChange={(val) => setOperator(val)}
          />

          {/* CUSTOM DROPDOWN WHEN NETWORK OPTION IS SELECTED */}
          {isNetwork && (
            <FilterSelectControl
              selectItems={filtersListNetworkOptions}
              onChange={(val) => setValueForFilter(val)}
              valToPass={getSelectDefaultVal(
                valueForFilter,
                filtersListNetworkOptions,
              )}
              title="Network"
            />
          )}
          {!isNetwork && <FilterInputControl setValue={setValueForFilter} />}
        </div>
      )}

      {filterActive && (
        <button
          onClick={() =>
            apply({ filter: filter, operator: operator, value: valueForFilter })
          }
          className="mb-4 flex h-7 w-full items-center justify-center rounded bg-btn-primary text-xs font-semibold text-white"
        >
          Add Filter
        </button>
      )}
    </div>
  );
};
