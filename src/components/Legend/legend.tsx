function Legend() {
  return (
    <div className="absolute bottom-12 right-10">
      <div className="border-[rgba(91, 91, 91, 0.50)] flex w-full max-w-[150px] flex-col gap-2.5 rounded border border-solid border-opacity-50 bg-white px-3 py-3.5 shadow-tooltip">
        <div className="flex items-center gap-[9px]">
          <div className="h-2 w-2 shrink-0 rounded-full bg-gray-700" />

          <div className="font-mont text-[10px] font-normal leading-[normal] tracking-[-0.5px] text-[#161616]">
            Undetermined
          </div>
        </div>

        <div className="flex items-center gap-[9px]">
          <div className="h-2 w-2 shrink-0 rounded-full bg-purple-700" />

          <div className="font-mont text-[10px] font-normal leading-[normal] tracking-[-0.5px] text-[#161616]">
            To be investigated
          </div>
        </div>

        <div className="flex items-center gap-[9px]">
          <div className="h-2 w-2 shrink-0 rounded-full bg-red-600" />
          <div className="font-mont text-[10px] font-normal leading-[normal] tracking-[-0.5px] text-[#161616]">
            To-do
          </div>
        </div>

        <div className="flex items-center gap-[9px]">
          <div className="h-2 w-2 shrink-0 rounded-full bg-yellow-400" />
          <div className="font-mont text-[10px] font-normal leading-[normal] tracking-[-0.5px] text-[#161616]">
            In-progress
          </div>
        </div>

        <div className="flex items-center gap-[9px]">
          <div className="h-2 w-2 shrink-0 rounded-full bg-blue-500" />
          <div className="font-mont text-[10px] font-normal leading-[normal] tracking-[-0.5px] text-[#161616]">
            Reported To Customer
          </div>
        </div>
      </div>
    </div>
  );
}

export default Legend;
