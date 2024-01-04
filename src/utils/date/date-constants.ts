import { sub } from "date-fns";
import { ValidStringTimes } from "@/utils/validation-schemas";

type DateDropDownOptions = {
  title: string;
  /*
    When you use the typeof operator with an array,
    you get the type of the array itself.
    If you want to represent the union type of all the values in the array,
    you use the [number] index type to index into the array.
   */
  type: ValidStringTimes;
  getDates: () => { from: number | Date; to: number | Date };
};
export const defaultDateDropdownOptions: DateDropDownOptions[] = [
  {
    title: "Last 5m",
    type: "last-5m",
    // function to generate the actual date we will use in the frontend
    getDates: () => {
      return {
        from: sub(Date.now(), {
          minutes: 5,
        }).getTime(),
        to: Date.now(),
      };
    },
  },
  {
    title: "Last 15m",
    getDates: () => {
      return {
        from: sub(Date.now(), {
          minutes: 15,
        }).getTime(),
        to: Date.now(),
      };
    },
    type: "last-15m",
  },
  {
    title: "Last 30m",
    getDates: () => {
      return {
        from: sub(Date.now(), {
          minutes: 30,
        }).getTime(),
        to: Date.now(),
      };
    },
    type: "last-30m",
  },
  {
    title: "Last 1hr",
    getDates: () => {
      return {
        from: sub(Date.now(), {
          hours: 1,
        }).getTime(),
        to: Date.now(),
      };
    },
    type: "last-1hr",
  },
  {
    title: "Last 3hrs",
    getDates: () => {
      return {
        from: sub(Date.now(), {
          hours: 3,
        }).getTime(),
        to: Date.now(),
      };
    },
    type: "last-3hrs",
  },
  {
    title: "Last 6hrs",
    getDates: () => {
      return {
        from: sub(Date.now(), {
          hours: 6,
        }).getTime(),
        to: Date.now(),
      };
    },
    type: "last-6hrs",
  },
  {
    title: "Last 12hrs",
    getDates: () => {
      return {
        from: sub(Date.now(), {
          hours: 12,
        }).getTime(),
        to: Date.now(),
      };
    },
    type: "last-12hrs",
  },
  {
    title: "Last 24hrs",
    getDates: () => {
      return {
        from: sub(Date.now(), {
          hours: 24,
        }).getTime(),
        to: Date.now(),
      };
    },
    type: "last-24hrs",
  },
];
