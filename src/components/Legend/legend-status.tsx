function LegendStatus() {
  const colorArray = ["#60C760", "#F4B749", "#DF4C2B"];
  const statusArray = ["Online", "Spotty", "Offline"];

  return (
    <div className="absolute bottom-12 right-10">
      <div className="border-[rgba(91, 91, 91, 0.50)] flex max-w-[270px] flex-shrink-0 flex-col rounded-[4px] border-[0.5px] border-solid bg-white p-3 shadow-tooltip">
        <div className="flex overflow-hidden rounded-[10px]">
          {colorArray.map((value, index) => (
            <div
              className={`h-[5px] w-[80px] flex-shrink-0 bg-[${value}]`}
              key={index}
            />
          ))}
        </div>
        <div className="mt-1 flex justify-between">
          {statusArray.map((value, index) => (
            <div
              className="font-mont text-[10px] font-normal leading-normal tracking-tight text-[#161616]"
              key={index}
            >
              {value}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LegendStatus;
