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
import { Modal } from "@/pages/Admin";
import { Driver, DriverProfileRega } from "../../types/types";

const data: Driver[] = [
  {
    DriverID: "6de90cb4-3cd2-4000-a4e2-41c9f78aee5b",
    UserID: "f5cf02d2-15f8-4628-b1d0-2b0181cdbd98",
    Government: "gov-id-123",
    Name: "John",
    Surname: "Doe",
    MiddleName: "Allen",
    Address: "123 Main Street",
    Phone: "555-1234",
    Email: "john.doe@example.com",
    DrivingLicenseCode: "ABCD1234",
  },
  {
    DriverID: "7fb90dc4-4cd2-4001-b5e2-41c9f78aee6c",
    UserID: "g6cf02d2-25f8-4629-c2d0-3b0181cdbd99",
    Government: "gov-id-456",
    Name: "Alice",
    Surname: "Smith",
    MiddleName: "Beth",
    Address: "456 Elm Street",
    Phone: "555-5678",
    Email: "alice.smith@example.com",
    DrivingLicenseCode: "EFGH5678",
  },
  {
    DriverID: "8gd91ed5-5ed3-5002-c6f3-52d9f89bfe7d",
    UserID: "h7dg03e3-35g9-5730-d3e1-4c0292eceb00",
    Government: "gov-id-789",
    Name: "Bob",
    Surname: "Johnson",
    MiddleName: "Charles",
    Address: "789 Maple Avenue",
    Phone: "555-9012",
    Email: "bob.johnson@example.com",
    DrivingLicenseCode: "IJKL9012",
  },
  {
    DriverID: "9he92fe6-6fe4-6003-d7g4-63eaf9acf8ee",
    UserID: "i8eh04f4-45ha-6841-e4f2-5d0393fdec11",
    Government: "gov-id-101",
    Name: "Carol",
    Surname: "Williams",
    MiddleName: "Diane",
    Address: "101 Oak Circle",
    Phone: "555-3456",
    Email: "carol.williams@example.com",
    DrivingLicenseCode: "MNOP3456",
  },
  {
    DriverID: "afg93gg7-7gh5-7004-e8h5-74fbg0bdg9ff",
    UserID: "j9fi05g5-55ib-7942-f5g3-6e0494gdfg22",
    Government: "gov-id-202",
    Name: "David",
    Surname: "Brown",
    MiddleName: "Edward",
    Address: "202 Pine Street",
    Phone: "555-7890",
    Email: "david.brown@example.com",
    DrivingLicenseCode: "QRST7890",
  },
];

export const columns: ColumnDef<Driver>[] = [
  {
    id: "fullName",
    header: "Full Name",
    accessorFn: (row) => `${row.Name} ${row.Surname}`,
    cell: ({ getValue }) => {
      const fullName = getValue() as string; // Cast the value to string
      return <div className="capitalize">{fullName}</div>;
    },
  },
  {
    accessorKey: "Email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("Email")}</div>,
  },
  {
    accessorKey: "DrivingLicenseCode",
    header: "License Code",
    cell: ({ row }) => <div>{row.getValue("DrivingLicenseCode")}</div>,
  },
  {
    accessorKey: "Phone",
    header: "Phone",
    cell: ({ row }) => <div>{row.getValue("Phone")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const driver = row.original;

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
              onClick={() => navigator.clipboard.writeText(driver.DriverID)}
            >
              Copy Driver ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Driver Details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function DriverTable() {
  const [profileData, setProfileData] = React.useState<DriverProfileRega>({
    user: {
      email: "",
      password: "",
    },
    driver: {
      government: "",
      name: "",
      surname: "",
      middleName: "",
      address: "",
      phone: "",
      email: "",
      drivingLicenseCode: "",
    },
  });
  console.log(profileData);
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
          className="max-w-sm mr-5"
        />
        <Modal
          content={"Create Driver"}
          profileData={profileData}
          setProfileData={setProfileData}
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
