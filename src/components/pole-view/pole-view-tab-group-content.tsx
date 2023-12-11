import React from "react";

const PoleViewTabGroupContent: React.FC = () => {
  return (
    <div className="flex gap-x-[30px]">
      <div>
        <div className="flex gap-[15px]">
          {[...Array(4)]?.map((_, i) => {
            return (
              <div
                className="border-default flex h-[45px] w-[106px] flex-col rounded-md border px-[11px] py-[6px]"
                key={`stats-${i}`}
              >
                <p className="text-poleViewTextLight/50 text-[10px]">
                  Connectivity
                </p>
                <div className="inline-flex items-center text-[10px] font-bold">
                  <div className="mr-[5px] h-[7px] w-[7px] rounded bg-online" />{" "}
                  Online
                </div>
              </div>
            );
          })}
        </div>

        <div className="mb-[30px] mt-[20px] max-w-[638px]">
          <p className="text-poleViewBlue mb-[15px] text-[12px] font-bold">
            Basic info
          </p>

          <div className="grid grid-cols-4 gap-x-[30px] gap-y-[20px]">
            {[...Array(7)]?.map((_, i) => {
              return (
                <div className="flex flex-col" key={`info-${i}`}>
                  <p className="text-poleViewTextLight/50 text-[10px] font-bold">
                    Serial
                  </p>
                  <p className="text-[12px] font-bold">GS1245</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="max-w-[638px]">
          <p className="text-poleViewBlue mb-[15px] text-[12px] font-bold">
            Meta data
          </p>

          <div className="grid grid-cols-4 gap-x-[30px] gap-y-[20px]">
            {[...Array(14)]?.map((_, i) => {
              return (
                <div className="flex flex-col" key={`info-${i}`}>
                  <p className="text-poleViewTextLight/50 text-[10px] font-bold">
                    ICCID
                  </p>
                  <p className="text-[12px] font-bold">123687219046891121</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div>
        <p className="text-poleViewBlue mb-[15px] text-[12px] font-bold">
          Installation photo
        </p>
        <div>
          <img
            src="/images/popup.png"
            alt="Your Pole"
            className="h-[338px] w-[242px] object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default PoleViewTabGroupContent;
