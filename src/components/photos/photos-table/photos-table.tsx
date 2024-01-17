import * as React from "react";
import { MapBlobIcon, LinkOpenerIcon } from "@/assets/misc";
import { AccordionDemo } from "@/components/blob/accordion/accordion";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

type TableData = {
  images: string[];
  device: {
    deviceId: string;
    Network: string;
  };
  photoInformation: {
    recordedAt: string;
    photoId: string;
  };
  deploymentInformation: {
    deployment: string;
    url: string;
  };
  hardwareId: string;
};

const defaultData: TableData[] = [
  {
    images: [
      "https://i.postimg.cc/kMvpxHYX/20230629-T234418-Z-188875-2.png",
      "https://i.postimg.cc/25KVXmkd/20230629-T234418-Z-188875-1.png",
    ],
    device: {
      deviceId: "GS1244 • 1535142",
      Network: "Lora",
    },
    photoInformation: {
      recordedAt: "Aug 11, 2022 15:01",
      photoId: "1f0010000c",
    },
    deploymentInformation: {
      deployment: "Birmingham City",
      url: "https://baasuisab..",
    },
    hardwareId: "1f0010000c...",
  },
  {
    images: [
      "https://i.postimg.cc/kMvpxHYX/20230629-T234418-Z-188875-2.png",
      "https://i.postimg.cc/25KVXmkd/20230629-T234418-Z-188875-1.png",
    ],
    device: {
      deviceId: "GS1244 • 1535142",
      Network: "Lora",
    },
    photoInformation: {
      recordedAt: "Aug 11, 2022 15:01",
      photoId: "1f0010000c",
    },
    deploymentInformation: {
      deployment: "Birmingham City",
      url: "https://baasuisab..",
    },
    hardwareId: "1f0010000c...",
  },
  {
    images: ["https://i.postimg.cc/kMvpxHYX/20230629-T234418-Z-188875-2.png"],
    device: {
      deviceId: "GS1244 • 1535142",
      Network: "Lora",
    },
    photoInformation: {
      recordedAt: "Aug 11, 2022 15:01",
      photoId: "1f0010000c",
    },
    deploymentInformation: {
      deployment: "Birmingham City",
      url: "https://baasuisab..",
    },
    hardwareId: "1f0010000c...",
  },
  {
    images: [
      "https://i.postimg.cc/kMvpxHYX/20230629-T234418-Z-188875-2.png",
      "https://i.postimg.cc/25KVXmkd/20230629-T234418-Z-188875-1.png",
    ],
    device: {
      deviceId: "GS1244 • 1535142",
      Network: "Lora",
    },
    photoInformation: {
      recordedAt: "Aug 11, 2022 15:01",
      photoId: "1f0010000c",
    },
    deploymentInformation: {
      deployment: "Birmingham City",
      url: "https://baasuisab..",
    },
    hardwareId: "1f0010000c...",
  },
];

