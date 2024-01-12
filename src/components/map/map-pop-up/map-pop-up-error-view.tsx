import { CloseIcon, MinimizeIcon } from "@/assets/misc";

type MapPopUpLoadingViewProps = {
  handleMinimize: () => void;
  handleClose: () => void;
};
export const MapPopUpErrorView = ({
  handleMinimize,
  handleClose,
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

      <p className="p-3 text-sm">An Error occurred when loading pole data.</p>
    </div>
  );
};
