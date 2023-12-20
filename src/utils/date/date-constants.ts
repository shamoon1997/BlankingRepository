import { sub } from "date-fns";

export const defaultDateDropdownOptions = [
  {
    title: "Last 5m",
    type: "last-5m",
    getDates: () => {
      return {
        from: sub(Date.now(), {
          minutes: 5,
        }),
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
        }),
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
        }),
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
        }),
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
        }),
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
        }),
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
        }),
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
        }),
        to: Date.now(),
      };
    },
    type: "last-24hrs",
  },
];
