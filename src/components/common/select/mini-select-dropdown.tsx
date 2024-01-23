import { ChevronIcon } from "@/assets";
import * as Select from "@radix-ui/react-select";
import React, { ReactNode } from "react";
import SelectItem from "./select-item";
import { useLayerControlUrlState } from "@/hooks/layer-options/use-layer-control-url-state.tsx";
import { LayerControlsSchemaType } from "@/utils/validation-schemas";

export type Option = {
  value: string;
  child: string | React.JSX.Element;
  icon?: React.JSX.Element;
};
type Props = {
  zIndex?: number;
  portalId: string;
  trigger?: ReactNode;
  options: Option[];
  searchParamKey: keyof LayerControlsSchemaType;
};

const MiniSelectDropdown: React.FC<Props> = ({
  trigger,
  options,
  searchParamKey,
  zIndex,
  portalId,
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
      // open
      onValueChange={(value: string) => {
        if (!searchParamKey?.length) return;
        searchParams.set(searchParamKey, value);

        setSearchParams(searchParams, {
          replace: true,
        });
      }}
      value={validatedLayerUrlState[searchParamKey]}
    >
      {trigger}
      <Select.Portal container={document.getElementById(portalId)}>
        <Select.Content
          className={`${
            zIndex ? `z-[${zIndex}]` : ""
          } w-[80px] min-w-0 rounded-[4px]  bg-white font-mont shadow-dropdown`}
        >
          <Select.Viewport className="p-1">
            <Select.Group className="flex flex-col gap-1">
              {options?.map((item) => {
                return (
                  <SelectItem
                    className=" flex cursor-pointer rounded-[3px] border-none px-[5px] py-[2px] text-[9px] outline-none hover:bg-[#F2F2F2] data-[state=checked]:bg-[#F7F7F7]"
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

export default MiniSelectDropdown;
