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
import { FuelingProfileRega } from "../Drivers/types/types";

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
    } else if (name.startsWith("fueling_person.")) {
      setProfileData((prev) => ({
        ...prev,
        fueling_person: {
          ...prev.fueling_person,
          [name.substring(14)]: value,
        },
      }));
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // Handle form submission
          }}
        >
          <div className="grid gap-4 py-4">
            {/* User Fields */}
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

            {/* Fueling Person Fields */}
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
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Helper component for form fields
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
