// Import necessary components
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { VehicleRega } from "../types/types";
import $api from "@/http";
import { format, parse } from "date-fns";

// Vehicle Modal Component
interface ModalVehicleProps {
  content: string;
  vehicleData: VehicleRega;
  setVehicleData: React.Dispatch<React.SetStateAction<VehicleRega>>;
}

export function ModalVehicle({
  content,
  vehicleData,
  setVehicleData,
}: ModalVehicleProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    let updatedValue: string | number;
    if (
      [
        "Year",
        "SeatingCapacity",
        "TotalDistanceCovered",
        "FuelCapacity",
        "FuelConsumed",
      ].includes(name)
    ) {
      updatedValue = parseFloat(value);
    } else {
      updatedValue = value;
    }

    setVehicleData((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Prepare the data for submission
    const submitData = {
      ...vehicleData,
      Year:
        typeof vehicleData.Year === "string"
          ? parseInt(vehicleData.Year)
          : vehicleData.Year,
      SeatingCapacity:
        typeof vehicleData.SeatingCapacity === "string"
          ? parseInt(vehicleData.SeatingCapacity)
          : vehicleData.SeatingCapacity,
      TotalDistanceCovered:
        typeof vehicleData.TotalDistanceCovered === "string"
          ? parseFloat(vehicleData.TotalDistanceCovered)
          : vehicleData.TotalDistanceCovered,
      FuelCapacity:
        typeof vehicleData.FuelCapacity === "string"
          ? parseFloat(vehicleData.FuelCapacity)
          : vehicleData.FuelCapacity,
      FuelConsumed:
        typeof vehicleData.FuelConsumed === "string"
          ? parseFloat(vehicleData.FuelConsumed)
          : vehicleData.FuelConsumed,
      LastMaintenanceCheck: vehicleData.LastMaintenanceCheck
        ? format(
            parse(
              vehicleData.LastMaintenanceCheck,
              "yyyy-MM-dd'T'HH:mm",
              new Date()
            ),
            "yyyy-MM-dd'T'HH:mm:ss'Z'"
          )
        : "",
    };

    try {
      const response = await $api.post("/vehicle/add", submitData);
      console.log(response);
      setTimeout(() => {
        setIsLoading(false);
        window.location.reload();
      }, 2000);
      // Rest of your submission logic...
    } catch (error) {
      setIsLoading(false);
      console.error("Error submitting data:", error);
    }

    // Reset loading state and possibly handle the response
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{content}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{content}</DialogTitle>
          <DialogDescription>Enter vehicle details below.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Vehicle fields */}
            <Field
              name="Model"
              label="Model"
              value={vehicleData.Model}
              onChange={handleInputChange}
            />
            <Field
              name="Year"
              label="Year"
              type="number"
              value={vehicleData.Year}
              onChange={handleInputChange}
            />
            <Field
              name="LicensePlate"
              label="License Plate"
              value={vehicleData.LicensePlate}
              onChange={handleInputChange}
            />
            <Field
              name="SeatingCapacity"
              label="Seating Capacity"
              type="number"
              value={vehicleData.SeatingCapacity}
              onChange={handleInputChange}
            />
            <Field
              name="LastMaintenanceCheck"
              label="Last Maintenance Check"
              type="datetime-local"
              value={vehicleData.LastMaintenanceCheck}
              onChange={handleInputChange}
            />
            <Field
              name="TotalDistanceCovered"
              label="Total Distance Covered"
              type="number"
              value={vehicleData.TotalDistanceCovered}
              onChange={handleInputChange}
            />
            <Field
              name="FuelCapacity"
              label="Fuel Capacity"
              type="number"
              value={vehicleData.FuelCapacity}
              onChange={handleInputChange}
            />
            <Field
              name="FuelConsumed"
              label="Fuel Consumed"
              type="number"
              value={vehicleData.FuelConsumed}
              onChange={handleInputChange}
            />
            {/* <Field
              name="Photo"
              label="Photo URL"
              value={vehicleData.Photo}
              onChange={handleInputChange}
            /> */}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

const Field: React.FC<{
  name: string;
  label: string;
  value: string | number;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  type?: string;
}> = ({ name, label, value, onChange, type = "text" }) => (
  <div className="grid grid-cols-4 items-center gap-4">
    <Label htmlFor={name} className="text-right">
      {label}
    </Label>
    <Input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      className="col-span-3"
    />
  </div>
);
