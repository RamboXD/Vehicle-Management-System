import { Input } from "@/components";
import { CardDescription } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { PatternInput } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormContext } from "react-hook-form";

const FirstStep: React.FC = () => {
  const form = useFormContext();
  return (
    <div className="flex flex-col">
      <CardDescription>Caregiver Date</CardDescription>
      <div className="flex flex-row gap-4">
        <div className="w-full flex flex-col gap-1">
          <FormField
            control={form.control}
            name="givenName"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="profileDescription"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel>Profile Description</FormLabel>
                <FormControl>
                  <Input placeholder="Enter profile description" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter email" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel>Phone number</FormLabel>
                <FormControl>
                  <PatternInput
                    format="+7-(###)-###-####"
                    mask="_"
                    placeholder="Phone number"
                    onValueChange={(value) => field.onChange(value.value)}
                    type="tel"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="caregivingType"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel>Caregiving Type</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select caregiving Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Baby sitter">Baby sitter</SelectItem>
                    <SelectItem value="Elder care">Elder care</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>
        <div className="w-full flex flex-col gap-1">
          <FormField
            control={form.control}
            name="surname"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel>Surname</FormLabel>
                <FormControl>
                  <Input placeholder="Your surname" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel>City</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Astana">Astana</SelectItem>
                    <SelectItem value="Almaty">Almaty</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel>Gender</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter password"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hourlyRate"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel>Hourly Rate</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter hourly rate"
                    step="0.01"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>
      <br />
    </div>
  );
};

export default FirstStep;
