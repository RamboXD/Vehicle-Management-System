import logo from "@/assets/images/logo2.jpg";
import { Button, Input } from "@/components";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { loginType } from "@/ts/types";
import { loginSchema } from "@/zod/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

interface SignProps {
  handleSignUp: (data: loginType) => Promise<void>;
}

const Sign: React.FC<SignProps> = ({ handleSignUp }) => {
  const form = useForm<z.infer<typeof loginSchema>>({
    mode: "onChange",
    shouldFocusError: false,
    resolver: zodResolver(loginSchema),
  });
  const navigate = useNavigate();
  return (
    <Card className="relative">
      <CardHeader>
        <CardTitle className="flex justify-center">
          <img src={logo} alt="Digital Store" className="w-16 ml-5" />
        </CardTitle>
        <CardTitle className="flex justify-center">
          Caregivers platform
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="password" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-1">
            <TabsTrigger value="password">Lets help the community</TabsTrigger>
          </TabsList>
          <TabsContent value="password">
            <Card className="border-0 shadow-none">
              <CardHeader>
                <CardTitle className="flex justify-center">Login</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 px-0 flex flex-col justify-center">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Form {...form}>
                    <form className="space-y-6">
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
                    </form>
                  </Form>
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Button
                    type="submit"
                    className="w-full"
                    onClick={() => {
                      handleSignUp(form.getValues());
                    }}
                  >
                    Login
                  </Button>
                  <div className="w-full justify-center flex flex-row mt-1 text-sm">
                    <p
                      onClick={() => navigate("/registration")}
                      className="text-left underline underline-offset-2 cursor-pointer"
                    >
                      Do not have an account? Click here!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
      <div className="absolute top-0 right-0 mr-6 mt-6"></div>
    </Card>
  );
};

export default Sign;
