import { format } from "date-fns";

export const formateDate = (
  date: number | Date,
  dateFormat: string,
): string => {
  return format(date, dateFormat);
};
