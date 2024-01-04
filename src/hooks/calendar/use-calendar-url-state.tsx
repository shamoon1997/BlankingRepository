import queryString from "query-string";
import { useSearchParams } from "react-router-dom";
import { endOfToday, getUnixTime, startOfToday } from "date-fns";
import { CalendarUrlStateSchema } from "@/utils/validation-schemas";

const useCalendarUrlState = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const calendarUrlState = queryString.parse(searchParams.toString());
  const validatedCalendarUrlState =
    CalendarUrlStateSchema.safeParse(calendarUrlState);

  if (!validatedCalendarUrlState.success) {
    // handle error then return
    return {
      setSearchParams,
      validatedCalendarUrlState: {
        from: getUnixTime(startOfToday()),
        to: getUnixTime(endOfToday()),
      },
    };
  } else {
    return {
      setSearchParams,
      validatedCalendarUrlState: validatedCalendarUrlState.data,
    };
  }
};

export { useCalendarUrlState, CalendarUrlStateSchema };
