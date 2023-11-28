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
import { ModalVehicle } from "@/pages/Admin/components/modalVehicle";
import { VehicleRega } from "@/pages/Admin/types/types";
import { ProgressIndicator } from "@/pages/Admin/components/progressPage";
import $api from "@/http";
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

export function CreateFuelingTable() {
  const [data, setData] = React.useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [progress, setProgress] = React.useState(0);
  const [profileData, setProfileData] = React.useState<VehicleRega>({
    Model: "",
    Year: new Date().getFullYear(), // current year as default
    LicensePlate: "",
    SeatingCapacity: 0,
    LastMaintenanceCheck: new Date().toISOString().split("T")[0], // current date in YYYY-MM-DD format
    TotalDistanceCovered: 0.0,
    FuelCapacity: 0.0,
    FuelConsumed: 0.0,
    Photo: "", // Placeholder URL
    Status: "Inactive", // Default status
  });
  const [selectedVehicle, setSelectedVehicle] = React.useState<any>(null);
  const [isFuelingModalOpen, setIsFuelingModalOpen] = React.useState(false);

  // Function to open the Fueling Modal
  const openFuelingModal = (vehicleId: string) => {
    setSelectedVehicle(vehicleId);
    setIsFuelingModalOpen(true);
  };

  // Function to close the Fueling Modal
  const closeFuelingModal = () => {
    setIsFuelingModalOpen(false);
  };

  const handleFuelingSubmit = async (fuelingData: any) => {
    try {
      const response = await $api.post("/fuel/do", fuelingData);
      console.log(response);
      setTimeout(() => {
        window.location.reload(); // or use other methods to update the UI
      }, 2000);
    } catch (error) {
      console.error("Error submitting fueling data:", error);
    }
  };

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const columns: ColumnDef<Vehicle>[] = [
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
      id: "createFueling",
      header: "Fueling",
      cell: ({ row }) => (
        <Button onClick={() => openFuelingModal(row.original.VehicleID)}>
          Create Fueling Task
        </Button>
      ),
    },
  ];
  type FuelingData = {
    vehicleId: string;
    fuelingDate: string;
    fuelQuantity: number;
    fuelCost: number;
    gasStationName: string;
    fuelType: string;
    fuelingReceiptImage: string;
  };

  type FuelingModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (fuelingData: FuelingData) => void;
  };

  function FuelingModal({ isOpen, onClose, onSubmit }: FuelingModalProps) {
    const [fuelingData, setFuelingData] = React.useState<FuelingData>({
      vehicleId: selectedVehicle,
      fuelingDate: "2023-03-15T09:00:00Z",
      fuelQuantity: 50.0,
      fuelCost: 100.0,
      gasStationName: "Station XYZ",
      fuelType: "Diesel",
      fuelingReceiptImage: "http://example.com/receipt.jpg",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFuelingData({ ...fuelingData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      // Clone the current state
      const submissionData = { ...fuelingData };

      // Format the fuelingDate to include seconds and 'Z' for UTC timezone
      if (
        submissionData.fuelingDate &&
        !submissionData.fuelingDate.includes(":00Z")
      ) {
        submissionData.fuelingDate = formatDateTimeForSubmission(
          submissionData.fuelingDate
        );
      }

      onSubmit(submissionData);
    };

    function formatDateTimeForSubmission(dateTimeString: any) {
      // Append :00 (seconds) to the dateTimeString
      const formattedDateTime = dateTimeString + ":00Z";

      return formattedDateTime;
    }

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
        <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Fueling Information
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label
                htmlFor="fuelingDate"
                className="mb-2 font-medium text-gray-700"
              >
                Fueling Date
              </label>
              <input
                type="datetime-local"
                name="fuelingDate"
                value={fuelingData.fuelingDate}
                onChange={handleChange}
                className="text-gray-700 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="fuelQuantity"
                className="text-gray-700 mb-2 font-medium"
              >
                Fuel Quantity (Liters)
              </label>
              <input
                type="number"
                name="fuelQuantity"
                value={fuelingData.fuelQuantity.toString()}
                onChange={handleChange}
                className="text-gray-700 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="fuelCost"
                className="text-gray-700 mb-2 font-medium"
              >
                Fuel Cost
              </label>
              <input
                type="number"
                name="fuelCost"
                value={fuelingData.fuelCost.toString()}
                onChange={handleChange}
                className=" text-gray-700 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="gasStationName"
                className="text-gray-700 mb-2 font-medium "
              >
                Gas Station Name
              </label>
              <input
                type="text"
                name="gasStationName"
                value={fuelingData.gasStationName}
                onChange={handleChange}
                className="text-gray-700 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="fuelType"
                className="mb-2 font-medium text-gray-700"
              >
                Fuel Type
              </label>
              <input
                type="text"
                name="fuelType"
                value={fuelingData.fuelType}
                onChange={handleChange}
                className="text-gray-700 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="fuelingReceiptImage"
                className="mb-2 font-medium text-gray-700"
              >
                Fueling Receipt Image URL
              </label>
              <input
                type="text"
                name="fuelingReceiptImage"
                value={fuelingData.fuelingReceiptImage}
                onChange={handleChange}
                className="text-gray-700 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center justify-between mt-6">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 focus:outline-none"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

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
        const response = await $api.get("/vehicle/vehicles");
        console.log(response);
        setData(response.data.vehicles); // Assuming the response data is the array of drivers
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
        <ModalVehicle
          content={"Create Vehicle"}
          vehicleData={profileData}
          setVehicleData={setProfileData}
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
      <FuelingModal
        isOpen={isFuelingModalOpen}
        onClose={closeFuelingModal}
        onSubmit={handleFuelingSubmit}
      />
    </div>
  );
}
