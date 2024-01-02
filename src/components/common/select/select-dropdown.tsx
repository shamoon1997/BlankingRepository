import { ChevronIcon } from "@/assets";
import * as Select from "@radix-ui/react-select";
import React, { ReactNode } from "react";
import SelectItem from "./select-item";
import { useLayerControlUrlState } from "@/hooks/layer-options/use-layer-control-url-state.tsx";
import { TextLimiter } from "..";
import { LayerControlsSchemaType } from "@/utils/validation-schemas";

type Props = {
  placeholder?: string;
  triggerIcon?: ReactNode;
  options: {
    value: string;
    child: string | React.JSX.Element;
    icon?: React.JSX.Element;
  }[];
  searchParamKey: keyof LayerControlsSchemaType;
};

const SelectDropdown: React.FC<Props> = ({
  placeholder = "placeholder...",
  triggerIcon,
  options,
  searchParamKey,
}) => {
  const { setSearchParams, validatedLayerUrlState, searchParams } =
    useLayerControlUrlState();

  if (options.length === 0) {
    console.error(
      "Select Dropdown: options length is 0, it must contain at least 1 item.",
    );
    return null;
  }

  return (
    <Select.Root
      onValueChange={(value: string) => {
        if (!searchParamKey?.length) return;
        searchParams.set(searchParamKey, value);

        setSearchParams(searchParams, {
          replace: true,
        });
      }}
      value={validatedLayerUrlState[searchParamKey]}
    >
      <Select.Trigger
        className="inline-flex h-[38px] w-full cursor-pointer items-center justify-between rounded-md border-[0.5px] border-default bg-white px-2 pl-3 font-mont text-sm leading-none text-primary-hard shadow-dropdown outline-none data-[placeholder]:text-primary-hard"
        aria-label="dropdown"
      >
        <div className="flex min-w-0 items-center text-xs font-semibold">
          {triggerIcon}
          <TextLimiter>
            <Select.Value className="flex-1" placeholder={placeholder} />
          </TextLimiter>
        </div>
        <Select.Icon className="shrink-0 rotate-180 [&_svg]:h-4 [&_svg]:w-4">
          <ChevronIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          className="w-[var(--radix-select-trigger-width)] min-w-0 rounded-md border-[0.5px] border-default bg-white font-mont shadow-dropdown"
          position="popper"
          align="center"
          side="bottom"
          sideOffset={5}
        >
          <Select.Viewport className="p-2">
            <Select.Group className="flex flex-col gap-1">
              {options?.map((item) => {
                return (
                  <SelectItem
                    className="flex cursor-pointer rounded-[5px] border-none p-2 text-[11px] outline-none hover:bg-[#F2F2F2] data-[state=checked]:bg-[#F7F7F7]"
                    key={item.value}
                    value={item.value}
                  >
                    {item.child}
                  </SelectItem>
                );
              })}
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
};

export default SelectDropdown;
