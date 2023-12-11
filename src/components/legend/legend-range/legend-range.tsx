import { LegendContainer } from "@/components";

type LegendRangeProps = {
  // tailwind like color classes only
  colors: string[];
  labels: string[];
};
export const LegendRange = ({ colors, labels }: LegendRangeProps) => {
  return (
    <LegendContainer>
      <div className="flex flex-col gap-2 px-[15px] pb-2 pt-[12px]">
        <div className="flex overflow-hidden rounded-[10px]">
          {colors.map((color) => (
            <div
              className={`h-[5px] w-[80px] flex-shrink-0 ${color}`}
              key={color}
            />
          ))}
        </div>
        <div className="flex justify-between">
          {labels.map((label) => (
            <div
              className="font-mont text-[11px] font-normal leading-normal tracking-tight text-[#161616]"
              key={label}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    </LegendContainer>
  );
};

export default LegendRange;
