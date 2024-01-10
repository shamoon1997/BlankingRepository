import { ReadingLockIcon, ForwardArrowIcon } from "@/assets/misc";

type BlobReadingValuesProps = {
  disabled: boolean;
};

export const BlobReadingValues = ({ disabled }: BlobReadingValuesProps) => {
  /* Have given margin left and margin top 20px for viewing it clearly on screen. We can remove that */
  console.log("disabled", disabled);
  return (
    <div className=" ml-2 mt-2 flex h-[32px] w-[214px] flex-shrink-0 items-center justify-center gap-x-[9px] rounded-[5px] border border-solid border-[#D9D9D9] bg-white shadow-pole-filter">
      <div
        className={`${
          disabled ? "[&_path]:fill-[#D83020]" : "[&_path]:fill-[#5283ED]"
        }`}
      >
        <ReadingLockIcon />
      </div>
      <div
        className={`font-mont text-[10px] font-semibold leading-normal tracking-tighter ${
          disabled ? "text-[#D83020]" : "text-[#5283ED]"
        } `}
      >
        23-12-05-13:30:00
      </div>
      <div>
        <ForwardArrowIcon />
      </div>
      <div
        className={`font-mont text-[10px] font-semibold leading-normal tracking-tighter ${
          disabled ? "text-[#D83020]" : "text-[#5283ED]"
        } `}
      >
        23-12-05-13:32:00
      </div>
    </div>
  );
};
