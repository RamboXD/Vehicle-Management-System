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
import { DriverProfileRega } from "../Drivers/types/types";

interface ModalProps {
  content: string;
  profileData: DriverProfileRega;
  setProfileData: React.Dispatch<React.SetStateAction<DriverProfileRega>>;
}
export function Modal({ content, profileData, setProfileData }: ModalProps) {
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
    } else if (name.startsWith("driver.")) {
      setProfileData((prev) => ({
        ...prev,
        driver: {
          ...prev.driver,
          [name.substring(7)]: value,
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
            Create user and driver details below.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
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
              name="driver.government"
              label="Government ID"
              value={profileData.driver.government}
              onChange={handleInputChange}
            />
            <Field
              name="driver.name"
              label="Name"
              value={profileData.driver.name}
              onChange={handleInputChange}
            />
            <Field
              name="driver.surname"
              label="Surname"
              value={profileData.driver.surname}
              onChange={handleInputChange}
            />
            <Field
              name="driver.middleName"
              label="Middle Name"
              value={profileData.driver.middleName}
              onChange={handleInputChange}
            />
            <Field
              name="driver.address"
              label="Address"
              value={profileData.driver.address}
              onChange={handleInputChange}
            />
            <Field
              name="driver.phone"
              label="Phone"
              value={profileData.driver.phone}
              onChange={handleInputChange}
            />
            <Field
              name="driver.email"
              label="Email"
              value={profileData.driver.email}
              onChange={handleInputChange}
            />
            <Field
              name="driver.drivingLicenseCode"
              label="Driving License Code"
              value={profileData.driver.drivingLicenseCode}
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
