import { useCalendarTimeZone } from "@/state";
import { CalendarUrlStateSchema } from "@/utils/validation-schemas";
import { endOfToday, getUnixTime, startOfToday } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";
import queryString from "query-string";
import { useSearchParams } from "react-router-dom";
import { endOfToday, getUnixTime, startOfToday } from "date-fns";
import { CalendarUrlStateSchema } from "@/utils/validation-schemas";
import { utcToZonedTime } from "date-fns-tz";
import { useCalendarTimeZone } from "@/state";

const useCalendarUrlState = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const timezone = useCalendarTimeZone();
  const calendarUrlState = queryString.parse(searchParams.toString());
  const validatedCalendarUrlState =
    CalendarUrlStateSchema.safeParse(calendarUrlState);

  if (!validatedCalendarUrlState.success) {
    // handle error then return
    return {
      setSearchParams,
      validatedCalendarUrlState: {
        from: getUnixTime(zonedTimeToUtc(startOfToday(), timezone)),
        to: getUnixTime(zonedTimeToUtc(endOfToday(), timezone)),
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
