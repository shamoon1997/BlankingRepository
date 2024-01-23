import { ElectrometerIcon, VibrationIcon } from "@/assets";
import { TextLimiter } from "@/components/common";
import * as Select from "@radix-ui/react-select";
import {
  GridscopeOptionsType,
  HeatmapOptionsType,
  LayerPickerOptionsType,
  NetworkOptionsType,
} from "@/utils/validation-schemas";

type SelectDropdownType<T> = {
  value: T;
  child: string | JSX.Element;
};

/*
  Add whatever you want to show in the trigger inside
  <Select.ItemText>your thing to show</Select.ItemText>
  use TextLimiter to truncate text whenever it exceeds the width of its parent
  min-w-0 is needed to truncate text do not remove it
*/

export const layerOptions: SelectDropdownType<LayerPickerOptionsType>[] = [
  {
    value: "gridscope",
    child: (
      <TextLimiter>
        <Select.ItemText>Gridscope</Select.ItemText>
      </TextLimiter>
    ),
  },
  // {
  //   value: "alert",
  //   child: (
  //     <TextLimiter>
  //       <Select.ItemText>Alert</Select.ItemText>
  //     </TextLimiter>
  //   ),
  // },
  {
    value: "network",
    child: (
      <TextLimiter>
        <Select.ItemText>Network</Select.ItemText>
      </TextLimiter>
    ),
  },
  {
    value: "heatmap",
    child: (
      <TextLimiter>
        <Select.ItemText>Heat Map</Select.ItemText>
      </TextLimiter>
    ),
  },
  {
    value: "equipment",
    child: (
      <TextLimiter>
        <Select.ItemText>Equipment</Select.ItemText>
      </TextLimiter>
    ),
  },
];
export const gridScopeOptions: SelectDropdownType<GridscopeOptionsType>[] = [
  {
    value: "all",
    child: (
      <div className="flex items-center gap-2">
        <div className="mr-2 inline-flex h-[10px] w-[10px] rounded-full border border-slate-400" />
        <TextLimiter>
          <Select.ItemText>All</Select.ItemText>
        </TextLimiter>
      </div>
    ),
  },
  {
    value: "online",
    child: (
      <div className="flex items-center gap-2">
        <div className="mr-2 inline-flex h-[10px] w-[10px] rounded-full bg-online" />
        <TextLimiter>
          <Select.ItemText>Online</Select.ItemText>{" "}
        </TextLimiter>
      </div>
    ),
  },
  {
    value: "spotty",
    child: (
      <div className="flex items-center gap-2">
        <div className="mr-2 inline-flex h-[10px] w-[10px] rounded-full bg-spotty" />
        <TextLimiter>
          <Select.ItemText>Spotty</Select.ItemText>{" "}
        </TextLimiter>
      </div>
    ),
  },
  {
    value: "offline",
    child: (
      <div className="flex min-w-0 items-center gap-2">
        <div className="mr-2 inline-flex h-[10px] w-[10px] shrink-0 rounded-full bg-offline" />
        <TextLimiter>
          <Select.ItemText>Offline</Select.ItemText>
        </TextLimiter>
      </div>
    ),
  },
];

export const networkOptions: SelectDropdownType<NetworkOptionsType>[] = [
  {
    value: "all",
    child: (
      <div className="flex items-center gap-2">
        <div className="mr-2 inline-flex h-[10px] w-[10px] rounded-full border border-slate-400" />
        <TextLimiter>
          <Select.ItemText>All</Select.ItemText>
        </TextLimiter>
      </div>
    ),
  },
  {
    value: "lora",
    child: (
      <div className="flex items-center gap-2">
        <div className="mr-2 inline-flex h-[10px] w-[10px] rounded-full bg-lora" />
        <TextLimiter>
          <Select.ItemText>Lora</Select.ItemText>{" "}
        </TextLimiter>
      </div>
    ),
  },
  {
    value: "cellular",
    child: (
      <div className="flex items-center gap-2">
        <div className="mr-2 inline-flex h-[10px] w-[10px] rounded-full bg-cellular" />
        <TextLimiter>
          <Select.ItemText>Cellular</Select.ItemText>{" "}
        </TextLimiter>
      </div>
    ),
  },
  {
    value: "unknown",
    child: (
      <div className="flex items-center gap-2">
        <div className="mr-2 inline-flex h-[10px] w-[10px] rounded-full bg-unknown" />
        <TextLimiter>
          <Select.ItemText>Unknown</Select.ItemText>{" "}
        </TextLimiter>
      </div>
    ),
  },
];

