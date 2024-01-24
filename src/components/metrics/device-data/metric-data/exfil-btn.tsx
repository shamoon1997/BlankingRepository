import { ExfilIcon, NodesIcon, TimeIcon } from "@/assets";
import { useMetricDataState } from "@/state/device-data/metric-data-controls.store";
import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

type Props = React.ComponentPropsWithoutRef<"button"> & {
  disabled?: boolean;
};

const ExfilBlobBtn: React.FC<Props> = ({ disabled }) => {
  const metricDataState = useMetricDataState();

  return (
    <>
      <DropdownMenu.Root modal={false}>
        <DropdownMenu.Trigger
          disabled={disabled}
          className="place-content-centerz grid h-[32px] w-[130px] rounded-sm bg-sidebar text-[8px] disabled:bg-[#EDEDED]"
        >
          <div className="flex h-full w-full items-center justify-center gap-[5px]">
            <span
              className={
                disabled ? "[&_path]:!fill-sidebar" : "[&_path]:!fill-white"
              }
            >
              <ExfilIcon />
            </span>
            <p className={disabled ? "text-sidebar" : "text-white"}>
              Exfil Per-Blob
            </p>
          </div>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content
          sideOffset={12}
          align="end"
          sticky="partial"
          className="min-w-[205px] rounded-md border-[0.5px] border-sidebar/80 bg-white text-sidebar"
        >
          <div className="flex items-center gap-[5px] px-[15px] pb-[15px] pt-[12px] text-[12px] font-semibold">
            <span>
              <ExfilIcon />
            </span>
            <h1>Exfil Per-blob</h1>
          </div>

          <div className="border-b-[0.5px] border-default" />

          <div className="px-[14px] py-[15px]">
            <p className="mb-[5px] text-[10px]">Exfil Detail</p>

            <div className="mb-[9px]">
              {metricDataState.readyForExfil.map((_, i) => {
                const bgColor = _.assignedColor;
                return (
                  <div
                    className="mb-[3px] flex h-[25px] w-[177px] justify-between rounded-md"
                    key={`exfil-${i}`}
                  >
                    <div
                      className={`grid w-[25px] place-content-center rounded-l-md bg-[${bgColor}] [&_path]:!fill-white`}
                    >
                      <ExfilIcon />
                    </div>
                    <div className="flex w-full items-center gap-[13px] rounded-r-md border-[0.5px] border-l-0 border-default px-[8px] text-[8px]">
                      <p>GS126 • 4026</p>
                      <div className="flex gap-[3px] [&_path]:fill-sidebar">
                        <TimeIcon />
                        <p>11:55</p>
                      </div>
                      <div className="flex gap-[3px] [&_path]:fill-sidebar">
                        <NodesIcon />
                        <p>1699</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => console.log(metricDataState.readyForExfil)}
              className="h-[32px] w-full rounded-md bg-sidebar text-[8px] uppercase text-white"
            >
              Confirm Per-Blob Request
            </button>
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </>
  );
};

export default ExfilBlobBtn;
