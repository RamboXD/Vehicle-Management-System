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

const data: MaintenancePerson[] = [
  {
    MaintenancePersonID: "0e686d0f-2182-4b2d-894b-3278b53a76c9",
    UserID: "4fe5b7ad-84a2-4531-bd24-78b8dbfd39ab",
    Name: "John",
    Surname: "Doe",
    MiddleName: "Middle",
    Qualifications: "Maintenance Person",
    Experience: "5 years",
  },
  {
    MaintenancePersonID: "1f787e10-2293-4c3e-895c-4389b54b77d0",
    UserID: "5gf6c8be-95b3-5642-ce35-89c9ebfd40bc",
    Name: "Alice",
    Surname: "Smith",
    MiddleName: "Ann",
    Qualifications: "Senior Technician",
    Experience: "7 years",
  },
  {
    MaintenancePersonID: "2g898f21-33a4-5d4f-9a6d-549ac65c88e1",
    UserID: "6hg7d9cf-a6c4-6753-df46-9ad0fbge51cd",
    Name: "Bob",
    Surname: "Johnson",
    MiddleName: "Brian",
    Qualifications: "Electrical Specialist",
    Experience: "4 years",
  },
  {
    MaintenancePersonID: "3h9a0g32-44b5-6e60-ab7e-65abdc7f99f2",
    UserID: "7ij8e0dg-b7d5-7864-eg57-abd1gchf62de",
    Name: "Carol",
    Surname: "Williams",
    MiddleName: "Cathy",
    Qualifications: "Mechanical Engineer",
    Experience: "6 years",
  },
  {
    MaintenancePersonID: "4i0b1h43-55c6-7f71-bc8f-76cdei8j0ag3",
    UserID: "8jk9f1eh-c8e6-8975-fg68-bce2jdi7i3ef",
    Name: "David",
    Surname: "Brown",
    MiddleName: "Derek",
    Qualifications: "HVAC Expert",
    Experience: "8 years",
  },
];

export type MaintenancePerson = {
  MaintenancePersonID: string;
  UserID: string;
  Name: string;
  Surname: string;
  MiddleName: string;
  Qualifications: string;
  Experience: string;
};

export const columns: ColumnDef<MaintenancePerson>[] = [
  {
    id: "fullName",
    header: "Full Name",
    accessorFn: (row) => `${row.Name} ${row.Surname}`,
    cell: ({ getValue }) => (
      <div className="capitalize">{getValue() as string}</div>
    ),
  },
  {
    accessorKey: "Qualifications",
    header: "Qualifications",
    cell: ({ row }) => <div>{row.getValue("Qualifications")}</div>,
  },
  {
    accessorKey: "Experience",
    header: "Experience",
    cell: ({ row }) => <div>{row.getValue("Experience")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const maintenancePerson = row.original;
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
                navigator.clipboard.writeText(
                  maintenancePerson.MaintenancePersonID
                )
              }
            >
              Copy Maintenance Person ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Maintenance Person Details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function MaintenanceTable() {
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
