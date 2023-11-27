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

const data: Vehicle[] = [
  {
    VehicleID: "885d291d-f8d7-4edc-bce5-4d7943b35089",
    Model: "Toyota Corolla",
    Year: 2022,
    LicensePlate: "ABCD1234",
    SeatingCapacity: 5,
    AssignedDriverID: null,
    LastMaintenanceCheck: "2023-01-01T00:00:00Z",
    TotalDistanceCovered: 5000,
    FuelCapacity: 50,
    FuelConsumed: 1500,
    Photo: "http://example.com/vehicle1.jpg",
    Status: "Inactive",
  },
  {
    VehicleID: "993e2d2a-e8f9-4bbf-a2d2-61a2b5c40956",
    Model: "Honda Civic",
    Year: 2021,
    LicensePlate: "EFGH5678",
    SeatingCapacity: 5,
    AssignedDriverID: "7fb90dc4-4cd2-4001-b5e2-41c9f78aee6c",
    LastMaintenanceCheck: "2023-03-15T00:00:00Z",
    TotalDistanceCovered: 8000,
    FuelCapacity: 45,
    FuelConsumed: 2000,
    Photo: "http://example.com/vehicle2.jpg",
    Status: "Active",
  },
  {
    VehicleID: "aa4e3d3b-f0a1-4dcb-833a-72b3c5d41077",
    Model: "Ford Focus",
    Year: 2020,
    LicensePlate: "IJKL9012",
    SeatingCapacity: 5,
    AssignedDriverID: "8gd91ed5-5ed3-5002-c6f3-52d9f89bfe7d",
    LastMaintenanceCheck: "2023-02-20T00:00:00Z",
    TotalDistanceCovered: 6000,
    FuelCapacity: 48,
    FuelConsumed: 1800,
    Photo: "http://example.com/vehicle3.jpg",
    Status: "Active",
  },
  {
    VehicleID: "bb5f4e4c-f213-5edc-944b-83c4d6e51188",
    Model: "Chevrolet Cruze",
    Year: 2019,
    LicensePlate: "MNOP3456",
    SeatingCapacity: 5,
    AssignedDriverID: "9he92fe6-6fe4-6003-d7g4-63eaf9acf8ee",
    LastMaintenanceCheck: "2023-04-10T00:00:00Z",
    TotalDistanceCovered: 4000,
    FuelCapacity: 52,
    FuelConsumed: 1600,
    Photo: "http://example.com/vehicle4.jpg",
    Status: "Inactive",
  },
  {
    VehicleID: "cc6g5f5d-g324-6efd-a5dc-94d5e7f62299",
    Model: "Subaru Impreza",
    Year: 2018,
    LicensePlate: "QRST7890",
    SeatingCapacity: 5,
    AssignedDriverID: null,
    LastMaintenanceCheck: "2023-05-05T00:00:00Z",
    TotalDistanceCovered: 3000,
    FuelCapacity: 50,
    FuelConsumed: 1400,
    Photo: "http://example.com/vehicle5.jpg",
    Status: "Active",
  },
];

export type Vehicle = {
  VehicleID: string;
  Model: string;
  Year: number;
  LicensePlate: string;
  SeatingCapacity: number;
  AssignedDriverID: string | null;
  LastMaintenanceCheck: string;
  TotalDistanceCovered: number;
  FuelCapacity: number;
  FuelConsumed: number;
  Photo: string;
  Status: "Active" | "Inactive";
};
export const columns: ColumnDef<Vehicle>[] = [
  {
    accessorKey: "Status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="ml-4">{row.getValue("Status")}</div>,
  },
  {
    accessorKey: "Model",
    header: "Model",
    cell: ({ row }) => <div>{row.getValue("Model")}</div>,
  },
  {
    accessorKey: "Year",
    header: "Year",
    cell: ({ row }) => <div>{row.getValue("Year")}</div>,
  },
  {
    accessorKey: "LicensePlate",
    header: "License Plate",
    cell: ({ row }) => <div>{row.getValue("LicensePlate")}</div>,
  },
  {
    accessorKey: "SeatingCapacity",
    header: "Seating Capacity",
    cell: ({ row }) => <div>{row.getValue("SeatingCapacity")}</div>,
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const vehicle = row.original;
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
              onClick={() => navigator.clipboard.writeText(vehicle.VehicleID)}
            >
              Copy Vehicle ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit Vehicle Details</DropdownMenuItem>
            <DropdownMenuItem>View Maintenance History</DropdownMenuItem>
            <DropdownMenuItem>Assign Driver</DropdownMenuItem>
            <DropdownMenuItem>Deactivate Vehicle</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function VehiclesTable() {
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
