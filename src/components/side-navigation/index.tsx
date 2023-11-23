import { useState } from "react";
import { Link } from "react-router-dom";
import { navigationTabs } from "@/utils/routes";

const SideNavigation: React.FC = () => {
  const [selectedItem] = useState(location.pathname.substring(1));

  return (
    <div>
      <div className="h-screen w-56 bg-customSideColor p-4 text-white">
        <h3 className="mb-4 text-left font-mont text-xl font-bold">ADMIN</h3>

        <ul>
          {navigationTabs.map((tab) => {
            return (
              <li
                className={`mb-2 flex cursor-pointer 
                items-center py-2 pl-2 pr-4 text-sm transition ${
                  selectedItem === tab.name.toLowerCase()
                    ? "rounded-md border-gray-700 bg-gray-700"
                    : "hover:rounded-md hover:border-gray-700 hover:bg-gray-700"
                }`}
                key={tab?.name}
              >
                <Link to={tab.path} className="flex items-center">
                  <div className="mr-4 h-5 w-5 [&_svg]:h-[20px] [&_svg]:w-[20px]">
                    <tab.icon />
                  </div>

                  <span>{tab.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SideNavigation;
