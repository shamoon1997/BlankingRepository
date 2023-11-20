import {
  AlertsIcon,
  CollisionsIcon,
  ElectrometerDropIcon,
  PoleTiltIcon,
  VibrationIcon,
} from "@/assets";

type SelectDropdownType = {
  value: string;
  text: string | JSX.Element;
  icon?: JSX.Element;
};

export const poleStatusOptions: SelectDropdownType[] = [
  {
    value: "all",
    text: "All",
    icon: (
      <div className="mr-2 inline-flex h-[8px] w-[8px] rounded-full border border-slate-400" />
    ),
  },
  {
    value: "online",
    text: "Online",
    icon: (
      <div className="mr-2 inline-flex h-[8px] w-[8px] rounded-full bg-online" />
    ),
  },
  {
    value: "spotty",
    text: "Spotty",
    icon: (
      <div className="mr-2 inline-flex h-[8px] w-[8px] rounded-full bg-spotty" />
    ),
  },
  {
    value: "offline",
    text: "Offline",
    icon: (
      <div className="mr-2 inline-flex h-[8px] w-[8px] rounded-full bg-offline" />
    ),
  },
];

export const poleStatusOptions2: SelectDropdownType[] = [
  {
    value: "all",
    text: (
      <div className="flex items-center gap-2 [&_path]:stroke-black">
        <AlertsIcon />
        All
      </div>
    ),
  },
  {
    value: "vibration",
    text: (
      <div className="flex items-center gap-2 [&_path]:stroke-black">
        <VibrationIcon />
        Vibration
      </div>
    ),
  },
  {
    value: "electrometer-drop",
    text: (
      <div className="flex items-center gap-2 [&_path]:stroke-black">
        <ElectrometerDropIcon />
        Electrometer Drop
      </div>
    ),
  },
  {
    value: "pole-tilt",
    text: (
      <div className="flex items-center gap-2 [&_path]:stroke-black">
        <PoleTiltIcon />
        Pole Tilt
      </div>
    ),
  },
  {
    value: "collision",
    text: (
      <div className="flex items-center gap-2 [&_path]:stroke-black">
        <CollisionsIcon />
        Collision
      </div>
    ),
  },
];

export const poleStatusOptions3: SelectDropdownType[] = [
  { value: "gridscope", text: "Gridscope" },
  { value: "alert", text: "Alert" },
  { value: "incident", text: "Incident" },
  { value: "network", text: "Network" },
  { value: "heatmap", text: "Heatmap" },
  { value: "equipment", text: "Equipment" },
];
