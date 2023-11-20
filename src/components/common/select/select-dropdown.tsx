import { ChevronIcon } from "@/assets";
import * as Select from "@radix-ui/react-select";
import React, { ReactNode } from "react";

type Props = {
  placeholder?: string;
};

const SelectDropdown: React.FC<Props> = ({
  placeholder = "placeholder...",
}) => (
  <Select.Root>
    <Select.Trigger
      className="inline-flex h-[35px] w-full items-center justify-between gap-[5px] rounded bg-white px-[15px] text-[13px] leading-none text-slate-600 shadow-[0_2px_10px] shadow-black/10 outline-none hover:bg-blue-400 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-black/40"
      aria-label="Food"
    >
      <Select.Value placeholder={placeholder} />
      <Select.Icon className="text-slate-600">
        <div className="rotate-180">
          <ChevronIcon />
        </div>
      </Select.Icon>
    </Select.Trigger>
    <Select.Portal>
      <Select.Content className="overflow-hidden rounded-md bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
        <Select.ScrollUpButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-slate-600">
          <ChevronIcon />
        </Select.ScrollUpButton>
        <Select.Viewport className="p-[5px]">
          <Select.Group>
            <Select.Label className="text-mauve11 px-[25px] text-xs leading-[25px]">
              Fruits
            </Select.Label>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </Select.Group>

          <Select.Separator className="bg-violet6 m-[5px] h-[1px]" />

          <Select.Group>
            <Select.Label className="text-mauve11 px-[25px] text-xs leading-[25px]">
              Vegetables
            </Select.Label>
            <SelectItem value="aubergine">Aubergine</SelectItem>
            <SelectItem value="broccoli">Broccoli</SelectItem>
            <SelectItem value="carrot" disabled>
              Carrot
            </SelectItem>
            <SelectItem value="courgette">Courgette</SelectItem>
            <SelectItem value="leek">Leek</SelectItem>
          </Select.Group>

          <Select.Separator className="bg-violet6 m-[5px] h-[1px]" />

          <Select.Group>
            <Select.Label className="text-mauve11 px-[25px] text-xs leading-[25px]">
              Meat
            </Select.Label>
            <SelectItem value="beef">Beef</SelectItem>
            <SelectItem value="chicken">Chicken</SelectItem>
            <SelectItem value="lamb">Lamb</SelectItem>
            <SelectItem value="pork">Pork</SelectItem>
          </Select.Group>
        </Select.Viewport>
        <Select.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-slate-600">
          <div className="rotate-180">
            <ChevronIcon />
          </div>
        </Select.ScrollDownButton>
      </Select.Content>
    </Select.Portal>
  </Select.Root>
);

const SelectItem = React.forwardRef(
  (
    {
      children,
      className,
      value,
      ...props
    }: {
      value: string;
      children: ReactNode;
      className?: string | undefined;
      disabled?: boolean;
    },
    forwardedRef?: React.ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <Select.Item
        className={
          className ??
          "data-[disabled]:text-mauve8 relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[35px] text-[13px] leading-none text-slate-600 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet-900 data-[highlighted]:text-white data-[highlighted]:outline-none"
        }
        {...props}
        value={value}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
          {/* CHECK ICON HERE */}
          {/* <CheckIcon /> */}
        </Select.ItemIndicator>
      </Select.Item>
    );
  },
);

SelectItem.displayName = "SelectItem";

export default SelectDropdown;
