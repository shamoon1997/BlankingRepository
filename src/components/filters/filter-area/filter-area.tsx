import { AreaSummary } from "./area-summary";
import { FilterControls } from "./filter-controls";
import { ListSorter } from "./list-sorter";
import { PolesList } from "./poles-list";
import { getFilterBadgeText } from "@/utils/map";
import { CloseIcon } from "@/assets/misc";
import { useFilter } from "@/hooks/side-filter";

export const FilterArea = () => {
  const {
    sortBy,
    setSortOrder,
    setSortBy,
    sortOrder,
    isError,
    isSuccess,
    removeFilter,
    searchFilter,
    data,
  } = useFilter();
  return (
    <div className="z-10 box-border flex w-[300px] shrink-0 flex-col border-r-[0.5px] border-solid border-r-[rgba(91,91,91,0.5)] pt-3 shadow-filter-area ">
      <FilterControls />
      <div className="mb-[8px] flex flex-wrap gap-2 px-[16px]">
        {searchFilter.map((item, i) => {
          const { filter, operator, value } = item;
          return (
            <div
              key={`${item.value}-${i}`}
              className="flex items-center justify-between rounded-sm bg-[#EEEEEE] px-2 py-1  font-semibold text-primary"
            >
              <div className="text-[11px] capitalize">
                {getFilterBadgeText(filter, operator, value)}
              </div>

              <CloseIcon
                className="ml-2 h-4 w-4 cursor-pointer rounded-full text-black"
                /* eslint-disable-next-line @typescript-eslint/no-unsafe-return */
                onClick={() => removeFilter(i)}
              />
            </div>
          );
        })}
      </div>
      <AreaSummary data={data} />
      <ListSorter
        sortBy={sortBy}
        setSortBy={setSortBy}
        setSortOrder={setSortOrder}
        sortingOrder={sortOrder}
      />
      <PolesList
        data={data}
        sortBy={sortBy}
        sortingOrder={sortOrder}
        isSuccess={isSuccess}
        isError={isError}
      />
    </div>
  );
};
