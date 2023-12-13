import { useState } from "react";
import { FilterInputControl } from "./filter-input-control";
import { FilterSelectControl } from "./filter-select-control";
import { FilterSelectItemProps } from "./filter-select-item";
import { SearchBar } from "./filter-search-bar";

const FilterOptions: FilterSelectItemProps[] = [
  { label: "Serial No.", value: "sr-no" },
  { label: "Pole", value: "pole" },
  { label: "Hardware ID", value: "hid" },
  { label: "Hologram ID", value: "hol-id" },
  { label: "Last Seen", value: "last-seen" },
];

const OperatorOptions: FilterSelectItemProps[] = [
  { label: "Contain", value: "contains" },
  { label: "Equals", value: "equals" },
  { label: "Starts With", value: "starts-with" },
  { label: "Is Less than", value: "less-than" },
  { label: "Is Greater than", value: "greater-than" },
];

export const FilterControls = () => {
  const [filterActive, setFilterActive] = useState(false);

  const [, setFilterValue] = useState(FilterOptions?.[0].value);
  const [, setOperatorValue] = useState(OperatorOptions?.[0].value);
  const [, setInputValue] = useState(OperatorOptions?.[0].value);

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
        <>
          <div className="mb-4 ml-1 mr-1 mt-5 flex flex-col gap-4">
            <FilterSelectControl
              selectItems={FilterOptions}
              setOption={setFilterValue}
            />
            <FilterSelectControl
              selectItems={OperatorOptions}
              setOption={setOperatorValue}
            />
            <FilterInputControl setValue={setInputValue} />
          </div>
          <button className="mb-4 flex h-7 w-full items-center justify-center rounded bg-btn-primary text-xs font-semibold text-white">
            Add Filter
          </button>
        </>
      )}
    </div>
  );
};
