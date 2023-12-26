import { useState } from "react";
import { FilterInputControl } from "./filter-input-control";
import { FilterSelectControl } from "./filter-select-control";
import { SearchBar } from "./filter-search-bar";
import { useApplyFilter } from "@/stores/map-filter.store";
import { filtersList, operatorsList } from "@/utils/filters";

export const FilterControls = () => {
  const [filterActive, setFilterActive] = useState(false);
  const [filterValue, setFilterValue] = useState(filtersList?.[0].value);
  const [operatorValue, setOperatorValue] = useState(
    operatorsList[filterValue]?.[0].value,
  );
  const [inputValue, setInputValue] = useState("");

  const apply = useApplyFilter();

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
            setOption={setFilterValue}
          />
          <FilterSelectControl
            selectItems={operatorsList[filterValue]}
            setOption={setOperatorValue}
          />
          <FilterInputControl setValue={setInputValue} />
        </div>
      )}

      {filterActive && (
        <button
          onClick={() =>
            apply({
              filter: filterValue,
              operator: operatorValue,
              value: inputValue,
            })
          }
          className="mb-4 flex h-7 w-full items-center justify-center rounded bg-btn-primary text-xs font-semibold text-white"
        >
          Add Filter
        </button>
      )}
    </div>
  );
};
