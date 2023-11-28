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
import { TaskRega } from "../types/types";
import $api from "@/http";

interface ModalTaskProps {
  content: string;
  taskData: TaskRega;
  setTaskData: React.Dispatch<React.SetStateAction<TaskRega>>;
}
export function ModalTask({ content, taskData, setTaskData }: ModalTaskProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const parsedValue =
      name === "distance" && value ? parseFloat(value) : value;
    setTaskData((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Prepare the data for submission
    const submitData = {
      ...taskData,
      distance:
        typeof taskData.distance === "string"
          ? parseFloat(taskData.distance)
          : taskData.distance,
    };

    try {
      const response = await $api.post("/task/create", submitData);
      console.log(response);

      setTimeout(() => {
        setIsLoading(false);
        window.location.reload();
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      console.error("Error submitting data:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{content}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{content}</DialogTitle>
          <DialogDescription>Enter task details below.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Task fields */}
            <Field
              name="title"
              label="Title"
              value={taskData.title}
              onChange={handleInputChange}
            />
            <Field
              name="description"
              label="Description"
              value={taskData.description}
              onChange={handleInputChange}
            />
            <Field
              name="whereFrom"
              label="Where From"
              value={taskData.whereFrom}
              onChange={handleInputChange}
            />
            <Field
              name="whereTo"
              label="Where To"
              value={taskData.whereTo}
              onChange={handleInputChange}
            />
            <Field
              name="distance"
              label="Distance"
              type="number"
              value={taskData.distance}
              onChange={handleInputChange}
            />
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
      value={type === "number" ? value.toString() : (value as string)} // Convert number to string for number inputs
      onChange={onChange}
      className="col-span-3"
    />
  </div>
);
