import { Input } from "@/components"; // make sure you import all necessary components
import { CardDescription } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { PatternInput } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

const FirstStepMember: React.FC = () => {
  const form = useFormContext();
  return (
    <div className="flex flex-col">
      <CardDescription>Member Data</CardDescription>
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
          {/* Surname Field */}
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
          {/* City Field */}
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="City" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          {/* Phone Number Field */}
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
            name="town"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel>Town</FormLabel>
                <FormControl>
                  <Input placeholder="Town" {...field} />
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
                  <Input placeholder="Profile Description" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="w-full flex flex-col gap-1">
          {/* Profile Description Field */}
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
          {/* House Rules Field */}
          <FormField
            control={form.control}
            name="houseRules"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel>House Rules</FormLabel>
                <FormControl>
                  <Input placeholder="House Rules" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          {/* House Number Field */}
          <FormField
            control={form.control}
            name="houseNumber"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel>House Number</FormLabel>
                <FormControl>
                  <Input placeholder="House Number" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          {/* Street Field */}
          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel>Street</FormLabel>
                <FormControl>
                  <Input placeholder="Street" {...field} />
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

export default FirstStepMember;
