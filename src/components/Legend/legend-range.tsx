function LegendRange() {
  return (
    <div className="absolute bottom-12 right-10">
      <div className="border-[rgba(91, 91, 91, 0.50)] flex max-w-[270px] flex-shrink-0 flex-col rounded-[4px] border-[0.5px] border-solid bg-white p-3 shadow-tooltip">
        <div className="flex overflow-hidden rounded-[10px]">
          <div className="h-[5px] w-[40px] bg-[#5C88FF]" />
          <div className="h-[5px] w-[40px] bg-[#5546FF]" />
          <div className="h-[5px] w-[40px] bg-[#A974FF]" />
          <div className="h-[5px] w-[40px] bg-[#D92AF6]" />
          <div className="h-[5px] w-[40px] bg-[#FF238D]" />
          <div className="h-[5px] w-[40px] bg-[#F00]" />
        </div>
        <div className="mt-1 flex justify-between">
          <div className="font-mont text-[10px] font-normal leading-normal tracking-tight text-[#161616]">
            8
          </div>
          <div className="font-mont text-[10px] font-normal leading-normal tracking-tight text-[#161616]">
            283
          </div>
          <div className="font-mont text-[10px] font-normal leading-normal tracking-tight text-[#161616]">
            567
          </div>
        </div>
      </div>
    </div>
  );
}

export default LegendRange;
