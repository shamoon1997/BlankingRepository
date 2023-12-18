import { DownTriangleIcon, UpTriangleIcon } from "@/assets";
import { useClickAway } from "@uidotdev/usehooks";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { useState } from "react";
import { PoleSorterItem } from "./pole-sorter-radio-item";

type ListSorterProps = {
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
};

export const ListSorter = ({ sortBy, setSortBy }: ListSorterProps) => {
  const [showSortBy, setShowSortBy] = useState(false);

  const ref = useClickAway<HTMLDivElement>((e) => {
    const target = e.target as HTMLDivElement;
    if (target.id.startsWith("sort")) {
      return;
    }
    setShowSortBy(false);
  });

  const getValueOnWhichSorted = (sortBy: string) => {
    switch (sortBy) {
      case "sr-no":
        return "Serial Number";
      case "last-seen":
        return "Last Seen";
      case "connectivity":
        return "Connectivity";
      case "lifecycle":
        return "Lifecycle";
    }
  };

  return (
    <div className="relative flex cursor-pointer items-center gap-2  p-4 pt-3 text-xs text-primary">
      <div
        id="sort-container"
        onClick={() => {
          setShowSortBy(!showSortBy);
        }}
      >
        <span id="sort-sortby" className="font-semibold">
          Sort by{" "}
        </span>
        <span id="sort-sr-no" className="font-bold">
          {getValueOnWhichSorted(sortBy)}
        </span>

        {showSortBy && (
          <RadioGroup.Root
            ref={ref}
            value={sortBy}
            onClick={(e) => e.stopPropagation()}
            onValueChange={(sortby) => {
              setSortBy(sortby);
            }}
            className="absolute z-20 flex w-36 cursor-default flex-col gap-3 rounded-md border-[0.5px] border-solid border-[#D9D9D9] bg-white p-3"
          >
            <PoleSorterItem value="sr-no" label="Serial No." />
            <PoleSorterItem value="connectivity" label="Connectivity" />
            <PoleSorterItem value="last-seen" label="Last Seen" />
            <PoleSorterItem value="lifecycle" label="Lifecycle" />
            {/*TODO Maybe uncomment in future*/}
            {/* <PoleSorterItem value="circuit" label="Circuit" /> */}
          </RadioGroup.Root>
        )}
      </div>
      <div className="flex cursor-pointer items-center gap-[2px]">
        <UpTriangleIcon />
        <DownTriangleIcon />
      </div>
    </div>
  );
};
