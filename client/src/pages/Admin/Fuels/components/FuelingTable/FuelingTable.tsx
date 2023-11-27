import * as React from "react";
import { ChevronDownIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
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
import { ModalFueling } from "@/pages/Admin/components/modalFueling";
import { FuelingProfileRega } from "@/pages/Admin/Drivers/types/types";

const data: FuelingPerson[] = [
  {
    FuelingPersonID: "25e58ded-58d2-48df-8118-8250072d268a",
    UserID: "f7743878-d1a0-429f-a829-2a6d67e4a009",
    Certification: "Certified Fuel Handler",
    Name: "John",
    Surname: "Doe",
    MiddleName: "L",
  },
  {
    FuelingPersonID: "35g69fgh-68f2-49gf-9128-8250072d268b",
    UserID: "g8843988-e2b0-529f-b839-3b6d67e5b2a1",
    Certification: "Expert Fuel Technician",
    Name: "Alice",
    Surname: "Johnson",
    MiddleName: "M",
  },
  {
    FuelingPersonID: "45h70ghi-79g3-50hg-0239-9350183e378c",
    UserID: "h9954099-f3c1-630g-c840-4c7d78f6c3b2",
    Certification: "Fuel Safety Specialist",
    Name: "Bob",
    Surname: "Williams",
    MiddleName: "N",
  },
  {
    FuelingPersonID: "56i81ijk-80h4-71ij-1340-0461294f489d",
    UserID: "i0065010-g4d2-731h-d951-5d8e89g7d4c3",
    Certification: "Gas Handling Expert",
    Name: "Carol",
    Surname: "Brown",
    MiddleName: "O",
  },
  {
    FuelingPersonID: "67j92jkl-91i5-82jk-2451-1572305g59ae",
    UserID: "j1176121-h5e3-842i-e062-6e9f9ah8e5d4",
    Certification: "Petroleum Transfer Engineer",
    Name: "David",
    Surname: "Miller",
    MiddleName: "P",
  },
];

export type FuelingPerson = {
  FuelingPersonID: string;
  UserID: string;
  Certification: string;
  Name: string;
  Surname: string;
  MiddleName: string;
};

export const columns: ColumnDef<FuelingPerson>[] = [
  {
    id: "fullName",
    header: "Full Name",
    accessorFn: (row) => `${row.Name} ${row.Surname}`,
    cell: ({ getValue }) => (
      <div className="capitalize">{getValue() as string}</div>
    ),
  },
  {
    accessorKey: "Certification",
    header: "Certification",
    cell: ({ row }) => <div>{row.getValue("Certification")}</div>,
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const fuelingPerson = row.original;
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
              onClick={() =>
                navigator.clipboard.writeText(fuelingPerson.FuelingPersonID)
              }
            >
              Copy Fueling Person ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Fueling Person Details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function FuelingTable() {
  const [profileData, setProfileData] = React.useState<FuelingProfileRega>({
    user: {
      email: "",
      password: "",
    },
    fueling_person: {
      certification: "",
      name: "",
      surname: "",
      middleName: "",
    },
  });
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
        <ModalFueling
          content={"Create Fueling Person"}
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
