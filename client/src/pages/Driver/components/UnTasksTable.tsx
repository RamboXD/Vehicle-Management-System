import * as React from "react";
import { CaretSortIcon, ChevronDownIcon } from "@radix-ui/react-icons";
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

export function UnTasksTable() {
  const [currentTask, setCurrentTask] = React.useState<any>(null);
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

  const columns: ColumnDef<Task>[] = [
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
      id: "assign",
      header: "Assign",
      cell: ({ row }) => {
        return (
          <Button
            onClick={() => assignTask(row.original.TaskID)}
            disabled={!!currentTask}
          >
            Assign to Me
          </Button>
        );
      },
    },
  ];
  const assignTask = async (taskId: string) => {
    if (currentTask) {
      console.log("A task is already assigned.");
      return;
    }

    try {
      const response = await $api.post(`/task/tasks/assign/${taskId}`);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      console.log(response);
    } catch (error) {
      console.error("Error assigning task:", error);
    }
  };
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
        const response = await $api.get("/task/tasks/unassigned");
        console.log(response);
        setData(response.data.tasks); // Assuming the response data is the array of drivers
        const responseTask = await $api.get("/task/tasks/my-active");
        console.log(responseTask);
        if (responseTask.data && responseTask.data.status === "success") {
          setCurrentTask(
            responseTask.data.message === "No Active Task"
              ? null
              : responseTask.data.task[0]
          );
        }
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
  const finishTask = async (taskId: string) => {
    try {
      const response = await $api.post(`/task/tasks/finish/${taskId}`);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      console.log(response);
    } catch (error) {
      console.error("Error finishing task:", error);
    }
  };
  console.log(currentTask);
  return (
    <div className="w-full">
      <div className="mb-4 p-4 bg-blue-500 rounded shadow-lg">
        <h3 className="text-lg font-semibold text-white">Current Task:</h3>
        {currentTask ? (
          <div className="mt-4 bg-blue-600 p-3 rounded">
            <p className="text-white text-sm">
              Title: <span className="font-bold">{currentTask.Title}</span>
            </p>
            <p className="text-white text-sm mt-2">
              Description:{" "}
              <span className="font-bold">{currentTask.Description}</span>
            </p>
            <div className="mt-4">
              <Button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => finishTask(currentTask.TaskID)}
              >
                Finish
              </Button>
            </div>
          </div>
        ) : (
          <div className="mt-4 bg-blue-600 p-3 rounded">
            <p className="text-white text-sm">
              No task in process at the current moment.
            </p>
          </div>
        )}
      </div>

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