export const PhotosTable = () => {
  const columns = [
    {
      id: "select",
      header: () => <></>,
      cell: (item: {
        row: {
          getIsSelected: () => any;
          getToggleSelectedHandler: () => any;
          id: string;
        };
      }) => {
        return (
          <>
            <input
              type="checkbox"
              {...{
                checked: item.row.getIsSelected(),
                onChange: item.row.getToggleSelectedHandler(),
                onClick: () => handleRowToggle(item.row.id),
              }}
            />
          </>
        );
      },
    },
    {
      header: () => {
        return <></>;
      },
      accessorKey: "images",
      cell: (info: any) => {
        return (
          <>
            <div className="flex w-full gap-x-[5px]">
              {info.getValue().map(
                (imageLink: string) =>
                  imageLink && (
                    <div className="h-[96px] w-full overflow-hidden">
                      <img
                        src={imageLink}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ),
              )}
            </div>
          </>
        );
      },
    },
    {
      header: () => {
        return <></>;
      },
      accessorKey: "device",
      cell: (info: {
        getValue: () => {
          deviceId: string;
          Network: string;
        };
      }) => {
        return (
          <div>
            <div className="flex flex-col gap-y-[5px]">
              <div className="font-mont text-[10px] font-semibold leading-normal tracking-wide text-[#16161680]">
                Device
              </div>
              <div className="flex w-[220px] items-center gap-x-[5px]">
                <div>
                  <MapBlobIcon />
                </div>
                <div className="font-mont text-[12px] font-semibold leading-normal tracking-wide text-[#161616]">
                  {info.getValue().deviceId}
                  {info.getValue().Network}
                </div>
              </div>
              <div className="flex flex-col gap-y-[10px]">
                <div className="font-mont text-[10px] font-semibold leading-normal tracking-wide text-[#16161680]">
                  Orientation
                </div>
                <div className="flex h-[25px] w-[120px] flex-shrink-0 items-center justify-center gap-x-[10px] rounded-[5px] bg-white">
                  <button className=" flex items-center rounded-[5px] p-[2px] font-mont text-[10px] font-semibold leading-normal tracking-wide text-[#000] focus:bg-[#5283ED] focus:text-white focus:outline-none active:bg-[#5283ED] active:text-white">
                    Front
                  </button>
                  <button className=" flex items-center rounded-[5px] p-[2px] font-mont text-[10px] font-semibold leading-normal tracking-wide text-[#000] focus:bg-[#5283ED] focus:text-white focus:outline-none active:bg-[#5283ED] active:text-white">
                    Up
                  </button>
                  <button className=" flex items-center rounded-[5px] p-[2px] font-mont text-[10px] font-semibold leading-normal tracking-wide text-[#000] focus:bg-[#5283ED] focus:text-white focus:outline-none active:bg-[#5283ED] active:text-white">
                    Both
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      },
    },
    {
      header: () => {
        return <></>;
      },
      accessorKey: "photoInformation",
      cell: (info: {
        getValue: () => {
          photoId: string;
          recordedAt: string;
        };
      }) => {
        return (
          <div>
            <div className="mb-[6px] flex flex-col gap-y-[5px]">
              <div className="font-mont text-[10px] font-semibold leading-normal tracking-wide text-[#16161680]">
                Recorded at
              </div>
              <div className="flex w-[220px] items-center gap-x-[5px]">
                <div className="font-mont text-[12px] font-semibold leading-normal tracking-wide text-[#161616]">
                  {info.getValue().recordedAt}
                </div>
              </div>
              <div className="flex flex-col gap-y-[5px]">
                <div className="font-mont text-[10px] font-semibold leading-normal tracking-wide text-[#16161680]">
                  Photo ID
                </div>
                <div className="flex  flex-shrink-0 font-mont text-[12px] font-semibold leading-normal text-[#161616]">
                  {info.getValue().photoId}
                </div>
              </div>
            </div>
          </div>
        );
      },
    },
    {
      header: () => {
        return <></>;
      },
      accessorKey: "deploymentInformation",
      cell: (info: {
        getValue: () => {
          deployment: string;
          url: string;
        };
      }) => {
        return (
          <div>
            <div className="mb-[6px] flex flex-col gap-y-[5px]">
              <div className="font-mont text-[10px] font-semibold leading-normal tracking-wide text-[#16161680]">
                Deployment
              </div>
              <div className="flex w-[220px] items-center gap-x-[5px]">
                <div className="font-mont text-[12px] font-semibold leading-normal tracking-wide text-[#161616]">
                  {info.getValue().deployment}
                </div>
              </div>
              <div className="flex flex-col gap-y-[5px]">
                <div className="font-mont text-[10px] font-semibold leading-normal tracking-wide text-[#16161680]">
                  URL
                </div>
                <div className="flex flex-shrink-0 cursor-pointer items-center gap-x-[2px] font-mont text-[12px] font-semibold leading-normal text-[#161616]">
                  <div>{info.getValue().url}</div>
                  <div>
                    <LinkOpenerIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      },
    },
    {
      header: () => {
        return <></>;
      },
      accessorKey: "hardwareId",
      cell: (info: { getValue: () => string }) => {
        return (
          <div>
            <div className="mb-[50px] flex flex-col items-start gap-y-[5px]">
              <div className="font-mont text-[10px] font-semibold leading-normal tracking-wide text-[#16161680]">
                Hardware Id
              </div>
              <div className="flex w-[220px] items-center gap-x-[5px]">
                <div className="font-mont text-[12px] font-semibold leading-normal tracking-wide text-[#161616]">
                  {info.getValue()}
                </div>
              </div>
            </div>
          </div>
        );
      },
    },
  ];

  const [data, setData] = React.useState(() => [...defaultData]);
  const [expandedRows, setExpandedRows] = React.useState([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleRowToggle = (ids: string | any[]) => {
    if (!Array.isArray(ids)) {
      ids = [ids]; // Convert to array if it's a single id
    }

    setExpandedRows((prevExpandedRows) => {
      const newExpandedRows = [...prevExpandedRows];
      if (ids.length > 0 && Array.isArray(ids)) {
        ids.forEach((id) => {
          if (newExpandedRows.includes(id as never)) {
            newExpandedRows.splice(newExpandedRows.indexOf(id as never), 1);
          } else {
            newExpandedRows.push(id as never);
          }
        });
      }

      return newExpandedRows;
    });
  };

  return (
    <div className="w-[100%] p-2">
      <table className="w-[100%] border-separate border-spacing-y-[8px]">
        <thead>
          {table
            .getHeaderGroups()
            .map(
              (headerGroup: {
                id: React.Key | null | undefined;
                headers: any[];
              }) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="mb-2 px-4 font-mont  text-[10px] text-[#8B8B8B] "
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </th>
                  ))}
                </tr>
              ),
            )}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row: any) => (
            <React.Fragment key={row.id}>
              <tr
                key={row.id}
                className={`rounded-5 h-[44px] bg-[#F5F5F5] ${
                  expandedRows.includes(row.id as never) ? "expanded" : ""
                }`}
              >
                {row.getVisibleCells().map((cell: any) => (
                  <td key={cell.id}>
                    <div className="m-2 flex justify-center">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </div>
                  </td>
                ))}
              </tr>
              {expandedRows.includes(row.id as never) && (
                <tr>
                  <td colSpan={columns.length}>
                    <div className="rounded-[3px] bg-[#F5F5F5] p-2">
                      <AccordionDemo />
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <div className="h-4" />
    </div>
  );
};
