import { BlobMapIcon } from "@/assets/misc";
export const BlobRequestDropDown = () => {
  /* Have given margin left and margin top 20px for viewing it clearly on screen. We can remove that */
  return (
    <div className="ml-[20px] mt-[20px] max-h-[440px] w-[205px] flex-shrink-0 rounded-[4px] border border-solid border-[#3B3C4F] bg-white shadow-md">
      <div>
        <div className="flex flex-col items-center gap-y-[10px] p-[15px] pt-[5px] ">
          <div className="font-mont text-[12px] font-semibold leading-normal tracking-tighter text-[#3B3C4F] ">
            Confirm High-Res Request
          </div>

          <div className=" flex w-full items-center gap-x-[29px]">
            <div className="min-w-[62px] font-mont text-[10px] font-semibold leading-normal text-[#16161680]">
              Serial
            </div>
            <div className="flex h-[25px] w-[62px]  flex-shrink-0 items-center justify-center gap-x-[8px] rounded-[4px] border-[0.8px] border-solid border-[#8A8A8A]">
              <div>
                <BlobMapIcon />
              </div>
              <div className="font-mont text-[10px] font-normal leading-normal tracking-tighter text-[#161616]">
                GS126
              </div>
            </div>
          </div>

          <div className=" flex  w-full items-center  gap-x-[29px]">
            <div className="min-w-[62px] font-mont text-[10px] font-semibold leading-normal text-[#16161680]">
              Pole
            </div>
            <div className="font-mont text-[10px] font-normal leading-normal tracking-tighter text-[#000]">
              4022
            </div>
          </div>

          <div className=" flex w-full items-center gap-x-[29px]">
            <div className="min-w-[62px] font-mont text-[10px] font-semibold leading-normal text-[#16161680]">
              Hardware
            </div>
            <div className="font-mont text-[10px] font-normal leading-normal tracking-tighter text-[#000]">
              1f0010000c5
            </div>
          </div>

          <div className="flex w-full items-center  gap-x-[29px]">
            <div className="min-w-[62px] font-mont text-[10px] font-semibold leading-normal text-[#16161680]">
              Network
            </div>
            <div className="font-mont text-[10px] font-normal leading-normal tracking-tighter text-[#000]">
              Lora
            </div>
          </div>

          <div className=" flex w-full items-center gap-x-[29px]">
            <div className="min-w-[62px] font-mont text-[10px] font-semibold leading-normal text-[#16161680]">
              Deployment
            </div>
            <div className="font-mont text-[10px] font-normal leading-normal tracking-tighter text-[#000]">
              Birmingham City
            </div>
          </div>
        </div>

        <div className="h-[0.5px] w-full bg-[#D9D9D9]" />

        <div className="flex flex-col items-center gap-y-[10px] p-[15px] pt-[5px] ">
          <div className=" mt-[10px] flex w-full flex-col">
            <div className="min-w-[62px] font-mont text-[10px] font-semibold leading-normal text-[#16161680]">
              Inode Range
            </div>
            <div className="flex w-full gap-x-[45px]">
              <div>
                <div className="font-mont text-[10px] font-semibold leading-normal text-[#000]">
                  From
                </div>
                <div className="font-mont text-[10px] font-semibold leading-normal text-[#5283ED]">
                  59566650
                </div>
              </div>
              <div>
                <div className="font-mont text-[10px] font-semibold leading-normal text-[#000]">
                  To
                </div>
                <div className="font-mont text-[10px] font-semibold leading-normal text-[#5283ED]">
                  59566658
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-[0.5px] w-full bg-[#D9D9D9]" />

        <div className="flex flex-col items-center gap-y-[10px] p-[15px] pt-[5px] ">
          <div className=" mt-[10px] flex w-full flex-col">
            <div className="min-w-[62px] font-mont text-[10px] font-semibold leading-normal text-[#16161680]">
              Data Stream Selection
            </div>
            <div className="mt-[15px] flex">
              <input
                type="checkbox"
                name="Vibration i-axis"
                id="Vibration i-axis"
                className="accent-[#5283ED]"
              />
              <span className="ml-[10px] font-mont text-[10px] font-normal leading-normal tracking-tighter text-[#161616]">
                Vibration i-axis
              </span>
            </div>

            <div className="flex">
              <input
                type="checkbox"
                name="Vibration j-axis"
                id="Vibration j-axis"
                className="accent-[#5283ED]"
              />
              <span className="ml-[10px] font-mont text-[10px] font-normal leading-normal tracking-tighter text-[#161616]">
                Vibration j-axis
              </span>
            </div>

            <div className="flex">
              <input
                type="checkbox"
                name="Vibration k-axis"
                id="Vibration k-axis"
                className="accent-[#5283ED]"
              />
              <span className="ml-[10px] font-mont text-[10px] font-normal leading-normal tracking-tighter text-[#161616]">
                Vibration k-axis
              </span>
            </div>

            <div className="flex">
              <input
                type="checkbox"
                name="Electrometer"
                id="Electrometer"
                className="accent-[#5283ED]"
              />
              <span className="ml-[10px] font-mont text-[10px] font-normal leading-normal tracking-tighter text-[#161616]">
                Electrometer
              </span>
            </div>

            <div className="flex">
              <input
                type="checkbox"
                name="Acoustic"
                id="Acoustic"
                className="accent-[#5283ED]"
              />
              <span className="ml-[10px] font-mont text-[10px] font-normal leading-normal tracking-tighter text-[#161616]">
                Acoustic
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-y-[10px] p-[15px] pt-[5px] ">
          <button className="h-[32px] w-[175px] flex-shrink-0 rounded-[4px] bg-[#3B3C4F] font-mont text-[10px] font-bold uppercase leading-normal tracking-tighter text-[#FFF]">
            Request
          </button>
        </div>
      </div>
    </div>
  );
};
