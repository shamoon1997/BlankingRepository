type MapLoaderProps = {
  children: React.ReactNode;
};
export const MapNetworkStatus = ({ children }: MapLoaderProps) => {
  return (
    <span className="absolute bottom-[180px] left-2 rounded border-[0.5px] border-default bg-white  p-1 pl-2 pr-2 text-xs shadow-dropdown">
      {children}
    </span>
  );
};
