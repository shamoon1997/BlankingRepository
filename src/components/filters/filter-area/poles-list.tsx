import * as ScrollArea from "@radix-ui/react-scroll-area";
import { PoleItem } from "./pole-item";

export const PolesList = () => {
  return (
    <ScrollArea.Root className="h-full w-full overflow-hidden">
      <ScrollArea.Viewport className="h-full w-full pb-3">
        {Array(100)
          .fill(0)
          .map((i, index) => (
            <PoleItem key={index} />
          ))}
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar className="mr-1 w-1 pb-3" orientation="vertical">
        <ScrollArea.Thumb className="rounded bg-[#1616164D]" />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
};
