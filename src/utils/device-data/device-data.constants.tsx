import * as Select from "@radix-ui/react-select";

export const metricsDataDevicesOptions = [
  {
    value: "map-view",
    child: (
      <Select.ItemText>
        <div>Map View (3)</div>
      </Select.ItemText>
    ),
  },
  {
    value: "pole-view",
    child: (
      <Select.ItemText>
        <div>Pole View (3)</div>
      </Select.ItemText>
    ),
  },
  {
    value: "graph-view",
    child: (
      <Select.ItemText>
        <div>Graph View (0)</div>
      </Select.ItemText>
    ),
  },
];
