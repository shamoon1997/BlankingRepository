import { PlayAudioIcon } from "@/assets/misc";
export const AudioButton: React.FC = () => (
  <div className="flex h-[25px] cursor-pointer items-center justify-center gap-x-[5px] rounded-[3px] bg-[#3B3C4F] px-[7px]">
    <div>
      <PlayAudioIcon />
    </div>
    <div className="font-mont text-[10px] font-semibold leading-normal tracking-wide text-white ">
      Play Audio
    </div>
  </div>
);
