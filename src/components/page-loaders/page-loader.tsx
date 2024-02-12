export const PageLoader = () => {
  return (
    <div className="flex">
      <div className="h-screen w-56 shrink-0 bg-custom-side-color p-4 text-white">
        <h3 className="mb-4 text-left font-mont text-xl font-black">
          SHERLOCK
        </h3>
      </div>
      <div className="h-screen w-full bg-white">
        <nav className="h-[80px] w-full animate-pulse bg-[#EDEDED]" />
        <div className="p-5">
          <p>Redirecting you to the application...</p>
        </div>
      </div>
    </div>
  );
};
