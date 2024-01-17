import * as React from "react";
import { MapBlobIcon, LinkOpenerIcon } from "@/assets/misc";
import { AccordionDemo } from "@/components/blob/accordion/accordion";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

type TableData = {
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
    device: {
      deviceId: "GS1244 • 1535142",
      Network: "Lora",
    },
    photoInformation: {
      recordedAt: "Aug 11, 2022 4:03:58 PM",
      photoId: "photo-292123..",
    },
    deploymentInformation: {
      deployment: "Birmingham City",
      url: "https://baasuisab..",
    },
    hardwareId: "photo-292123..",
  },
  {
    device: {
      deviceId: "GS1244 • 1535142",
      Network: "Lora",
    },
    photoInformation: {
      recordedAt: "Aug 11, 2022 4:03:58 PM",
      photoId: "photo-292123..",
    },
    deploymentInformation: {
      deployment: "Birmingham City",
      url: "https://baasuisab..",
    },
    hardwareId: "photo-292123.....",
  },
  {
    device: {
      deviceId: "GS1244 • 1535142",
      Network: "Lora",
    },
    photoInformation: {
      recordedAt: "Aug 11, 2022 4:03:58 PM",
      photoId: "photo-292123..",
    },
    deploymentInformation: {
      deployment: "Birmingham City",
      url: "https://baasuisab..",
    },
    hardwareId: "photo-292123.....",
  },
  {
    device: {
      deviceId: "GS1244 • 1535142",
      Network: "Lora",
    },
    photoInformation: {
      recordedAt: "Aug 11, 2022 4:03:58 PM",
      photoId: "photo-292123..",
    },
    deploymentInformation: {
      deployment: "Birmingham City",
      url: "https://baasuisab..",
    },
    hardwareId: "photo-292123.....",
  },
];

export const PhotoComparisonTable = () => {
  const columns = [
    {
      id: "select",
      header: ({ table }: any) => <></>,
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
        return <div>Device</div>;
      },
      accessorKey: "device",
      cell: (info: any) => {
        return (
          <div className="flex gap-x-[5px]">
            <div>
              <MapBlobIcon />
            </div>
            <div className="font-mont text-[12px] font-semibold leading-normal tracking-wide text-[#161616]">
              {info.getValue().deviceId}
              {info.getValue().Network}
            </div>
          </div>
        );
      },
    },
    {
      header: () => {
        return <div>Recorded At</div>;
      },
      accessorKey: "photoInformation",
      cell: (info: {
        getValue: () => {
          recordedAt: string;
          photoId: string;
        };
      }) => {
        return (
          <div>
            <div className="flex flex-col gap-y-[5px]">
              <div className="font-mont text-[12px] font-semibold leading-normal tracking-wide text-[#161616]">
                {info.getValue().recordedAt}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      header: () => {
        return <div>Photo ID</div>;
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
              <div className="flex  flex-shrink-0 font-mont text-[12px] font-semibold leading-normal text-[#161616]">
                {info.getValue().photoId}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      header: () => {
        return <div>URL</div>;
      },
      accessorKey: "deploymentInformation",
      cell: (info: {
        getValue: () => {
          deployment: string;
          url: string;
        };
      }) => {
        return (
          <div className="flex flex-col gap-y-[5px]">
            <div className="flex flex-shrink-0 cursor-pointer items-center gap-x-[2px] font-mont text-[12px] font-semibold leading-normal text-[#161616]">
              <div>{info.getValue().url}</div>
              <div>
                <LinkOpenerIcon />
              </div>
            </div>
          </div>
        );
      },
    },
    {
      header: () => {
        return <div>Orientation</div>;
      },
      accessorKey: "Orientation",
      cell: (info: { getValue: () => string }) => {
        return (
          <div className="flex flex-col gap-y-[10px]">
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
