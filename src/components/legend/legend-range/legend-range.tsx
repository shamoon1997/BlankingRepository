type LegendRangeProps = {
  // tailwind like color classes only
  colors: string[];
  labels: string[];
  width?: number;
};
export const LegendRange = ({
  colors,
  labels,
  width = 270,
}: LegendRangeProps) => {
  return (
    <div
      style={{ width }}
      className="flex flex-1 flex-col gap-2 rounded border-[0.5px] border-solid border-default bg-white px-[15px]  pb-2 pt-[12px] shadow-tooltip"
    >
      <div className="flex overflow-hidden rounded-[10px]">
        {colors.map((color) => (
          <div
            className={`h-[5px] flex-1  flex-shrink-0 ${color}`}
            key={color}
          />
        ))}
      </div>
      <div className="flex justify-between">
        {labels.map((label, index) => (
          <div
            className="font-mont text-[11px] font-normal leading-normal tracking-tight text-[#161616]"
            key={index}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LegendRange;
