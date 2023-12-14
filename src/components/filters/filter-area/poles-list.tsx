import * as ScrollArea from "@radix-ui/react-scroll-area";
import { PoleItem } from "./pole-item";
import { useGetGridScopeLayer } from "@/api/hooks/maps/use-get-gridscope-layer";
import { Fragment, useContext } from "react";
import { MapBboxContext } from "@/state/providers/map/bbox-provider";

export const PolesList = () => {
  const { bbox } = useContext(MapBboxContext);
  const { data, isLoading } = useGetGridScopeLayer(bbox);

  return (
    <ScrollArea.Root className="h-full w-full overflow-hidden">
      <ScrollArea.Viewport className="h-full w-full pb-3">
        {isLoading && (
          <Fragment>
            {[...Array(100)].map((_, i) => {
              return (
                <div
                  className="flex h-10 cursor-pointer items-center justify-between pl-4 pr-4"
                  key={i}
                >
                  <p className="h-[16px] w-[71px] animate-pulse rounded-md bg-[#EEEEEE]" />

                  <div className="h-[25px] w-[66px] animate-pulse rounded-md bg-[#EEEEEE]" />
                </div>
              );
            })}
          </Fragment>
        )}

        {data?.data?.devices?.map((device) => {
          const { hardware_id } = device;

          return <PoleItem key={hardware_id} device={device} />;
        })}
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar className="mr-1 w-1 pb-3" orientation="vertical">
        <ScrollArea.Thumb className="rounded bg-[#1616164D]" />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
};
