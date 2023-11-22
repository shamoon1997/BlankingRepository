import { PoleViewButton } from "./pole-view-button";

export const PoleItem = () => {
  return (
    <div className="ml-4 mr-4 flex h-10 items-center justify-between">
      <p className="text-primary text-xs font-semibold">1535142 • GS1245</p>
      <PoleViewButton />
    </div>
  );
};
