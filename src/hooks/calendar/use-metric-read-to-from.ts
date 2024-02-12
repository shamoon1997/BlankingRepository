import { useCalendarUrlState } from "@/hooks/calendar/use-calendar-url-state.tsx";
import { useCalendarTimeZone } from "@/state";
import { defaultDateDropdownOptions } from "@/utils/date";
import { endOfToday, getUnixTime, startOfToday } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";
import { useMemo } from "react";

export const useMetricReadToFrom = () => {
  const { validatedCalendarUrlState } = useCalendarUrlState();
  const timezone = useCalendarTimeZone();

  return useMemo(() => {
    let from;
    let to;

    if (typeof validatedCalendarUrlState.from === "number") {
      from = validatedCalendarUrlState.from;
    } else {
      const option = defaultDateDropdownOptions.find(
        (i) => i.type === validatedCalendarUrlState.from,
      );

      if (option) {
        const fromToDate = option.getDates();
        from = getUnixTime(fromToDate.from);
      } else {
        from = getUnixTime(zonedTimeToUtc(startOfToday(), timezone));
      }
    }

    if (typeof validatedCalendarUrlState.to === "number") {
      to = validatedCalendarUrlState.to;
    } else {
      // TODO: convert from to strings to their corresponding date objects
      const option = defaultDateDropdownOptions.find(
        (i) => i.type === validatedCalendarUrlState.from,
      );

      if (option) {
        const fromToDate = option.getDates();
        to = getUnixTime(fromToDate.to);
      } else {
        to = getUnixTime(zonedTimeToUtc(endOfToday(), timezone));
      }
    }

    return { from, to };
  }, [timezone, validatedCalendarUrlState.from, validatedCalendarUrlState.to]);
};
