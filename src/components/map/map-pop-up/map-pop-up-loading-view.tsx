import { CloseIcon, MinimizeIcon } from "@/assets/misc";
import { MapsIcon } from "@/assets/pole-view";
import * as Tabs from "@radix-ui/react-tabs";

type MapPopUpLoadingViewProps = {
  handleMinimize: () => void;
  handleClose: () => void;
  tabs: string[];
};
export const MapPopUpLoadingView = ({
  handleMinimize,
  handleClose,
  tabs,
}: MapPopUpLoadingViewProps) => {
  return (
    <div className="flex h-full w-[275px] flex-col gap-0 rounded bg-white shadow-pole-view">
      <div className="relative flex h-[214px] shrink-0 rounded">
        <div className="absolute right-1 top-1 flex items-center justify-center gap-2 hover:cursor-pointer">
          <MinimizeIcon
            className="h-[15px] w-[15px] shrink-0"
            onClick={() => handleMinimize()}
          />
          <CloseIcon
            className="h-[16px] w-[16px]  shrink-0"
            onClick={() => handleClose()}
          />
        </div>
        <div className="h-full w-full shrink-0  rounded-tl-sm rounded-tr-sm bg-[#EEEEEE] object-cover" />
      </div>
      <div className="h-full overflow-y-auto text-transparent">
        <div className="flex flex-col items-start gap-2.5 px-5 pb-2.5 pt-3.5">
          <div className="flex w-full justify-between">
            <div className="flex items-center gap-2">
              <div className="animate-pulse rounded bg-[#EEEEEE]  font-mont text-base font-semibold leading-normal ">
                Pole
              </div>
              <div className="animate-pulse rounded bg-[#EEEEEE]  font-mont text-base  font-normal leading-normal">
                274293258
              </div>
              <span>•</span>
              <div className="animate-pulse rounded bg-[#EEEEEE] font-mont text-base  font-normal leading-normal">
                GS1250
              </div>
            </div>

            <div className="mt-[-5px] flex items-center justify-center">
              <MapsIcon className="text-[#EEEEEE]" />
            </div>
          </div>

          <div className="inline-flex items-center gap-[7px]">
            <div
              className={
                "h-2.5 w-2.5 shrink-0 animate-pulse rounded-full bg-[#EEEEEE] "
              }
            />
            <div className="animate-pulse rounded bg-[#EEEEEE] font-mont text-[12px]  font-normal leading-normal tracking-[-0.5px] ">
              Offline
            </div>
          </div>
        </div>
        <div className="mx-auto mb-8 w-full">
          <Tabs.Root defaultValue="Overview">
            <Tabs.List className="flex gap-3.5 overflow-x-auto border-b border-solid border-[#d9d9d9] px-6">
              {tabs.map((tab) => {
                return (
                  <Tabs.Trigger
                    disabled
                    key={tab}
                    value={tab}
                    className="overflow-hidden whitespace-nowrap border-b border-solid border-transparent py-[7px] font-mont text-[11px] font-normal leading-[100%] data-[state=active]:border-[#EEEEEE]"
                  >
                    <span className="animate-pulse bg-[#EEEEEE]">{tab}</span>
                  </Tabs.Trigger>
                );
              })}
            </Tabs.List>

            <Tabs.Content value="Overview">
              <div className="border-b border-solid border-[#d9d9d9] p-5 ">
                <div className="grid grid-cols-2 gap-x-1 gap-y-[10px]">
                  <div className="animate-pulse rounded bg-[#EEEEEE] font-mont font-semibold leading-normal  ">
                    Pole
                  </div>
                  <div className="animate-pulse rounded bg-[#EEEEEE] text-left font-mont font-normal leading-normal  ">
                    274293258
                  </div>

                  <div className=" animate-pulse rounded bg-[#EEEEEE] font-mont font-semibold leading-normal ">
                    Serial{" "}
                  </div>
                  <div className="animate-pulse rounded bg-[#EEEEEE] text-left font-mont font-normal leading-normal">
                    GS00001250
                  </div>

                  <div className=" animate-pulse rounded bg-[#EEEEEE] font-mont font-semibold leading-normal ">
                    Deployment
                  </div>
                  <div className="animate-pulse rounded bg-[#EEEEEE] text-left font-mont font-normal leading-normal ">
                    BWP
                  </div>

                  <div className=" animate-pulse rounded bg-[#EEEEEE] font-mont font-semibold leading-normal ">
                    Network
                  </div>
                  <div className="animate-pulse rounded bg-[#EEEEEE] text-left font-mont font-normal leading-normal ">
                    Lora
                  </div>

                  <div className=" animate-pulse rounded bg-[#EEEEEE] font-mont font-semibold leading-normal ">
                    Last seen
                  </div>
                  <div className="animate-pulse rounded bg-[#EEEEEE] text-left font-mont font-normal leading-normal ">
                    M/dd/yyyy h:mm:ss a
                  </div>
                </div>
              </div>
              <div className="border-b border-solid border-[#d9d9d9] p-5">
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center gap-[5px]">
                    <div className="flex h-3 w-3 animate-pulse items-center justify-center bg-[#EEEEEE]"></div>
                    <div className="animate-pulse rounded bg-[#EEEEEE] font-mont font-normal capitalize leading-normal  underline hover:cursor-pointer">
                      Open in Google Map
                    </div>
                  </div>

                  <div className="flex items-center gap-[5px]">
                    <div className="flex h-3 w-3 animate-pulse items-center justify-center bg-[#EEEEEE]"></div>
                    <div className="animate-pulse rounded bg-[#EEEEEE] font-mont font-normal leading-normal ">
                      Insulators, Transformers, Conductors
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-b border-solid border-[#d9d9d9] p-5">
                <div className="flex flex-col gap-[3px]">
                  <div className="animate-pulse rounded bg-[#EEEEEE] font-mont font-semibold leading-normal ">
                    Vegetation
                  </div>
                  <div className="animate-pulse rounded bg-[#EEEEEE] font-mont font-normal leading-normal ">
                    No notes found.
                  </div>
                </div>
              </div>

              <div className=" p-5">
                <div className="flex flex-col gap-[3px]">
                  <div className="animate-pulse rounded bg-[#EEEEEE] font-mont font-semibold leading-normal">
                    Installation Notes
                  </div>
                  <div className="bgx-[#EEEEEE] animate-pulse rounded font-mont font-normal leading-normal ">
                    No notes found.
                  </div>
                </div>
              </div>
            </Tabs.Content>
          </Tabs.Root>
        </div>
      </div>
    </div>
  );
};
