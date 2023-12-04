export const dateFormats = {
  weekMini: "EEEEE", // S, M, T, W .....
  ddmmyyyy: "dd/MM/yyyy", // Day / Month / Year
};

export const defaultDateDropdownOptions = [
  { title: "Last 5m", duration: { minutes: 5 }, type: "last_5_min" },
  { title: "Last 25m", duration: { minutes: 25 }, type: "last_25_min" },
  { title: "Last 10m", duration: { minutes: 10 }, type: "last_10_min" },
  { title: "Last 30m", duration: { minutes: 30 }, type: "last_30_min" },
  { title: "Last 15m", duration: { minutes: 15 }, type: "last_15_min" },
  { title: "Last 20m", duration: { minutes: 20 }, type: "last_20_min" },
  { title: "Last 40m", duration: { minutes: 40 }, type: "last_40_min" },
];
