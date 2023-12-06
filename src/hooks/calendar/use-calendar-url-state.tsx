import { z } from "zod";
import queryString from "query-string";
import { useSearchParams } from "react-router-dom";
import { endOfToday, getUnixTime, startOfToday } from "date-fns";
const validStringValues = [
  "last-5m",
  "last-15m",
  "last-30m",
  "last-1hr",
  "last-3hrs",
  "last-6hrs",
  "last-12hrs",
  "last-24hrs",
] as const;
const CalendarUrlStateSchema = z.object({
  from: z.enum(validStringValues).or(z.coerce.number().int().min(0)),
  to: z.enum(["now"]).or(z.coerce.number().int().min(0)),
});

CalendarUrlStateSchema.refine(({ from, to }) => {
  if (typeof from === "number" && typeof to === "number") {
    return from < to;
  }
}, "invalid range, from is greater than to");

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
