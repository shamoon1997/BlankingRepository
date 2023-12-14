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
  // {
  //   value: "heatmap",
  //   child: (
  //     <TextLimiter>
  //       <Select.ItemText>Heat Map</Select.ItemText>
  //     </TextLimiter>
  //   ),
  // },
  // {
  //   value: "equipment",
  //   child: (
  //     <TextLimiter>
  //       <Select.ItemText>Equipment</Select.ItemText>
  //     </TextLimiter>
  //   ),
  // },
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

// TODO: add back when alerts layer is more defined
// export const heatMapOptions: SelectDropdownType<HeatmapOptionsType>[] = [
//     {
//         value: "vibration",
//         child: (
//             <Select.ItemText>
//                 <div className="flex min-w-0 items-center gap-2 [&_path]:stroke-black">
//                     <AlertsIcon className="h-[15px] w-[15px] shrink-0" />
//                     <TextLimiter>All</TextLimiter>
//                 </div>
//             </Select.ItemText>
//         ),
//     },
//     {
//         value: "electrometer",
//         child: (
//             <Select.ItemText>
//                 <div className="flex min-w-0 items-center gap-2 [&_path]:stroke-black">
//                     <VibrationIcon className="shrink-0" />
//                     <TextLimiter>Vibration</TextLimiter>
//                 </div>
//             </Select.ItemText>
//         ),
//     },
//     {
//         value: "electrometer-drop",
//         child: (
//             <Select.ItemText>
//                 <div className="flex  min-w-0 items-center gap-2 [&_path]:stroke-black">
//                     <ElectrometerDropIcon className="shrink-0" />
//                     <TextLimiter>Electrometer Drop</TextLimiter>
//                 </div>
//             </Select.ItemText>
//         ),
//     },
//     {
//         value: "pole-tilt",
//         child: (
//             <Select.ItemText>
//                 <div className="flex min-w-0 items-center gap-2 [&_path]:stroke-black">
//                     <PoleTiltIcon className="shrink-0" />
//                     <TextLimiter> Pole Tilt</TextLimiter>
//                 </div>
//             </Select.ItemText>
//         ),
//     },
//     {
//         value: "collision",
//         child: (
//             <Select.ItemText>
//                 <div className="flex min-w-0 items-center gap-2 [&_path]:stroke-black">
//                     <CollisionsIcon className="shrink-0" />
//                     <TextLimiter> Collision</TextLimiter>
//                 </div>
//             </Select.ItemText>
//         ),
//     },
// ];

//
// import {
//     AlertsIcon,
//     CollisionsIcon,
//     ElectrometerDropIcon,
//     PoleTiltIcon,
//     VibrationIcon,
// } from "@/assets";
//
// type SelectDropdownType = {
//     value: string;
//     text: string | JSX.Element;
//     icon?: JSX.Element;
// };
//

//
// export const polePropertyOptions: SelectDropdownType[] = [
//     {
//         value: "all",
//         text: (
//             <div className="flex items-center gap-2 [&_path]:stroke-black">
//                 <AlertsIcon />
//                 All
//             </div>
//         ),
//     },
//     {
//         value: "vibration",
//         text: (
//             <div className="flex items-center gap-2 [&_path]:stroke-black">
//                 <VibrationIcon />
//                 Vibration
//             </div>
//         ),
//     },
//     {
//         value: "electrometer-drop",
//         text: (
//             <div className="flex items-center gap-2 [&_path]:stroke-black">
//                 <ElectrometerDropIcon />
//                 Electrometer Drop
//             </div>
//         ),
//     },
//     {
//         value: "pole-tilt",
//         text: (
//             <div className="flex items-center gap-2 [&_path]:stroke-black">
//                 <PoleTiltIcon />
//                 Pole Tilt
//             </div>
//         ),
//     },
//     {
//         value: "collision",
//         text: (
//             <div className="flex items-center gap-2 [&_path]:stroke-black">
//                 <CollisionsIcon />
//                 Collision
//             </div>
//         ),
//     },
// ];
//
