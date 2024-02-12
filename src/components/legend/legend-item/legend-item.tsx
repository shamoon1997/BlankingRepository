type LegendItemProps = {
  color: string;
  text: string;
};
export const LegendItem = ({ color, text }: LegendItemProps) => {
  return (
    <div className="flex items-center gap-[9px]">
      <div className={`h-2 w-2 shrink-0 rounded-full ${color}`} />

      <div className="font-mont  font-normal leading-[normal] tracking-[-0.5px] text-[#161616]">
        {text}
      </div>
    </div>
  );
};
