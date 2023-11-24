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
import { registerMember } from "@/store/reducers/authReducer";
import { memberRegistartionForm } from "@/ts/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import { memberSchema } from "@/zod/zod";
import FirstStepMember from "./components/FirstStep/FirstStepMember";

interface SignProps {
  setIsCaregiver: (value: number) => void;
}
const SignUpFormMember: React.FC<SignProps> = ({ setIsCaregiver }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof memberSchema>>({
    mode: "onChange",
    shouldFocusError: false,
    resolver: zodResolver(memberSchema),
    defaultValues: {
      step: 1,
    },
  });
  const step = 1;

  const onSubmit = async () => {
    await dispatch(registerMember(form.getValues() as memberRegistartionForm))
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
              <FirstStepMember />
            </FormStep>
            <div className="w-full flex flex-row justify-between">
              <Button
                key={"submit-btn"}
                type={"submit"}
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

export default SignUpFormMember;
