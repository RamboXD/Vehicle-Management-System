import logo from "@/assets/images/logo2.jpg";
import { Button } from "@/components";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";

interface SignProps {
  setIsCaregiver: (value: number) => void;
}

const Sign: React.FC<SignProps> = ({ setIsCaregiver }) => {
  const navigate = useNavigate();
  return (
    <Card className="relative">
      <CardHeader>
        <CardTitle className="flex justify-center">
          <img src={logo} alt="Digital Store" className="w-16 ml-5" />
        </CardTitle>
        <CardTitle className="flex justify-center">
          Caregivers Platform
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="password" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-1">
            <TabsTrigger value="password">Who Are You?</TabsTrigger>
          </TabsList>
          <TabsContent value="password">
            <Card className="border-0 shadow-none">
              <CardHeader>
                <CardTitle className="flex justify-center">
                  Registration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 px-0 flex justify-center">
                <div className="flex flex-col w-full max-w-sm items-center gap-1.5">
                  <div className="w-full justify-center flex flex-row mt-1 text-sm gap-1.5">
                    <Button
                      type="submit"
                      className="w-1/2"
                      onClick={() => {
                        setIsCaregiver(1);
                      }}
                    >
                      Caregiver
                    </Button>
                    <Button
                      type="submit"
                      className="w-1/2"
                      onClick={() => {
                        setIsCaregiver(2);
                      }}
                    >
                      Member
                    </Button>
                  </div>

                  <div className="w-full justify-center flex flex-row mt-1 text-sm">
                    <p
                      onClick={() => navigate("/login")}
                      className="text-left underline underline-offset-2 cursor-pointer"
                    >
                      Already have an account? Click here!
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
