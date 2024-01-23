import {
  DateFormatOptions,
  defaultDateDropdownOptions,
  formatDate,
} from "@/utils/date";
import { useCalendarUrlState } from "@/hooks/calendar/use-calendar-url-state.tsx";
import { useMemo } from "react";
import { useCalendarTimeZone } from "@/state";
import { fromAbsolute } from "@internationalized/date";

export const useReadFromTo = () => {
  const { validatedCalendarUrlState } = useCalendarUrlState();
  const timeZone = useCalendarTimeZone();

  return useMemo(() => {
    let from;
    let to;
    let fromInAriaFormat;
    let toInAriaFormat;

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

        fromInAriaFormat = fromAbsolute(fromToDate.from as number, timeZone);
        toInAriaFormat = fromAbsolute(fromToDate.to as number, timeZone);
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

      fromInAriaFormat = fromAbsolute(
        validatedCalendarUrlState.from * 1000,
        timeZone,
      );
      toInAriaFormat = fromAbsolute(
        validatedCalendarUrlState.to * 1000,
        timeZone,
      );
    }

    return {
      from,
      fromInAriaFormat,
      toInAriaFormat,
      to,
    };
  }, [timeZone, validatedCalendarUrlState.from, validatedCalendarUrlState.to]);
};
