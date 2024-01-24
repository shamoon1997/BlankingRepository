import React from "react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import {
  ZoomInIcon,
  ZoomOutIcon,
  MoveGraphIcon,
  ZoomSectionIcon,
} from "@/assets";
import {
  useDeviceDataControlActions,
  useDeviceDataControlState,
} from "@/state/device-data";

const graphControlsBtns = [
  { value: "zoomIn", icon: <ZoomInIcon /> },
  { value: "zoomOut", icon: <ZoomOutIcon /> },
  { value: "moveGraph", icon: <MoveGraphIcon /> },
  { value: "zoomSection", icon: <ZoomSectionIcon /> },
];

const DeviceDataGraphControls: React.FC = () => {
  const { graphControl } = useDeviceDataControlState();
  const { setGraphControl } = useDeviceDataControlActions();

  return (
    <ToggleGroup.Root
      className="inline-flex h-[30px] w-full justify-between rounded-sm "
      type="single"
      defaultValue={graphControl}
      onValueChange={(val) => setGraphControl(val)}
    >
      {graphControlsBtns.map((item) => {
        return (
          <ToggleGroup.Item
            key={item.value}
            value={item.value}
            className="grid w-full place-content-center border-[2px] bg-white p-[10px] text-base first:rounded-l last:rounded-r hover:bg-blue-100 focus:outline-none data-[state=on]:rounded-md data-[state=on]:border-[#5283ED] data-[state=on]:bg-[#DBE6FF] first:data-[state=on]:rounded-r-none
            last:data-[state=on]:rounded-l-none 
            "
          >
            <div className="h-[12px] w-[12px]">{item.icon}</div>
          </ToggleGroup.Item>
        );
      })}
    </ToggleGroup.Root>
  );
};

export default DeviceDataGraphControls;
