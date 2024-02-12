import { ChevronIcon } from "@/assets";
import * as Select from "@radix-ui/react-select";
import React, { ReactNode } from "react";
import SelectItem from "../../common/select/select-item";
import { TextLimiter } from "../../common";
import { useSelectedPoles } from "@/state";
import { useMetricDataState } from "@/state/device-data";

type Props = {
  placeholder?: string;
  triggerIcon?: ReactNode;
  valChangeFunc: (val: string) => void;
};

const DeviceDataDropdown: React.FC<Props> = ({
  placeholder = "placeholder...",
  triggerIcon,
}) => {
  const selectedMapViewPoles = useSelectedPoles();
  const selectedGraphViewPoles = useMetricDataState();

  const metricsDataDevicesOptions = [
    {
      value: "map-view",
      child: (
        <Select.ItemText>
          <div>Map View ({selectedMapViewPoles.length})</div>
        </Select.ItemText>
      ),
    },
    {
      value: "graph-view",
      child: (
        <Select.ItemText>
          <div>
            Graph View ({selectedGraphViewPoles.selectedMetrics.length})
          </div>
        </Select.ItemText>
      ),
    },
  ];

  return (
    <Select.Root
      defaultValue="1"
      // onValueChange={(value: string) => {
      //   console.log(value);
      // }}
    >
      <Select.Trigger
        className="inline-flex h-full w-full cursor-pointer items-center justify-between rounded-md bg-white font-mont text-sm leading-none text-primary-hard outline-none data-[placeholder]:text-primary-hard"
        aria-label="dropdown"
      >
        <div className="flex w-full items-center justify-between gap-[4px] pr-[4px] text-[10px] font-semibold text-black">
          {triggerIcon}

          <TextLimiter>
            <Select.Value placeholder={placeholder} />
          </TextLimiter>
        </div>
        <Select.Icon className="shrink-0 rotate-180 [&_svg]:h-4 [&_svg]:w-4">
          <ChevronIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          className="w-[var(--radix-select-trigger-width)] min-w-0 rounded-md border-[0.5px] border-default bg-white font-mont"
          position="popper"
          align="center"
          side="bottom"
          sideOffset={5}
        >
          <Select.Viewport className="p-2">
            <Select.Group className="flex flex-col gap-1">
              {metricsDataDevicesOptions?.map((item) => {
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

export default DeviceDataDropdown;
