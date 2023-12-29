import * as Select from "@radix-ui/react-select";
import { ChevronIcon } from "@/assets";
import { FilterSelectItem } from "./filter-select-item";
import { FilterSelectItemProps } from "@/utils/filters";

type FilterSelectControlProps = {
  title?: string;
  valToPass?: string;
  selectItems: FilterSelectItemProps[];
  onChange?: (val: string) => void;
};
export const FilterSelectControl = ({
  title = "Filter",
  selectItems,
  onChange,
  valToPass,
}: FilterSelectControlProps) => {
  return (
    <div className="flex justify-between text-xs font-semibold">
      <p className="w-1/2 capitalize text-primary-hard">{title}</p>

      <Select.Root
        value={selectItems.length > 0 ? valToPass : undefined}
        onValueChange={(val) => {
          onChange && onChange(val);
        }}
      >
        <Select.Trigger
          className="flex w-1/2 cursor-pointer items-center justify-between text-left capitalize text-primary"
          aria-label="Filter"
        >
          <Select.Value placeholder="" />
          <Select.Icon>
            <ChevronIcon className="rotate-180" />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            position="popper"
            side="bottom"
            sideOffset={-30.4}
            alignOffset={-14.4}
            align="start"
            className={`z-50 box-border  max-h-[300px] flex-col overflow-hidden rounded-md border-[0.5px] border-solid border-[#D9D9D9] bg-white bg-opacity-100`}
          >
            <Select.ScrollUpButton className="flex h-5 items-center justify-center  ">
              <ChevronIcon className="h-4 w-4" />
            </Select.ScrollUpButton>

            <Select.Viewport className=" pt-2gap-3 pb-2 pl-2 pr-2 pt-2 font-mont text-xs font-semibold text-primary-hard ">
              {selectItems.map((item) => (
                <FilterSelectItem
                  key={item.value}
                  value={item.value}
                  label={item.label}
                />
              ))}
            </Select.Viewport>

            <Select.ScrollDownButton className="flex h-5 items-center justify-center ">
              <ChevronIcon className="h-4 w-4 rotate-180" />
            </Select.ScrollDownButton>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
};
