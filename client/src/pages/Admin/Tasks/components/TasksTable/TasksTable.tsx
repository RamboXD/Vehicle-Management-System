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
import { ModalTask } from "@/pages/Admin/components/modalTask";
import { TaskRega } from "@/pages/Admin/types/types";
import { ProgressIndicator } from "@/pages/Admin/components/progressPage";
import $api from "@/http";

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
  const [data, setData] = React.useState<Task[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [progress, setProgress] = React.useState(0);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [profileData, setProfileData] = React.useState<TaskRega>({
    title: "",
    description: "",
    whereFrom: "",
    whereTo: "",
    distance: 0,
  });
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
  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     setIsLoading(true);
  //     setProgress(30); // Initial progress

  //     try {
  //       // const response = await axios.get(
  //       //   "https://your-api-endpoint.com/drivers"
  //       // );
  //       // setData(response.data); // Assuming the response data is the array of drivers
  //       setData(dataX);
  //       setProgress(100); // Complete progress
  //       setIsLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       setIsLoading(false); // Stop loading even if there is an error
  //       setProgress(100); // Complete progress even in case of an error
  //     }
  //   };

  //   fetchData();
  // }, []);

  React.useEffect(() => {
    let isDataFetched = false;
    setIsLoading(true);

    // Function to fetch data
    const fetchData = async () => {
      try {
        const response = await $api.get("/task/tasks/");
        console.log(response);
        setData(response.data.tasks); // Assuming the response data is the array of drivers
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
        <ModalTask
          content={"Create Task"}
          taskData={profileData}
          setTaskData={setProfileData}
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
