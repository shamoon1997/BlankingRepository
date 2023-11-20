import { FilterIcon, SearchIcon } from "@/assets";

export const FilterControls = () => {
  return (
    <div className="mb-5 ml-2 mr-2 mt-3 flex h-9 items-center rounded-md border-[0.5px] border-solid border-[#D9D9D9] p-3">
      <SearchIcon className="h-[18px] w-[18px]" />
      <input className="ml-1 mr-1 flex-1 text-xs font-semibold text-primary-hard outline-none" />
      <FilterIcon className="h-7 w-7" />
    </div>
  );
};
