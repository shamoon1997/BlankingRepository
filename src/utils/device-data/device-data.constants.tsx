import * as Select from "@radix-ui/react-select";

export const deviceMetricsKeys = [
  {
    key: "acoustic_max",
    title: "Acoustic Max",
  },
  {
    key: "acoustic_rms",
    title: "Acoustic RMS",
  },
  {
    key: "mean_electrometer",
    title: "Mean Electrometer",
  },
  {
    key: "median_electrometer_goertzel",
    title: "Median Electrometer Goertzel",
  },
  {
    key: "minimum_electrometer_goertzel_purity",
    title: "Minimum Electrometer Goertzel Purity",
  },
  {
    key: "maximum_electrometer_goertzel_delta",
    title: "Minimum Electrometer Goertzel Delta",
  },
  {
    key: "electrometer_rms",
    title: "electrometer RMS",
  },
  {
    key: "voltage_gradient",
    title: "Voltage Gradient",
  },
  { key: "band_ratio", title: "Band Ratio" },
  {
    key: "low_frequency_buffer_sum",
    title: "Low Frequency Buffer Sum",
  },
  {
    key: "maximum_absolute_vibration",
    title: "Maximum Absolute Vibration",
  },
  {
    key: "vibration_max_rms",
    title: "Vibration Max RMS",
  },
  {
    key: "vibration_mean",
    title: "Vibration Mean",
  },
];

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
