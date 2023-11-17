export const PageLoader = () => {
  return (
    <div className="grid grid-cols-6">
      <aside className="col-span-1 min-h-screen animate-pulse bg-[#3B3C4F] text-white" />
      <div className="col-span-5 h-screen w-full bg-white">
        <nav className="min-h-[80px] w-full animate-pulse bg-[#EDEDED]" />
        <div className="p-5">
          <p>Redirecting you to the application...</p>
        </div>
      </div>
    </div>
  );
};
