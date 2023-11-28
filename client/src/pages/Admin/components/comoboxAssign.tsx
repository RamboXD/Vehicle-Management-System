import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import $api from "@/http";

interface ComoboxProps {
  vehicleId: string;
  drivers: any[];
}
export function ComboboxAssign({ vehicleId, drivers }: ComoboxProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedDriver, setSelectedDriver] = React.useState<any>(null);

  const handleAssign = async () => {
    try {
      const response = await $api.post("/vehicle/assign", {
        vehicleId: vehicleId,
        driverId: selectedDriver,
      });
      console.log(response);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[200px] justify-between">
          {selectedDriver
            ? drivers.find((driver) => driver.DriverID === selectedDriver)?.Name
            : "Select Driver..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search driver..." className="h-9" />
          <CommandEmpty>No driver found.</CommandEmpty>
          <CommandGroup>
            {drivers.map((driver) => (
              <CommandItem
                key={driver.DriverID}
                value={driver.DriverID}
                onSelect={(currentValue) => {
                  setSelectedDriver(
                    currentValue === selectedDriver ? "" : currentValue
                  );
                  setOpen(false);
                }}
              >
                {driver.Name} {driver.Surname}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    selectedDriver === driver.DriverID
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
      {selectedDriver && (
        <Button variant="outline" className="ml-2" onClick={handleAssign}>
          Assign
        </Button>
      )}
    </Popover>
  );
}
