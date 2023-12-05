function LegendRange() {
  const colorArray = [
    "#5C88FF",
    "#5546FF",
    "#A974FF",
    "#D92AF6",
    "#FF238D",
    "#F00",
  ];

  const rangeArray = [8, 283, 567];

  return (
    <div className="absolute bottom-12 right-10">
      <div className="border-[rgba(91, 91, 91, 0.50)] flex max-w-[270px] flex-shrink-0 flex-col rounded-[4px] border-[0.5px] border-solid bg-white p-3 shadow-tooltip">
        <div className="flex overflow-hidden rounded-[10px]">
          {colorArray.map((color, index) => (
            <div className={`h-[5px] w-[40px] bg-[${color}]`} key={index} />
          ))}
        </div>
        <div className="mt-1 flex justify-between">
          {rangeArray.map((value, index) => (
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

export default LegendRange;
