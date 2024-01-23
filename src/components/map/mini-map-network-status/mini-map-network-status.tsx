type MapLoaderProps = {
  children: React.ReactNode;
};
export const MiniMapNetworkStatus = ({ children }: MapLoaderProps) => {
  return (
    <span className="mb-2 min-w-max rounded border-[0.5px]  border-default bg-white p-0.5 pl-1  pr-1 font-mont text-[10px] font-medium shadow-dropdown">
      {children}
    </span>
  );
};
