type LegendRangeProps = {
  // tailwind like color classes only
  colors: string[];
  width?: number;
};

//px-[15px]  pb-2 pt-[12px]
export const MiniLegendRange = ({ colors, width = 270 }: LegendRangeProps) => {
  return (
    <div
      style={{ width }}
      className="flex flex-1 flex-col gap-2 rounded border-[0.5px] border-solid border-default bg-white p-2  shadow-tooltip"
    >
      <div className="flex overflow-hidden rounded-[10px]">
        {colors.map((color) => (
          <div
            className={`h-[5px] flex-1  flex-shrink-0 ${color}`}
            key={color}
          />
        ))}
      </div>
    </div>
  );
};

export default MiniLegendRange;
