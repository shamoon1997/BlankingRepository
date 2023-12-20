import { Listbox } from "@headlessui/react";
import { TextLimiter } from "@/components/common";
import { CheckedIcon, ChevronIcon, FilterIcon, UncheckedIcon } from "@/assets";
import * as ScrollArea from "@radix-ui/react-scroll-area";

export type DropDownListItemOption = {
  id: string | number;
  label: string;
};

type MultiSelectDropdownProps<T extends DropDownListItemOption> = {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  data?: T[];
  selectedItems: T[];
  onChange: (v: T[]) => void;
};
export const MultiSelectDropdown = <T extends DropDownListItemOption>({
  isError,
  isLoading,
  isSuccess,
  data,
  selectedItems,
  onChange,
}: MultiSelectDropdownProps<T>) => {
  console.log(selectedItems, "selectedItemsselectedItemsselectedItems");

  let selectedText = "";
  if (isLoading) {
    selectedText = "Loading ...";
  } else if (isError) {
    selectedText = "Error Loading Deployments";
  } else if (isSuccess && selectedItems?.length > 0) {
    selectedText = selectedItems.map((i) => i.label).join(", ");
  } else {
    selectedText = "Select Equipment";
  }
  return (
    <Listbox
      by={(item1, item2) => item1.id === item2.id}
      disabled={isLoading || isError}
      value={selectedItems}
      onChange={onChange}
      multiple
    >
      <Listbox.Button className="inline-flex h-[38px] w-full cursor-pointer items-center justify-between rounded-md border-[0.5px] border-default bg-white px-2 pl-3 font-mont text-sm font-semibold leading-none text-primary-hard shadow-dropdown outline-none data-[placeholder]:text-primary-hard">
        <div className="flex min-w-0 items-center text-xs">
          <div className="mb-[1.5px] mr-3 flex shrink-0 items-center justify-center [&_svg]:h-4 [&_svg]:w-4">
            <FilterIcon />
          </div>
          <TextLimiter>{selectedText}</TextLimiter>
        </div>

        <div className="shrink-0 rotate-180  ui-open:rotate-0 [&_svg]:h-4 [&_svg]:w-4">
          <ChevronIcon />
        </div>
      </Listbox.Button>

      <Listbox.Options className="mt-1 h-[330px] min-w-0 rounded-md border-[0.5px] border-default bg-white p-2 font-mont shadow-dropdown">
        <ScrollArea.Root className="h-full w-full overflow-hidden">
          <ScrollArea.Viewport className="h-full w-full">
            {data?.map((item) => (
              <Listbox.Option
                className="flex cursor-pointer items-center gap-2 rounded-[5px] border-none p-2 text-[11px] outline-none hover:bg-[#F2F2F2]"
                key={item.id}
                value={item}
              >
                <CheckedIcon className="&:rect:h-3 &:rect:w-3  hidden h-3 w-3 ui-selected:block" />
                <UncheckedIcon className="&:rect:h-3 &rect:w-3 block h-3 w-3 ui-selected:hidden" />
                <TextLimiter>{item.label}</TextLimiter>
              </Listbox.Option>
            ))}
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar
            className="mr-[1px] w-[3px]"
            orientation="vertical"
          >
            <ScrollArea.Thumb className="rounded bg-[#161616] bg-opacity-20" />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>
      </Listbox.Options>
    </Listbox>
  );
};
