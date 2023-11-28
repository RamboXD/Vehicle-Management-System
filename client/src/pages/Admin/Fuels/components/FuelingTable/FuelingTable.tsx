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
import { FuelingProfileRega } from "@/pages/Admin/types/types";
import { ProgressIndicator } from "@/pages/Admin/components/progressPage";
import $api from "@/http";
import { useNavigate } from "react-router-dom";

export type FuelingPerson = {
  FuelingPersonID: string;
  UserID: string;
  Certification: string;
  Name: string;
  Surname: string;
  MiddleName: string;
};

export function FuelingTable() {
  const [data, setData] = React.useState<FuelingPerson[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [progress, setProgress] = React.useState(0);
  const navigate = useNavigate();

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
  const columns: ColumnDef<FuelingPerson>[] = [
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
              <DropdownMenuItem>
                {" "}
                <Button
                  onClick={() => {
                    navigate(`/admin/fuel/${fuelingPerson.FuelingPersonID}`);
                  }}
                >
                  View Fueling person Details
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
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
  React.useEffect(() => {
    let isDataFetched = false;
    setIsLoading(true);

    // Function to fetch data
    const fetchData = async () => {
      try {
        const response = await $api.get("/fueling_person/fueling_persons/");
        console.log(response);

        setData(response.data.fuelingPersons); // Assuming the response data is the array of drivers
        isDataFetched = true;
        if (progress >= 100) {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        isDataFetched = true;
        if (progress >= 100) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    // Function to increment progress
    const incrementProgress = () => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          if (isDataFetched) {
            setIsLoading(false);
          }
          return 100;
        }
        return prevProgress + 10; // Increment by 10 every 200ms
      });
    };

    let timer = setInterval(incrementProgress, 200); // Update progress every 200ms

    return () => clearInterval(timer); // Cleanup interval on component unmount
  }, []);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ProgressIndicator value={progress} />
      </div>
    );
  }
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
