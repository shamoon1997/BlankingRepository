type Props = React.ComponentPropsWithoutRef<"button">;

export const PoleViewButton: React.FC<Props> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center rounded border-[0.5px] border-solid border-[#D9D9D9] bg-[#EEEEEE] p-1 text-xs font-semibold text-primary"
    >
      Pole View
    </button>
  );
};
