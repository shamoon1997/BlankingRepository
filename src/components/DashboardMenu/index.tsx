import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogOverlay,
  DialogContent,
} from "@radix-ui/react-dialog";
import Header from "../Header";

const SideNavigation = () => {
  const [selectedItem, setSelectedItem] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    setIsOpen(true);
  };
  const onClose = () => {
    setIsOpen(false);
  };

  const renderContent = (heading: string) => {
    return <Header heading={heading} />;
  };

  return (
    //@ts-ignore
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTrigger>
        <div className="h-screen w-56 bg-side-nav p-4 text-white">
          <h3 className="mb-4 text-left font-mont text-xl font-bold">ADMIN</h3>

          <ul>
            <li
              className={`mb-2 flex cursor-pointer items-center px-4 py-2 transition ${
                selectedItem === "Deployments"
                  ? "rounded-md border-gray-700 bg-gray-700"
                  : "hover:rounded-md hover:border-gray-700 hover:bg-gray-700"
              }`}
              onClick={() => handleItemClick("Deployments")}
            >
              <img
                src={"/icons/deployment.svg"}
                alt="Deployment Icon"
                className="mr-2 h-5 w-5"
              />
              <span>Deployments</span>
            </li>
            <li
              className={`mb-2 flex cursor-pointer items-center px-4 py-2 transition ${
                selectedItem === "Alert"
                  ? "rounded-md border-gray-700 bg-gray-700"
                  : "hover:rounded-md hover:border-gray-700 hover:bg-gray-700"
              }`}
              onClick={() => handleItemClick("Alert")}
            >
              <img
                src={"/icons/alerts.svg"}
                alt="Alert Icon"
                className="mr-2 h-5 w-5"
              />
              <span>Alerts</span>
            </li>
            <li
              className={`mb-2 flex cursor-pointer items-center px-4 py-2 transition ${
                selectedItem === "Ticket"
                  ? "rounded-md border-gray-700 bg-gray-700"
                  : "hover:rounded-md hover:border-gray-700 hover:bg-gray-700"
              }`}
              onClick={() => handleItemClick("Ticket")}
            >
              <img
                src={"/icons/tickets.svg"}
                alt="Tickets Icon"
                className="mr-2 h-5 w-5"
              />
              <span>Tickets</span>
            </li>
            <li
              className={`mb-2 flex cursor-pointer items-center px-4 py-2 transition ${
                selectedItem === "Devices"
                  ? "rounded-md border-gray-700 bg-gray-700"
                  : "hover:rounded-md hover:border-gray-700 hover:bg-gray-700"
              }`}
              onClick={() => handleItemClick("Devices")}
            >
              <img
                src={"/icons/devices.svg"}
                alt="Devices Icon"
                className="mr-2 h-5 w-5"
              />
              <span>Devices</span>
            </li>
            <li
              className={`mb-2 flex cursor-pointer items-center px-4 py-2 transition ${
                selectedItem === "Poles"
                  ? "rounded-md border-gray-700 bg-gray-700"
                  : "hover:rounded-md hover:border-gray-700 hover:bg-gray-700"
              }`}
              onClick={() => handleItemClick("Poles")}
            >
              <img
                src={"/icons/poles.svg"}
                alt="Poles Icon"
                className="mr-2 h-5 w-5"
              />
              <span>Poles</span>
            </li>

            <li
              className={`mb-2 flex cursor-pointer items-center px-4 py-2 transition ${
                selectedItem === "Jobs"
                  ? "rounded-md border-gray-700 bg-gray-700"
                  : "hover:rounded-md hover:border-gray-700 hover:bg-gray-700"
              }`}
              onClick={() => handleItemClick("Jobs")}
            >
              <img
                src={"/icons/jobs.svg"}
                alt="Jobs Icon"
                className="mr-2 h-5 w-5"
              />
              <span>Jobs</span>
            </li>

            <li
              className={`mb-2 flex cursor-pointer items-center px-4 py-2 transition ${
                selectedItem === "Photos"
                  ? "rounded-md border-gray-700 bg-gray-700"
                  : "hover:rounded-md hover:border-gray-700 hover:bg-gray-700"
              }`}
              onClick={() => handleItemClick("Photos")}
            >
              <img
                src={"/icons/photos.svg"}
                alt="Photos Icon"
                className="mr-2 h-5 w-5"
              />
              <span>Photos</span>
            </li>

            <li
              className={`mb-2 flex cursor-pointer items-center px-4 py-2 transition ${
                selectedItem === "Sensor"
                  ? "rounded-md border-gray-700 bg-gray-700"
                  : "hover:rounded-md hover:border-gray-700 hover:bg-gray-700"
              }`}
              onClick={() => handleItemClick("Sensor")}
            >
              <img
                src={"/icons/sensor.svg"}
                alt="Sensor Icon"
                className="mr-2 h-5 w-5"
              />
              <span>Sensor Blobs</span>
            </li>

            <li
              className={`mb-2 flex cursor-pointer items-center px-4 py-2 transition ${
                selectedItem === "customerReports"
                  ? "rounded-md border-gray-700 bg-gray-700"
                  : "hover:rounded-md hover:border-gray-700 hover:bg-gray-700"
              }`}
              onClick={() => handleItemClick("customerReports")}
            >
              <img
                src={"/icons/customerReports.svg"}
                alt="customer report Icon"
                className="mr-2 h-5 w-5"
              />
              <span>Customer Reports</span>
            </li>

            <li
              className={`mb-2 flex cursor-pointer items-center px-4 py-2 transition ${
                selectedItem === "Organizations"
                  ? "rounded-md border-gray-700 bg-gray-700"
                  : "hover:rounded-md hover:border-gray-700 hover:bg-gray-700"
              }`}
              onClick={() => handleItemClick("Organizations")}
            >
              <img
                src={"/icons/organizations.svg"}
                alt="organization Icon"
                className="mr-2 h-5 w-5"
              />
              <span>Organizations</span>
            </li>

            <li
              className={`mb-2 flex cursor-pointer items-center px-4 py-2 transition ${
                selectedItem === "users"
                  ? "rounded-md border-gray-700 bg-gray-700"
                  : "hover:rounded-md hover:border-gray-700 hover:bg-gray-700"
              }`}
              onClick={() => handleItemClick("users")}
            >
              <img
                src={"/icons/users.svg"}
                alt="users Icon"
                className="mr-2 h-5 w-5"
              />
              <span>Users</span>
            </li>
          </ul>
        </div>
      </DialogTrigger>
      <DialogOverlay
        className="fixed bottom-0 right-0 top-0 bg-transparent"
        onClick={onClose}
      />
      <DialogContent
        className="fixed left-56 right-0 top-0 bg-gray-200 p-10 text-black"
        style={{ backgroundColor: "#F5F5F5" }}
        onClick={(e) => e.stopPropagation()}
      >
        {renderContent(selectedItem)}
      </DialogContent>
    </Dialog>
  );
};

export default SideNavigation;
