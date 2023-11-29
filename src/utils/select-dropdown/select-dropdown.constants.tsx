import {
  AlertsIcon,
  CollisionsIcon,
  ElectrometerDropIcon,
  PoleTiltIcon,
  VibrationIcon,
} from "@/assets";
import { TextLimiter } from "@/components/common";
import * as Select from "@radix-ui/react-select";

type SelectDropdownType = {
  value: string;
  child: string | JSX.Element;
};
/*
  Add whate ever you want to show in the trigger inside 
  <Select.ItemText>your text</Select.ItemText>
  use TextLimiter to truncate text whenever it exceeds the width of its parent
  min-w-0 is needed to truncate text do not remove it
*/
export const poleConnectionStatusOptions: SelectDropdownType[] = [
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

export const polePropertyOptions: SelectDropdownType[] = [
  {
    value: "all",
    child: (
      <Select.ItemText>
        <div className="flex min-w-0 items-center gap-2 [&_path]:stroke-black">
          <AlertsIcon className="h-[15px] w-[15px] shrink-0" />
          <TextLimiter>All</TextLimiter>
        </div>
      </Select.ItemText>
    ),
  },
  {
    value: "vibration",
    child: (
      <Select.ItemText>
        <div className="flex min-w-0 items-center gap-2 [&_path]:stroke-black">
          <VibrationIcon className="shrink-0" />
          <TextLimiter>Vibration</TextLimiter>
        </div>
      </Select.ItemText>
    ),
  },
  {
    value: "electrometer-drop",
    child: (
      <Select.ItemText>
        <div className="flex  min-w-0 items-center gap-2 [&_path]:stroke-black">
          <ElectrometerDropIcon className="shrink-0" />
          <TextLimiter>Electrometer Drop</TextLimiter>
        </div>
      </Select.ItemText>
    ),
  },
  {
    value: "pole-tilt",
    child: (
      <Select.ItemText>
        <div className="flex min-w-0 items-center gap-2 [&_path]:stroke-black">
          <PoleTiltIcon className="shrink-0" />
          <TextLimiter> Pole Tilt</TextLimiter>
        </div>
      </Select.ItemText>
    ),
  },
  {
    value: "collision",
    child: (
      <Select.ItemText>
        <div className="flex min-w-0 items-center gap-2 [&_path]:stroke-black">
          <CollisionsIcon className="shrink-0" />
          <TextLimiter> Collision</TextLimiter>
        </div>
      </Select.ItemText>
    ),
  },
];

export const gridscopeOptions: SelectDropdownType[] = [
  {
    value: "gridscope",
    child: (
      <TextLimiter>
        <Select.ItemText>Gridscope</Select.ItemText>
      </TextLimiter>
    ),
  },
  {
    value: "alert",
    child: (
      <TextLimiter>
        <Select.ItemText>Alert</Select.ItemText>
      </TextLimiter>
    ),
  },
  {
    value: "incident",
    child: (
      <TextLimiter>
        <Select.ItemText>Incident</Select.ItemText>
      </TextLimiter>
    ),
  },
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
