import { AreaSummary } from "./area-summary";
import { FilterControls } from "./filter-controls";
import { ListSorter } from "./list-sorter";
import { PolesList } from "./poles-list";

export const FilterArea = () => {
  return (
    <div className="shadow-filter-area z-10 box-border flex h-screen w-[380px] flex-col  border-r-[0.5px] border-solid  border-r-[rgba(91,91,91,0.5)] pt-3 ">
      <FilterControls />
      <AreaSummary />
      <ListSorter />
      <PolesList />
    </div>
  );
};
