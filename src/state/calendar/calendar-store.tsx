import { create } from "zustand";

type CalendarStoreType = {
  timeZone: string;
};

const useCalendarStore = create<CalendarStoreType>(() => {
  //   TODO: Add ability to change time zone right now client wants it to always be in America/Los_Angeles time zone
  return {
    timeZone: "America/Los_Angeles",
  };
});

export const useCalendarTimeZone = () => {
  return useCalendarStore((state) => state.timeZone);
};
