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
import { FuelingProfileRega } from "../types/types";
import { useState } from "react";
import $api from "@/http";

interface ModalProps {
  content: string;
  profileData: FuelingProfileRega;
  setProfileData: React.Dispatch<React.SetStateAction<FuelingProfileRega>>;
}
export function ModalFueling({
  content,
  profileData,
  setProfileData,
}: ModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    // Check if the name starts with 'user.' or 'fueling_person.'
    if (name.startsWith("user.")) {
      const fieldName = name.substring("user.".length);
      setProfileData((prev) => ({
        ...prev,
        user: {
          ...prev.user,
          [fieldName]: value,
        },
      }));
    } else if (name.startsWith("fueling_person.")) {
      const fieldName = name.substring("fueling_person.".length);
      setProfileData((prev) => ({
        ...prev,
        fueling_person: {
          ...prev.fueling_person,
          [fieldName]: value,
        },
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await $api.post("/auth/register/fueling", profileData);
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
            Create user and fueling person details below.
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

            <Field
              name="fueling_person.certification"
              label="Certification"
              value={profileData.fueling_person.certification}
              onChange={handleInputChange}
            />
            <Field
              name="fueling_person.name"
              label="Name"
              value={profileData.fueling_person.name}
              onChange={handleInputChange}
            />
            <Field
              name="fueling_person.surname"
              label="Surname"
              value={profileData.fueling_person.surname}
              onChange={handleInputChange}
            />
            <Field
              name="fueling_person.middleName"
              label="Middle Name"
              value={profileData.fueling_person.middleName}
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
