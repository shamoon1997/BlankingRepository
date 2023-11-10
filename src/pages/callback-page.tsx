import React, { Fragment } from "react";

export const CallbackPage: React.FC = () => {
  return (
    <Fragment>
      <div className="grid grid-cols-6">
        <aside className="col-span-1 bg-[#3B3C4F] text-white min-h-screen animate-pulse" />

        <div className="h-screen w-full col-span-5 bg-white">
          <nav className="min-h-[80px] w-full bg-[#EDEDED] animate-pulse" />
          <div className="" />
        </div>
      </div>
    </Fragment>
  );
};
