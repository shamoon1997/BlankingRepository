import React from "react";

interface FallBackPageProps {
  error: string;
}

import * as Tooltip from "@radix-ui/react-tooltip";

export const FallBackPage: React.FC<FallBackPageProps> = ({ error }) => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <div className="mb-6 font-mont text-2xl font-bold">
        Sorry Application Error!
      </div>

      <div className="text-gray pb-8 text-base">
        An Error occurred inside the application. Details are below{" "}
      </div>

      <Tooltip.Provider>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <div
              onClick={() => {
                navigator.clipboard
                  .writeText(error.toString())
                  .catch(() => console.log("cant copy text to clipboard"));
              }}
              className="max-h-[200px] max-w-[500px] cursor-pointer overflow-y-scroll rounded bg-gray-100 p-2 font-mono"
            >
              {error.toString()}
            </div>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              className={
                "rounded border-[0.5px] border-default bg-white p-2 shadow-tooltip"
              }
              align={"center"}
              side={"top"}
              sideOffset={5}
            >
              Click to copy error to clipboard
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    </div>
  );
};
