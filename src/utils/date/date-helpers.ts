import { format, sub } from "date-fns";

export const formatDate = (date: number | Date, dateFormat: string): string => {
  return format(date, dateFormat);
};

export const subtractFromCurrentDate = (amount: Duration) => {
  return sub(new Date(), amount);
};
