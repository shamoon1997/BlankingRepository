type PoleviewButtonProps = {
  onClick: () => void;
};
export const PoleViewButton = ({ onClick }: PoleviewButtonProps) => {
  return (
    <button
      type="button"
      className="flex cursor-pointer items-center justify-center rounded border-[0.5px] border-solid border-[#D9D9D9] bg-[#EEEEEE] p-1 text-xs font-semibold text-primary"
      onClick={onClick}
    >
      Pole View
    </button>
  );
};
