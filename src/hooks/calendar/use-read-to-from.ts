import {
  DateFormatOptions,
  defaultDateDropdownOptions,
  formatDate,
} from "@/utils/date";
import { useCalendarUrlState } from "@/hooks/calendar/use-calendar-url-state.tsx";
import { useMemo } from "react";

export const useReadToFrom = () => {
  const { validatedCalendarUrlState } = useCalendarUrlState();

  return useMemo(() => {
    let from;
    let to;

    if (
      typeof validatedCalendarUrlState.from === "string" &&
      typeof validatedCalendarUrlState.to === "string"
    ) {
      const option = defaultDateDropdownOptions.find(
        (i) => i.type === validatedCalendarUrlState.from,
      );
      if (option) {
        // already in utc see getDates function, it's ready for the server
        const fromToDate = option.getDates();
        from = formatDate(
          fromToDate.from,
          DateFormatOptions.dateTimeFormatForSever,
        );
        to = formatDate(
          fromToDate.to,
          DateFormatOptions.dateTimeFormatForSever,
        );
      }
    } else if (
      typeof validatedCalendarUrlState.from === "number" &&
      typeof validatedCalendarUrlState.to === "number"
    ) {
      //    already in utc in seconds we multiply by 1000 to get milliseconds since js uses milliseconds, it's ready for the server
      from = formatDate(
        validatedCalendarUrlState.from * 1000,
        DateFormatOptions.dateTimeFormatForSever,
      );
      to = formatDate(
        validatedCalendarUrlState.to * 1000,
        DateFormatOptions.dateTimeFormatForSever,
      );
    }

    return {
      from,
      to,
    };
  }, [validatedCalendarUrlState.from, validatedCalendarUrlState.to]);
};
