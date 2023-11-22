export const FilterInputControl = () => {
  return (
    <div className="flex justify-between text-xs font-semibold">
      <p className="w-1/2 text-primary-hard">Value</p>
      <input
        className="w-1/2 text-primary outline-none"
        placeholder="Enter a value"
      />
    </div>
  );
};
