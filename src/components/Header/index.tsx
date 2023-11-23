import { NotificationIcon, ProfileIcon } from "@/assets";
import React from "react";

interface HeaderProps {
  heading: string;
}

const Header: React.FC<HeaderProps> = ({ heading }) => {
  return (
    <div className="flex min-h-[40px] w-full justify-between bg-slate-100 px-2 py-4">
      <div className="grid place-content-center">
        <h1 className="text-2xl">{heading}</h1>
      </div>
      <div className="flex gap-2">
        <div className="grid h-[28px] w-[28px] place-content-center rounded-full bg-slate-200 [&_svg]:h-[12px] [&_svg]:w-[12px]">
          <ProfileIcon />
        </div>
        <div className="grid h-[28px] w-[28px] place-content-center rounded-full bg-slate-200 [&_svg]:h-[12px] [&_svg]:w-[12px]">
          <NotificationIcon />
        </div>
      </div>
    </div>
  );
};

export default Header;
