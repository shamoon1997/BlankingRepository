import { format, sub } from "date-fns";

export const formatDate = (date: number | Date, dateFormat: string): string => {
  return format(date, dateFormat);
};

export const subtractFromCurrentDate = (amount: Duration) => {
  return sub(new Date(), amount);
};

export const DateFormatOptions = {
  standardTime: "MM/dd/yyyy hh:mm a",
  standardTimeWithTimezone: "MM/dd/yyyy hh:mm a zzz",
  timerTimeWithTimeZone: "dd/MM/yyyy hh:mm a zzz",
  dateTimeFormatForSever: "yyyy-MM-dd HH:mm:ss",
  fullMonthAndYear: "MMMM-yyyy",
  standardYearMonthDay: "yyyy-MM-dd",
  standardDateNoTime: "yyyy-MM-dd",
  standardTime24Hr: "yyyy-MM-dd HH:mm",
};
