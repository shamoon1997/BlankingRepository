import { MapToolTipContainer } from "../map-tooltip";
import { StatusIcon, ElectrometerIcon, MapsIcon } from "@/assets/pole-hover";
import { Button } from "@/components/common";

function MapHoverMenu() {
  return (
    <MapToolTipContainer>
      <div className="flex flex-col">
        <div className="flex flex-col gap-2.5 border-b border-solid border-[#d9d9d9] px-2 py-2.5">
          <div className="flex flex-grow items-center justify-between gap-2">
            <div className="flex items-center gap-[7px]">
              <MapsIcon className="mt-[-1px] h-[13px] w-[9px] border-l-fuchsia-600" />
              <div className="font-mont text-[10px] font-normal leading-normal text-black">
                1533. GS526
              </div>
            </div>
            <div className="flex items-center gap-1">
              <div className="[&_svg]:h-2.5 [&_svg]:w-2.5">
                <StatusIcon />
              </div>
              <div className="font-mont text-[8px] font-normal capitalize leading-normal text-black">
                online
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex gap-[5px]">
                <div className="[&_svg]:h-3.5 [&_svg]:w-3.5">
                  <ElectrometerIcon />
                </div>
                <div className="font-mont text-[10px] font-semibold leading-normal text-[#161616]">
                  Electrometer Drop
                </div>
              </div>
              <div className="font-mont text-[8px] font-normal leading-normal tracking-[-0.4px] text-[#bababa]">
                19 min.ago
              </div>
            </div>

            <div className="flex items-center justify-between gap-2">
              <div className="flex gap-[5px]">
                <div className="[&_svg]:h-3.5 [&_svg]:w-3.5">
                  <ElectrometerIcon />
                </div>
                <div className="font-mont text-[10px] font-semibold leading-normal text-[#161616]">
                  Electrometer Drop
                </div>
              </div>
              <div className="font-mont text-[8px] font-normal leading-normal tracking-[-0.4px] text-[#bababa]">
                19 min.ago
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2.5 border-b border-solid border-[#d9d9d9] px-2 py-2.5">
          <div className="flex flex-grow items-center justify-between gap-2">
            <div className="flex items-center gap-[7px]">
              <MapsIcon className="mt-[-1px] h-[13px] w-[9px] border-l-fuchsia-600" />
              <div className="font-mont text-[10px] font-normal leading-normal text-black">
                1537. GS527
              </div>
            </div>
            <div className="flex items-center gap-1">
              <div className="[&_svg]:h-2.5 [&_svg]:w-2.5">
                <StatusIcon />
              </div>
              <div className="font-mont text-[8px] font-normal capitalize leading-normal text-black">
                online
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex gap-[5px]">
                <div className="[&_svg]:h-3.5 [&_svg]:w-3.5">
                  <ElectrometerIcon />
                </div>
                <div className="font-mont text-[10px] font-semibold leading-normal text-[#161616]">
                  Electrometer Drop
                </div>
              </div>
              <div className="font-mont text-[8px] font-normal leading-normal tracking-[-0.4px] text-[#bababa]">
                24 min.ago
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2.5 border-b border-solid border-[#d9d9d9] px-2 py-2.5">
          <div className="flex flex-grow items-center justify-between gap-2">
            <div className="flex items-center gap-[7px]">
              <MapsIcon className="mt-[-1px] h-[13px] w-[9px] border-l-fuchsia-600" />
              <div className="font-mont text-[10px] font-normal leading-normal text-black">
                1538. GS527
              </div>
            </div>
            <div className="flex items-center gap-1">
              <div className="[&_svg]:h-2.5 [&_svg]:w-2.5">
                <StatusIcon />
              </div>
              <div className="font-mont text-[8px] font-normal capitalize leading-normal text-black">
                online
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex gap-[5px]">
                <div className="[&_svg]:h-3.5 [&_svg]:w-3.5">
                  <ElectrometerIcon />
                </div>
                <div className="font-mont text-[10px] font-semibold leading-normal text-[#161616]">
                  Electrometer Drop
                </div>
              </div>
              <div className="font-mont text-[8px] font-normal leading-normal tracking-[-0.4px] text-[#bababa]">
                24 min.ago
              </div>
            </div>
          </div>
        </div>

        <div className="flex px-2 py-3">
          <Button
            type="button"
            className="min-h-[20px] w-full rounded-[5px] border-0 bg-[#ff176b] px-2.5 py-1 font-mont text-[8px] font-semibold leading-normal tracking-[-0.4px] text-white shadow-sm transition-all hover:bg-[#db185f] focus:bg-[#db185f] active:bg-[#db185f]"
            text="Pole View"
          />
        </div>
      </div>
    </MapToolTipContainer>
  );
}

export default MapHoverMenu;
