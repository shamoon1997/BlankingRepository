import { format } from "date-fns";
import { useEffect, useState } from "react";

export const Time = () => {
  const [time, setTime] = useState<number>(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => {
      setTime(Date.now());
      //  update every 1 minute
    }, 1000 * 60);

    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <p className="mb-[15px] ml-[11px] mr-[11px] mt-[13px] text-[11px]">
      <span className="text-[#16161680]">Current Time: </span>
      <span>{format(time, "dd/MM/yyyy hh:mm a")}</span>
    </p>
  );
};
