// Import necessary components and types
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
import { MaintenanceProfileRega } from "../types/types";
import $api from "@/http";

// Maintenance Modal Component
interface ModalMaintenanceProps {
  content: string;
  profileData: MaintenanceProfileRega;
  setProfileData: React.Dispatch<React.SetStateAction<MaintenanceProfileRega>>;
}

export function ModalMaintenance({
  content,
  profileData,
  setProfileData,
}: ModalMaintenanceProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name.startsWith("user.")) {
      setProfileData((prev) => ({
        ...prev,
        user: {
          ...prev.user,
          [name.substring(5)]: value,
        },
      }));
    } else if (name.startsWith("maintenance_person.")) {
      setProfileData((prev) => ({
        ...prev,
        maintenance_person: {
          ...prev.maintenance_person,
          [name.substring(19)]: value,
        },
      }));
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await $api.post(
        "/auth/register/maintenance",
        profileData
      );
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
          <DialogDescription>
            Create user and maintenance person details below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <Field
              name="user.email"
              label="Email"
              value={profileData.user.email}
              onChange={handleInputChange}
            />
            <Field
              name="user.password"
              label="Password"
              type="password"
              value={profileData.user.password}
              onChange={handleInputChange}
            />

            {/* Maintenance person fields */}
            <Field
              name="maintenance_person.name"
              label="Name"
              value={profileData.maintenance_person.name}
              onChange={handleInputChange}
            />
            <Field
              name="maintenance_person.surname"
              label="Surname"
              value={profileData.maintenance_person.surname}
              onChange={handleInputChange}
            />
            <Field
              name="maintenance_person.middleName"
              label="Middle Name"
              value={profileData.maintenance_person.middleName}
              onChange={handleInputChange}
            />
            <Field
              name="maintenance_person.qualifications"
              label="Qualifications"
              value={profileData.maintenance_person.qualifications}
              onChange={handleInputChange}
            />
            <Field
              name="maintenance_person.experience"
              label="Experience"
              value={profileData.maintenance_person.experience}
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
  value: string;
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