export const heatMapOptions: SelectDropdownType<HeatmapOptionsType>[] = [
  {
    value: "vibration",
    child: (
      <Select.ItemText>
        <div className="flex min-w-0 items-center gap-2 [&_path]:stroke-black">
          <VibrationIcon className="h-[15px] w-[15px] shrink-0" />
          <TextLimiter>Vibration</TextLimiter>
        </div>
      </Select.ItemText>
    ),
  },
  {
    value: "electrometer",
    child: (
      <Select.ItemText>
        <div className="flex min-w-0 items-center gap-2 [&_path]:stroke-black">
          <ElectrometerIcon className="shrink-0" />
          <TextLimiter>Electrometer</TextLimiter>
        </div>
      </Select.ItemText>
    ),
  },
];

// MINI options

export const MiniGridScopeOptions: SelectDropdownType<GridscopeOptionsType>[] =
  [
    {
      value: "all",
      child: (
        <div className="flex items-center justify-center gap-1">
          <div className="inline-flex h-[6px] w-[6px] rounded-full border border-slate-400 text-[9px]" />
          <TextLimiter>All</TextLimiter>
        </div>
      ),
    },
    {
      value: "online",
      child: (
        <div className="flex items-center justify-center gap-1">
          <div className="inline-flex h-[6px] w-[6px] rounded-full bg-online text-[9px]" />
          <TextLimiter>Online</TextLimiter>
        </div>
      ),
    },
    {
      value: "spotty",
      child: (
        <div className="flex items-center justify-center gap-1">
          <div className="inline-flex h-[6px] w-[6px] rounded-full bg-spotty text-[9px]" />
          <TextLimiter>Spotty</TextLimiter>
        </div>
      ),
    },
    {
      value: "offline",
      child: (
        <div className="flex items-center justify-center gap-1">
          <div className="inline-flex h-[6px] w-[6px] shrink-0 rounded-full bg-offline text-[9px]" />
          <TextLimiter>Offline</TextLimiter>
        </div>
      ),
    },
  ];

export const MiniHeatMapOptions: SelectDropdownType<HeatmapOptionsType>[] = [
  {
    value: "vibration",
    child: (
      <div className="flex min-w-0 items-center justify-center gap-1 text-[9px] [&_path]:stroke-black">
        <VibrationIcon className="h-[10px] w-[10px] shrink-0" />
        <TextLimiter>Vibration</TextLimiter>
      </div>
    ),
  },
  {
    value: "electrometer",
    child: (
      <div className="flex min-w-0 items-center justify-center gap-1 text-[9px]  [&_path]:stroke-black">
        <ElectrometerIcon className="h-[10px] w-[10px] shrink-0" />
        <TextLimiter>Electrometer</TextLimiter>
      </div>
    ),
  },
];

export const MiniNetworkOptions: SelectDropdownType<NetworkOptionsType>[] = [
  {
    value: "all",
    child: (
      <div className="flex items-center justify-center gap-1">
        <div className="inline-flex h-[6px] w-[6px] rounded-full border border-slate-400 text-[9px]" />
        <TextLimiter>All</TextLimiter>
      </div>
    ),
  },
  {
    value: "lora",
    child: (
      <div className="flex items-center justify-center gap-1">
        <div className="inline-flex  h-[6px] w-[6px]  rounded-full bg-lora" />
        <TextLimiter>Lora</TextLimiter>
      </div>
    ),
  },
  {
    value: "cellular",
    child: (
      <div className="flex items-center justify-center gap-1">
        <div className=" inline-flex  h-[6px] w-[6px] rounded-full bg-cellular" />
        <TextLimiter>Cellular</TextLimiter>
      </div>
    ),
  },
  {
    value: "unknown",
    child: (
      <div className="flex items-center justify-center gap-1">
        <div className=" inline-flex  h-[6px] w-[6px]  rounded-full bg-unknown" />
        <TextLimiter>Unknown</TextLimiter>
      </div>
    ),
  },
];

export const MiniLayerOptions: SelectDropdownType<LayerPickerOptionsType>[] = [
  {
    value: "gridscope",
    child: <TextLimiter>Gridscope</TextLimiter>,
  },

  {
    value: "network",
    child: <TextLimiter>Network</TextLimiter>,
  },
  {
    value: "heatmap",
    child: <TextLimiter>Heat Map</TextLimiter>,
  },
  {
    value: "equipment",
    child: <TextLimiter>Equipment</TextLimiter>,
  },
];
