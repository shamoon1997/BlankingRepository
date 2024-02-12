import * as React from "react";
import { MapBlobIcon } from "@/assets/misc";
import { PhotoAccordion } from "@/components/photos/photo-accordion/accordion";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useGetPhotoGallery } from "@/api/hooks/photos/use-photo-gallery";

export const PhotoGalleryTable = () => {
  const { data, error, isLoading } = useGetPhotoGallery([
    "0d0026000e5030475837322000000001",
    "0d0028000e5030475837322000000001",
    "0d002b000e5030475837322000000001",
    "0d002c000e5030475837322000000001",
    "0d002d000e5030475837322000000001",
    "0d002e000e5030475837322000000001",
    "0d0033000e5030475837322000000001",
    "0d0036000e5030475837322000000001",
    "0d003e000e5030475837322000000001",
    "0e001e000e5030475837322000000001",
    "0e0021000e5030475837322000000001",
    "0e0024000e5030475837322000000001",
    "0f002a000e5030475837322000000001",
    "0f002d000e5030475837322000000001",
    "0f002f000e5030475837322000000001",
    "0f0032000e5030475837322000000001",
    "0f0035000e5030475837322000000001",
    "160021000c5030415738382000000001",
    "160025000e5030475837322000000001",
    "160027000e5030475837322000000001",
    "160028000e5030475837322000000001",
    "160029000e5030475837322000000001",
    "16002b000e5030475837322000000001",
    "16002c000e5030475837322000000001",
    "16002e000e5030475837322000000001",
    "16002f000e5030475837322000000001",
    "160032000e5030475837322000000001",
    "160033000e5030475837322000000001",
    "160037000e5030475837322000000001",
    "16003a000e5030475837322000000001",
    "1c0010000e5030475837322000000001",
    "29000f000e5030475837322000000001",
    "290011000e5030475837322000000001",
    "290012000e5030475837322000000001",
    "2a0011000e5030475837322000000001",
    "2a0012000e5030475837322000000001",
    "2a0015000e5030475837322000000001",
    "2a0018000e5030475837322000000001",
    "2a001b000e5030475837322000000001",
    "2a001c000e5030475837322000000001",
    "2a001f000e5030475837322000000001",
  ]);

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
      accessorKey: "photo_url",
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
              {/*This value would be dynamic*/}
              <div className="font-mont text-[10px] font-semibold text-[#161616]">
                GS123
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
            {/*This value would be dynamic*/}
            <div className="ml-[10px] font-mont text-[10px] font-normal text-[#161616]">
              12312312
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
            {/*This value would be dynamic*/}
            <div className="ml-[10px] font-mont text-[10px] font-normal text-[#161616]">
              Birmingham
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
            {/*This value would be dynamic*/}
            <div className="ml-[10px] font-mont text-[10px] font-normal text-[#161616]">
              Lora
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
      accessorKey: "hardware_id",
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
          original: {
            hardware_id: string;
          };
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
              onClick={() =>
                handleRowToggle(item.row.id, item.row.original.hardware_id)
              }
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

  const [expandedRows, setExpandedRows] = React.useState<string[]>([]);
  const [expandedHardwareIds, setExpandedHardwareIds] = React.useState<
    string[]
  >([]);

  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <>Loading....</>;
  }

  if (error) {
    return <>Something went wrong!</>;
  }
  const handleRowToggle = (id: string, hardware_id: string) => {
    setExpandedRows((prevExpandedRows: string[]) => {
      if (prevExpandedRows.includes(id)) {
        return []; // Close all rows
      } else {
        return [id]; // Open the clicked row
      }
    });

    setExpandedHardwareIds((prevExpandedHardwareIds: string[]) => {
      if (prevExpandedHardwareIds.includes(hardware_id)) {
        return []; // Close all galleries
      } else {
        return [hardware_id]; // Open the gallery of the clicked row
      }
    });
  };

  return (
    <div className="w-[100%] p-2">
      <table className="w-[100%] border-separate border-spacing-y-[8px]">
        <thead>
          {table &&
            table
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
          {table &&
            table.getRowModel().rows.map((row: any) => {
              const expandedIndex = expandedRows.indexOf(row.id as never);
              return (
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
                  {expandedIndex !== -1 && (
                    <tr>
                      <td colSpan={columns.length + 1}>
                        <div
                          className="rounded-[3px] bg-[#F5F5F5] p-2"
                          key={expandedIndex}
                        >
                          {/* Content to be displayed when row is expanded */}
                          <PhotoAccordion
                            hardware_id={
                              expandedHardwareIds[expandedIndex] as string
                            }
                          />
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
        </tbody>
      </table>
      <div className="h-4" />
    </div>
  );
};
