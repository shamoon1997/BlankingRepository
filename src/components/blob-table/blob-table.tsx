import * as React from "react";
import { MapBlobIcon, RefreshBlobIcon } from "@/assets/misc";
import * as Switch from "@radix-ui/react-switch";
import { AccordionDemo } from "@/components/common/accordion/accordion";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

type TableData = {
  Serial: string;
  Pole: string;
  Deployment: string;
  Network: string;
  HardwareId: string;
  DataEntryId: string;
  RecordedAt: string;
  Node: string;
  BlobsRemaining: string;
  Refresh: string;
};

const defaultData: TableData[] = [
  {
    Serial: "GS1243",
    Pole: "4021",
    Deployment: "Birmingham City",
    Network: "Lora",
    HardwareId: "1f0010000c...",
    DataEntryId: "xvdataentr...",
    RecordedAt: "Aug 11, 2022 15:01",
    Node: "5041652",
    BlobsRemaining: "321",
    Refresh: "string",
  },
  {
    Serial: "GS1243",
    Pole: "4021",
    Deployment: "Birmingham City",
    Network: "Lora",
    HardwareId: "1f0010000c...",
    DataEntryId: "xvdataentr...",
    RecordedAt: "Aug 11, 2022 15:01",
    Node: "5041652",
    BlobsRemaining: "321",
    Refresh: "string",
  },
  {
    Serial: "GS1243",
    Pole: "4021",
    Deployment: "Birmingham City",
    Network: "Lora",
    HardwareId: "1f0010000c...",
    DataEntryId: "xvdataentr...",
    RecordedAt: "Aug 11, 2022 15:01",
    Node: "5041652",
    BlobsRemaining: "321",
    Refresh: "string",
  },
  {
    Serial: "GS1243",
    Pole: "4021",
    Deployment: "Birmingham City",
    Network: "Lora",
    HardwareId: "1f0010000c...",
    DataEntryId: "xvdataentr...",
    RecordedAt: "Aug 11, 2022 15:01",
    Node: "5041652",
    BlobsRemaining: "321",
    Refresh: "string",
  },
];

export const BlobTable = () => {
  const columns = [
    {
      id: "select",
      header: ({ table }: any) => (
        <input
          type="checkbox"
          {...{
            checked: table.getIsAllPageRowsSelected(),
            indeterminate: table.getIsSomePageRowsSelected(),
            onChange: table.getToggleAllPageRowsSelectedHandler(),
            onClick: () =>
              handleRowToggle(
                table.getRowModel().rows.map((row: any) => row.id),
              ),
          }}
        />
      ),
      cell: (item: {
        row: { getIsSelected: () => any; getToggleSelectedHandler: () => any };
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
        return (
          <>
            <div className="flex items-center justify-center gap-x-[5px]">
              <div className="flex gap-x-[2px]">
                <div className="h-[6px] w-[1.5px] bg-[#828282]" />
                <div className="h-[6px] w-[1.5px] bg-[#828282]" />
              </div>
              <div>Serial</div>
            </div>
          </>
        );
      },
      accessorKey: "Serial",
      cell: (info: any) => {
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
            <div className="flex items-center justify-center gap-x-[5px]">
              <div className="flex gap-x-[2px]">
                <div className="h-[6px] w-[1.5px] bg-[#828282]" />
              </div>
              <div>Pole</div>
            </div>
          </>
        );
      },
      accessorKey: "Pole",
      cell: (info: { getValue: () => string }) => {
        return (
          <>
            <div className="font-mont text-[10px] font-normal text-[#161616]">
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
            <div className="flex items-center justify-center gap-x-[5px]">
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
            <div className="font-mont text-[10px] font-normal text-[#161616]">
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
            <div className="flex items-center justify-center gap-x-[5px]">
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
            <div className="font-mont text-[10px] font-normal text-[#161616]">
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
            <div className="flex items-center justify-center gap-x-[5px]">
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
            <div className="font-mont text-[10px] font-normal text-[#161616]">
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
            <div className="flex items-center justify-center gap-x-[5px]">
              <div className="flex gap-x-[2px]">
                <div className="h-[6px] w-[1.5px] bg-[#828282]" />
              </div>
              <div>Data Entry id</div>
            </div>
          </>
        );
      },
      accessorKey: "DataEntryId",
      cell: (info: { getValue: () => string }) => {
        return (
          <>
            <div className="font-mont text-[10px] font-normal text-[#161616]">
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
            <div className="flex items-center justify-center gap-x-[5px]">
              <div className="flex gap-x-[2px]">
                <div className="h-[6px] w-[1.5px] bg-[#828282]" />
              </div>
              <div>Recorded at</div>
            </div>
          </>
        );
      },
      accessorKey: "RecordedAt",
      cell: (info: { getValue: () => string }) => {
        return (
          <>
            <div className="font-mont text-[10px] font-normal text-[#161616]">
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
            <div className="flex items-center justify-center gap-x-[5px]">
              <div className="flex gap-x-[2px]">
                <div className="h-[6px] w-[1.5px] bg-[#828282]" />
              </div>
              <div>Node</div>
            </div>
          </>
        );
      },
      accessorKey: "Node",
      cell: (info: { getValue: () => string }) => {
        return (
          <>
            <div className="font-mont text-[10px] font-normal text-[#161616]">
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
            <div className="flex items-center justify-center gap-x-[5px]">
              <div className="flex gap-x-[2px]">
                <div className="h-[6px] w-[1.5px] bg-[#828282]" />
              </div>
              <div>Blobs Remaining</div>
            </div>
          </>
        );
      },
      accessorKey: "BlobsRemaining",
      cell: (info: { getValue: () => string }) => {
        return (
          <>
            <div className="font-mont text-[10px] font-normal text-[#161616]">
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
            <div className="flex items-center justify-center gap-x-[5px]">
              <div className="text-10 cursor-pointer text-right font-mont font-bold text-[#5283ED] underline">
                Refresh
              </div>
            </div>
          </>
        );
      },
      accessorKey: "Refresh",
      cell: () => {
        return (
          <>
            <div className="cursor-pointer">
              <Switch.Root
                className="shadow-blackA4 relative h-[15px] w-[32px] cursor-default rounded-[17px] border border-solid border-gray-500 bg-[#EDEDED] outline-none focus:shadow-[0_0_0_2px] focus:shadow-[#5283ED] data-[state=checked]:bg-[#5283ED]"
                id="airplane-mode"
              >
                <Switch.Thumb className="shadow-blackA4 block h-[10px] w-[12px] translate-x-0.5 rounded-full bg-white shadow-[0_2px_2px] transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]">
                  <RefreshBlobIcon className="ml-[1px] mt-[1px]" />
                </Switch.Thumb>
              </Switch.Root>
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
