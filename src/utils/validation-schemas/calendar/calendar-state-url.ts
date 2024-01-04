import { z } from "zod";

export const validStringValues = [
  "last-5m",
  "last-15m",
  "last-30m",
  "last-1hr",
  "last-3hrs",
  "last-6hrs",
  "last-12hrs",
  "last-24hrs",
] as const;

const from = z.enum(validStringValues).or(z.coerce.number().int().min(0));
const to = z.enum(["now"]).or(z.coerce.number().int().min(0));
export const CalendarUrlStateSchema = z.object({
  // https://github.com/colinhacks/zod/issues/2398
  from,
  to,
});

CalendarUrlStateSchema.refine(({ from, to }) => {
  if (typeof from === "number" && typeof to === "number") {
    return from <= to;
  }
}, "invalid range, from is greater than to");

export type ValidStringTimes = (typeof validStringValues)[number];
