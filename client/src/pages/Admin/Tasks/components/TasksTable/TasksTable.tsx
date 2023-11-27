import * as React from "react";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const data: Task[] = [
  {
    TaskID: "50e85d40-2a3a-4245-a824-44296eda8ba7",
    AssignedDriverID: null,
    Title: "Go from Mega Silkway to Baiterek",
    Description:
      "Arrive at 11:00am to Mega Silkway and get to Baiterek until 12:00pm",
    Status: "not_assigned",
    WhereFrom: "Mega Silkway",
    WhereTo: "Baiterek",
    Distance: 5.9,
  },
  {
    TaskID: "60f96e51-3b4b-5356-b925-56397fea9c8",
    AssignedDriverID: "7fb90dc4-4cd2-4001-b5e2-41c9f78aee6c",
    Title: "Deliver documents to City Hall",
    Description:
      "Pick up documents from the office and deliver them to the City Hall by 3:00pm",
    Status: "in_progress",
    WhereFrom: "Office",
    WhereTo: "City Hall",
    Distance: 3.2,
  },
  {
    TaskID: "71g07f62-4c5c-6467-ca36-674a8feba9d",
    AssignedDriverID: "8gd91ed5-5ed3-5002-c6f3-52d9f89bfe7d",
    Title: "Airport pickup",
    Description:
      "Pick up client from the airport and drop them at the downtown hotel",
    Status: "finished",
    WhereFrom: "Airport",
    WhereTo: "Downtown Hotel",
    Distance: 12.5,
  },
  {
    TaskID: "82h18g73-5d6d-7578-db47-785b9g0cb0e",
    AssignedDriverID: "9he92fe6-6fe4-6003-d7g4-63eaf9acf8ee",
    Title: "Equipment transport to new office",
    Description:
      "Transport all marked equipment from the old office to the new location",
    Status: "not_assigned",
    WhereFrom: "Old Office",
    WhereTo: "New Office",
    Distance: 7.8,
  },
  {
    TaskID: "93i29h84-6e7e-8689-ec58-896ca1d1c1f",
    AssignedDriverID: null,
    Title: "Urgent parcel delivery",
    Description:
      "Deliver the urgent parcel to the specified address without delay",
    Status: "in_progress",
    WhereFrom: "Warehouse",
    WhereTo: "Specified Address",
    Distance: 4.4,
  },
];

export type Task = {
  TaskID: string;
  AssignedDriverID: string | null;
  Title: string;
  Description: string;
  Status: "not_assigned" | "in_progress" | "finished";
  WhereFrom: string;
  WhereTo: string;
  Distance: number;
};

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "Status",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const statusValue = row.getValue("Status");
      let displayValue = "";

      switch (statusValue) {
        case "not_assigned":
          displayValue = "Not Assigned";
          break;
        case "in_progress":
          displayValue = "In Progress";
          break;
        case "finished":
          displayValue = "Finished";
          break;
      }

      return <div className="m-4">{displayValue}</div>;
    },
  },
  {
    accessorKey: "Title",
    header: "Title",
    cell: ({ row }) => <div>{row.getValue("Title")}</div>,
  },
  {
    accessorKey: "Description",
    header: "Description",
    cell: ({ row }) => <div>{row.getValue("Description")}</div>,
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const task = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(task.TaskID)}
            >
              Copy Task ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Task Details</DropdownMenuItem>
            <DropdownMenuItem>Update Status</DropdownMenuItem>
            <DropdownMenuItem>Reassign Task</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function TasksTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  const globalFilterValue = table.getState().globalFilter ?? "";
  const onGlobalFilterChange = (value: string) => {
    table.setGlobalFilter(value);
  };
  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter..."
          value={globalFilterValue}
          onChange={(event) => onGlobalFilterChange(event.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
