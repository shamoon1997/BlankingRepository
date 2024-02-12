import { useState } from "react";
import { useTakeNewPhoto } from "@/api/hooks/photos/use-take-photo";

export const TakePhoto = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [argumentsPassed, setArgumentsPassed] = useState({
    up: ["0d002b000e5030475837322000000001"],
    front: [
      "0d0026000e5030475837322000000001",
      "0d0028000e5030475837322000000001",
    ],
  });
  const { data, isError, isLoading } = useTakeNewPhoto(argumentsPassed);

  const handleTakeNewPhoto = () => {
    if (!isError && !isLoading) {
      console.log("data: ", data);
      alert("Photo taken successfully");
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex  h-[32px] w-[130px] flex-shrink-0 cursor-pointer items-center justify-center rounded-[4px] border-[0.3px] border-solid border-[#3B3C4F] bg-[#3B3C4F] text-white">
        <div
          className="font-mont text-[8px] font-semibold capitalize leading-[9px] tracking-tighter text-white"
          onClick={() => setShowMenu(!showMenu)}
        >
          Take Photo
        </div>
      </div>
      {showMenu && (
        <div
          className="stroke-[rgba(91, 91, 91, 
      0.50)] stroke-width-0.5 drop-shadow-[0px 0px 3px rgba(0, 0, 0, 0.15)] z-20 flex h-[69px] w-[130px] flex-shrink-0 flex-col
      rounded-[5px] border-[0.5px]
      border-[#D9D9D9]
      bg-white fill-current
      filter
      "
        >
          <div
            className="font-Mont cursor-pointer border-b-[0.5px] border-b-[#D9D9D9] p-2 text-center text-[10px] font-semibold tracking-[0.5px] text-[#161616]"
            onClick={() => handleTakeNewPhoto()}
          >
            Take New Photo
          </div>
          <div className="font-Mont cursor-pointer p-2 text-center text-[10px] font-semibold tracking-[0.5px] text-[#161616]">
            Retrieve Past Photo
          </div>
        </div>
      )}
    </div>
  );
};
