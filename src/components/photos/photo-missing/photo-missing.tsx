import { ImageMissingIcon } from "@/assets/misc";
export const PhotoMissing = () => {
  return (
    <div
      className="flex h-[270px] w-[360px] flex-shrink-0 flex-col items-center justify-center gap-y-[20px]
    bg-[#8B8B8B]
    "
    >
      <div>
        <ImageMissingIcon />
      </div>
      <div className="font-mont text-[12px] font-semibold text-white">
        Front Image Missing
      </div>
    </div>
  );
};
