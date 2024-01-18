import * as React from "react";
import { MapBlobIcon } from "@/assets/misc";
import { PhotoAccordion } from "@/components/photos/photo-accordion/accordion";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

type TableData = {
  thumbNail: string;
  Serial: string;
  Pole: string;
  Deployment: string;
  Network: string;
  HardwareId: string;
  actions: string;
};

const defaultData: TableData[] = [
  {
    thumbNail: "https://i.postimg.cc/kMvpxHYX/20230629-T234418-Z-188875-2.png",
    Serial: "GS1243",
    Pole: "4021",
    Deployment: "Birmingham City",
    Network: "Lora",
    HardwareId: "1f0010000c...",
    actions: "View Gallery",
  },
  {
    thumbNail: "https://i.postimg.cc/kMvpxHYX/20230629-T234418-Z-188875-2.png",
    Serial: "GS1243",
    Pole: "4021",
    Deployment: "Birmingham City",
    Network: "Lora",
    HardwareId: "1f0010000c...",
    actions: "View Gallery",
  },
  {
    thumbNail: "https://i.postimg.cc/kMvpxHYX/20230629-T234418-Z-188875-2.png",
    Serial: "GS1243",
    Pole: "4021",
    Deployment: "Birmingham City",
    Network: "Lora",
    HardwareId: "1f0010000c...",
    actions: "View Gallery",
  },
];

export const PhotoGalleryTable = () => {
  const columns = [
    {
      header: () => {
        return (
          <>
            <div className="flex items-center gap-x-[5px]">
              <div className="flex gap-x-[2px]">
                <div className="h-[6px] w-[1.5px] bg-[#828282]" />
                <div className="h-[6px] w-[1.5px] bg-[#828282]" />
              </div>
              <div>Thumbnail</div>
            </div>
          </>
        );
      },
      accessorKey: "thumbNail",
      cell: (info: { getValue: () => string }) => {
        return (
          <>
            <div className="flex">
              <img src={info.getValue()} alt="" className="h-[44px] w-[77px]" />
            </div>
          </>
        );
      },
    },
    {
      header: () => {
        return (
          <>
            <div className="flex items-center  gap-x-[5px]">
              <div className="flex gap-x-[2px]">
                <div className="h-[6px] w-[1.5px] bg-[#828282]" />
              </div>
              <div>SERIAL</div>
            </div>
          </>
        );
      },
      accessorKey: "Serial",
      cell: (info: { getValue: () => string }) => {
        return (
          <>
            <div className="flex gap-x-[5px]">
              <div className="text-[8px]">
                <MapBlobIcon />
              </div>
              <div className="font-mont text-[10px] font-semibold text-[#161616]">
                {info.getValue()}
              </div>
            </div>
          </>
        );
      },
    },
    {
      header: () => {
        return (
          <>
            <div className="flex items-center gap-x-[5px]">
              <div className="flex gap-x-[2px]">
                <div className="h-[6px] w-[1.5px] bg-[#828282]" />
              </div>
              <div>POLE</div>
            </div>
          </>
        );
      },
      accessorKey: "Pole",
      cell: (info: { getValue: () => string }) => {
        return (
          <>
            <div className="ml-[10px] font-mont text-[10px] font-normal text-[#161616]">
              {info.getValue()}
            </div>
          </>
        );
      },
    },
    {
      header: () => {
        return (
          <>
            <div className="flex items-center gap-x-[5px]">
              <div className="flex gap-x-[2px]">
                <div className="h-[6px] w-[1.5px] bg-[#828282]" />
              </div>
              <div>Deployment</div>
            </div>
          </>
        );
      },
      accessorKey: "Deployment",
      cell: (info: { getValue: () => string }) => {
        return (
          <>
            <div className="ml-[10px] font-mont text-[10px] font-normal text-[#161616]">
              {info.getValue()}
            </div>
          </>
        );
      },
    },
    {
      header: () => {
        return (
          <>
            <div className="flex items-center gap-x-[5px]">
              <div className="flex gap-x-[2px]">
                <div className="h-[6px] w-[1.5px] bg-[#828282]" />
              </div>
              <div>Network</div>
            </div>
          </>
        );
      },
      accessorKey: "Network",
      cell: (info: { getValue: () => string }) => {
        return (
          <>
            <div className="ml-[10px] font-mont text-[10px] font-normal text-[#161616]">
              {info.getValue()}
            </div>
          </>
        );
      },
    },
    {
      header: () => {
        return (
          <>
            <div className="flex items-center gap-x-[5px]">
              <div className="flex gap-x-[2px]">
                <div className="h-[6px] w-[1.5px] bg-[#828282]" />
              </div>
              <div>Hardware ID</div>
            </div>
          </>
        );
      },
      accessorKey: "HardwareId",
      cell: (info: { getValue: () => string }) => {
        return (
          <>
            <div className="ml-[10px] font-mont text-[10px] font-normal text-[#161616]">
              {info.getValue()}
            </div>
          </>
        );
      },
    },
    {
      header: () => {
        return (
          <>
            <div className="flex items-center gap-x-[5px]">
              <div className="flex gap-x-[2px]">
                <div className="h-[6px] w-[1.5px] bg-[#828282]" />
              </div>
              <div>Actions</div>
            </div>
          </>
        );
      },
      accessorKey: "actions",
      cell: (item: {
        row: {
          id: string;
        };
      }) => {
        return (
          <>
            <div
              className={`flex h-[32px] w-[80px] flex-shrink-0 cursor-pointer items-center justify-center rounded-[4px] ${
                expandedRows.includes(item.row.id as never)
                  ? "bg-white text-black"
                  : "bg-[#3B3C4F] text-white"
              }`}
              onClick={() => handleRowToggle(item.row.id)}
            >
              <div className="font-mont text-[8px] font-semibold uppercase leading-[9px]">
                {expandedRows.includes(item.row.id as never)
                  ? "CLOSE GALLERY"
                  : "VIEW GALLERY"}
              </div>
            </div>
          </>
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

  const handleRowToggle = (id: string) => {
    setExpandedRows((prevExpandedRows: any) => {
      if (prevExpandedRows.includes(id)) {
        return prevExpandedRows.filter((rowId: string) => rowId !== id);
      } else {
        return [...prevExpandedRows, id];
      }
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
                      className="mb-2 px-2 font-mont  text-[10px] text-[#8B8B8B] "
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
                    <div>
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
                  <td colSpan={columns.length + 1}>
                    <div className="rounded-[3px] bg-[#F5F5F5] p-2">
                      {/* Content to be displayed when row is expanded */}
                      <PhotoAccordion />
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
