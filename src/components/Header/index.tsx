import React from "react";

interface HeaderProps {
  heading: string;
}

const Header: React.FC<HeaderProps> = ({ heading }) => {
  return (
    <div className="text-24 leading-31 tracking-0 text-left font-mont font-bold">
      {heading}
    </div>
  );
};

export default Header;
