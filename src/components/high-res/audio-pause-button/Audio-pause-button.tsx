import { PauseAudioIcon } from "@/assets/misc";
export const AudioPauseButton: React.FC = () => (
  <div className="flex h-[25px] cursor-pointer items-center justify-center gap-x-[5px] rounded-[3px] border border-solid border-[#3B3C4F] bg-[#F5F5F5] pl-[10px] pr-[25px]">
    <div>
      <PauseAudioIcon />
    </div>
    <div className="font-mont text-[10px] font-semibold leading-normal tracking-wide text-[#3B3C4F] ">
      Pause
    </div>
  </div>
);
