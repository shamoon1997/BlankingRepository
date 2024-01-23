import queryString from "query-string";
import { useSearchParams } from "react-router-dom";
import { endOfToday, getUnixTime, startOfToday } from "date-fns";
import { CalendarUrlStateSchema } from "@/utils/validation-schemas";
import { utcToZonedTime } from "date-fns-tz";
import { useCalendarTimeZone } from "@/state";

const useCalendarUrlState = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const calendarUrlState = queryString.parse(searchParams.toString());
  const validatedCalendarUrlState =
    CalendarUrlStateSchema.safeParse(calendarUrlState);
  const timeZone = useCalendarTimeZone();

  if (!validatedCalendarUrlState.success) {
    // handle error then return
    return {
      setSearchParams,
      validatedCalendarUrlState: {
        from: getUnixTime(utcToZonedTime(startOfToday(), timeZone)),
        to: getUnixTime(utcToZonedTime(endOfToday(), timeZone)),
      },
    };
  } else {
    return {
      setSearchParams,
      validatedCalendarUrlState: validatedCalendarUrlState.data,
    };
  }
};

export { useCalendarUrlState };
