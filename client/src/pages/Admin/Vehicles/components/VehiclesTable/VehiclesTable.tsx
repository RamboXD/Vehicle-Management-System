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
import { ComboboxAssign } from "@/pages/Admin/components/comoboxAssign";
import { jsPDF } from "jspdf";

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

export function VehiclesTable() {
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
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [driversWithoutVehicle, setDriversWithoutVehicle] = React.useState([]);
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
      id: "assignDriver",
      header: "Assign Driver",
      enableGrouping: false,
      cell: ({ row }) => {
        return (
          row.original.Status === "Inactive" && (
            <ComboboxAssign
              vehicleId={row.original.VehicleID}
              drivers={driversWithoutVehicle}
            />
          )
        );
      },
    },
    {
      id: "unassignDriver",
      header: "Unassign Driver",
      cell: ({ row }) => {
        return (
          row.original.Status === "Active" && (
            <Button onClick={() => unassignDriver(row.original.VehicleID)}>
              Unassign Driver
            </Button>
          )
        );
      },
    },
    {
      id: "report",
      header: "Report",
      cell: ({ row }) => (
        <Button onClick={() => handleReportClick(row.original)}>
          Download Report
        </Button>
      ),
    },
  ];

  const handleReportClick = (vehicleData: Vehicle) => {
    generatePDF(vehicleData);
  };
  const generatePDF = (vehicleData: Vehicle) => {
    const doc = new jsPDF();

    // First page (Intro)
    doc.setFontSize(40);
    doc.setTextColor(60, 80, 180); // Set a blue color for the title
    doc.text("VMS REPORT", 105, 150, { align: "center" });

    // Adding a new page for vehicle details
    doc.addPage();
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // Reset text color to black

    // Header
    doc.setFontSize(16);
    doc.text(`Vehicle Report: ${vehicleData.Model}`, 10, 20);

    // Vehicle data
    doc.setFontSize(12);
    const vehicleInfo = [
      // `Vehicle ID: ${vehicleData.VehicleID}`,
      `Model: ${vehicleData.Model}`,
      `Year: ${vehicleData.Year}`,
      `License Plate: ${vehicleData.LicensePlate}`,
      `Seating Capacity: ${vehicleData.SeatingCapacity}`,
      `Assigned Driver ID: ${vehicleData.AssignedDriverID || "No Driver"}`,
      `Last Maintenance Check: ${vehicleData.LastMaintenanceCheck}`,
      `Total Distance Covered: ${vehicleData.TotalDistanceCovered} km`,
      `Fuel Capacity: ${vehicleData.FuelCapacity} liters`,
      `Fuel Consumed: ${vehicleData.FuelConsumed} liters`,
      `Status: ${
        vehicleData.Status === "Active"
          ? "Has Driver"
          : "No Driver at the current moment"
      }`,
    ];

    vehicleInfo.forEach((line, index) => {
      doc.text(line, 10, 30 + index * 10);
    });

    // Save the PDF
    doc.save(`VehicleReport-${vehicleData.VehicleID}.pdf`);
  };

  const unassignDriver = async (vehicleId: string) => {
    try {
      const response = await $api.post("/vehicle/unassign", {
        vehicleId: vehicleId,
      });
      console.log(response);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error submitting data:", error);
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
  React.useEffect(() => {
    let isDataFetched = false;
    setIsLoading(true);

    // Function to fetch data
    const fetchData = async () => {
      try {
        const response = await $api.get("/vehicle/vehicles");
        console.log(response);
        setData(response.data.vehicles); // Assuming the response data is the array of drivers
        const responseDrivers = await $api.get("/driver/drivers/no_vehicle");
        console.log(responseDrivers);
        setDriversWithoutVehicle(responseDrivers.data.drivers);
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
    </div>
  );
}
