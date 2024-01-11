import { defaultDateDropdownOptions, formatDate } from "@/utils/date";
import { useCalendarUrlState } from "@/hooks/calendar/use-calendar-url-state.tsx";
import { useMemo } from "react";

export const useReadToFrom = () => {
  const { validatedCalendarUrlState } = useCalendarUrlState();

  return useMemo(() => {
    // 24 time start of today to end of today in unix time
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
        const fromToDate = option.getDates();
        from = formatDate(fromToDate.from, "yyyy-MM-dd HH:mm:ss");
        to = formatDate(fromToDate.to, "yyyy-MM-dd HH:mm:ss");
      }
    } else if (
      typeof validatedCalendarUrlState.from === "number" &&
      typeof validatedCalendarUrlState.to === "number"
    ) {
      from = formatDate(
        validatedCalendarUrlState.from * 1000,
        "yyyy-MM-dd HH:mm:ss",
      );
      to = formatDate(
        validatedCalendarUrlState.to * 1000,
        "yyyy-MM-dd HH:mm:ss",
      );
    }

    return {
      from,
      to,
    };
  }, [validatedCalendarUrlState.from, validatedCalendarUrlState.to]);
};
