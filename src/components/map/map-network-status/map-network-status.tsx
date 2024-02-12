type MapLoaderProps = {
  children: React.ReactNode;
};
export const MapNetworkStatus = ({ children }: MapLoaderProps) => {
  return (
    <span className="mb-2 min-w-max  rounded border-[0.5px] border-default bg-white  p-1 pl-2 pr-2 text-[12px] shadow-dropdown">
      {children}
    </span>
  );
};
