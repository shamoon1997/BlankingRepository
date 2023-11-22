export const dateFormats = {
  weekMini: "EEEEE", // S, M, T, W .....
  ddmmyyyy: "dd/MM/yyyy", // Day / Month / Year
};

export const defaultDateDropdownOptions = [
  { title: "Last 30 minutes", duration: { minutes: 30 }, type: "last_30_mins" },
  { title: "Last hour", duration: { hours: 1 }, type: "last_hour" },
  { title: "Last 3 hours", duration: { hours: 3 }, type: "last_3_hours" },
  { title: "Last 6 hours", duration: { hours: 6 }, type: "last_6_hours" },
  { title: "Last 12 hours", duration: { hours: 12 }, type: "last_12_hours" },
  { title: "Today", duration: { hours: 24 }, type: "today" },
  { title: "Last 7 days", duration: { days: 7 }, type: "last_7_days" },
];
