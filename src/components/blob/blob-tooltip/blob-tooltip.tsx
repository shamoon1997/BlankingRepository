import * as Tooltip from "@radix-ui/react-tooltip";
import { BlobToolTipIcon } from "@/assets/misc";
import { useState } from "react";

export const BlobToolTip = () => {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  /* Margin left and Margin top has been given for testing better view */
  return (
    <div className="ml-10 mt-20">
      <Tooltip.Provider>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <button
              className={`flex h-[35px] w-[170px] flex-shrink-0 items-center gap-x-[5px] rounded-[4px] ${
                buttonDisabled ? "bg-[#EDEDED]" : "bg-[#3B3C4F]"
              }   p-4`}
              onClick={() =>
                setButtonDisabled((buttonDisabled) => !buttonDisabled)
              }
            >
              <div
                className={`${
                  buttonDisabled
                    ? "[&_path]:fill-[#C2C2C2]"
                    : "[&_path]:fill-[#FFFFFF]"
                }`}
              >
                <BlobToolTipIcon />
              </div>
              <div
                className={`text-center font-mont text-xs  uppercase leading-[112.5%] ${
                  buttonDisabled
                    ? "font-normal text-[#C2C2C2]"
                    : "font-semibold text-white"
                } `}
              >
                REQUEST HIGH-RES
              </div>
            </button>
          </Tooltip.Trigger>
          <Tooltip.Content
            side="top"
            className="data-[state=delayed-open]:animate-slideDownAndFade text-violet11 select-none rounded-[4px] bg-[#3B3C4F] px-[15px] py-[10px] font-mont text-[8px] font-semibold tracking-[0.4px] text-white shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]"
            sideOffset={5}
          >
            Exceed Max Selection Range
            <Tooltip.Arrow className="fill-[#3B3C4F]" />
          </Tooltip.Content>
        </Tooltip.Root>
      </Tooltip.Provider>
    </div>
  );
};
