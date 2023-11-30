function LegendStatus() {
  return (
    <div className="absolute bottom-12 right-10">
      <div className="border-[rgba(91, 91, 91, 0.50)] flex max-w-[270px] flex-shrink-0 flex-col rounded-[4px] border-[0.5px] border-solid bg-white p-3 shadow-tooltip">
        <div className="flex overflow-hidden rounded-[10px]">
          <div className="h-[5px] w-[80px] flex-shrink-0 bg-[#60C760]" />
          <div className="h-[5px] w-[80px] flex-shrink-0 bg-[#F4B749]" />
          <div className="h-[5px] w-[80px] flex-shrink-0 bg-[#DF4C2B]" />
        </div>
        <div className="mt-1 flex justify-between">
          <div className="font-mont text-[10px] font-normal leading-normal tracking-tight text-[#161616]">
            Online
          </div>
          <div className="font-mont text-[10px] font-normal leading-normal tracking-tight text-[#161616]">
            Spotty
          </div>
          <div className="font-mont text-[10px] font-normal leading-normal tracking-tight text-[#161616]">
            Offline
          </div>
        </div>
      </div>
    </div>
  );
}

export default LegendStatus;
