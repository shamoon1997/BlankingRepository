import * as React from "react";
import { MapBlobIcon } from "@/assets/misc";
import { useSelectedPhotos } from "@/state";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

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
              checked={true}
              {...{
                onChange: item.row.getToggleSelectedHandler(),
              }}
            />
          </>
        );
      },
    },
    {
      header: () => {
        return <>Device</>;
      },
      accessorKey: "device",
      cell: () => {
        return (
          <div className="flex gap-x-[5px]">
            <div>
              <MapBlobIcon />
            </div>
            <div className="font-mont text-[12px] font-semibold leading-normal tracking-wide text-[#161616]">
              GS1234.. Lora
            </div>
          </div>
        );
      },
    },
    {
      header: () => {
        return <>Recorded At</>;
      },
      accessorKey: "recorded_at",
      cell: (info: { getValue: () => string }) => {
        return (
          <div>
            <div className="flex flex-col gap-y-[5px]">
              <div className="font-mont text-[12px] font-semibold leading-normal tracking-wide text-[#161616]">
                {info.getValue()}
              </div>
            </div>
          </div>
        );
      },
    },
  ];

  const selectedPhotos = useSelectedPhotos();
  const [data, setData] = React.useState(() => [...selectedPhotos]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

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
                      className="mb-2 font-mont  text-[10px] text-[#8B8B8B] "
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
              <tr key={row.id} className="rounded-5 h-[44px] bg-[#F5F5F5]">
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
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <div className="h-4" />
    </div>
  );
};
