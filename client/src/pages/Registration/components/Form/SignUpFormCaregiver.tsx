import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form, FormStep } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { useAppDispatch } from "@/hooks/redux";
import { registerCaregiver } from "@/store/reducers/authReducer";
import { caregiverRegistartionForm } from "@/ts/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import FirstStep from "./components/FirstStep/FirstStep";
import { caregiverSchema } from "@/zod/zod";

interface SignProps {
  setIsCaregiver: (value: number) => void;
}

const SignUpFormCaregiver: React.FC<SignProps> = ({ setIsCaregiver }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof caregiverSchema>>({
    mode: "onChange",
    shouldFocusError: false,
    resolver: zodResolver(caregiverSchema),
    defaultValues: {
      step: 1,
      photo: "base64EncodedImageString",
    },
  });
  const step = 1;
  // console.log(form.getValues());
  const onSubmit = async () => {
    await dispatch(
      registerCaregiver(form.getValues() as caregiverRegistartionForm)
    )
      .unwrap()
      .then(() => {
        toast({
          title: "Registration was successfull",
        });
        navigate("/login");
      })
      .catch(() => {
        console.log("AAAA OSHIBKA");
        toast({
          variant: "destructive",
          title: "Ошибка при регистрация",
        });
        navigate("/registration/");
      });
  };

  return (
    <Card className="w-full lg:w-1/2 overflow-y-scroll absolute top-10">
      <CardHeader>
        <CardTitle>Registration</CardTitle>
        <CardDescription>Enter your data</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormStep step={1} currentStep={step}>
              <FirstStep />
            </FormStep>
            <div className="w-full flex flex-row justify-between">
              <Button
                type={"button"}
                variant="default"
                onClick={() => {
                  setIsCaregiver(0);
                }}
              >
                {"Back"}
              </Button>
              <Button
                key={"submit-btn"}
                type={"submit"}
                variant="default"
                onClick={() => {
                  onSubmit();
                }}
              >
                {"Register"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SignUpFormCaregiver;
