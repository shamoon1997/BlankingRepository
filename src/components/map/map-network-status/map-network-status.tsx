type MapLoaderProps = {
  children: React.ReactNode;
};
export const MapNetworkStatus = ({ children }: MapLoaderProps) => {
  return (
    <span className="absolute bottom-4 right-4 rounded border-[0.5px] border-default bg-white  p-1 pl-2 pr-2 text-sm shadow-dropdown">
      {children}
    </span>
  );
};
