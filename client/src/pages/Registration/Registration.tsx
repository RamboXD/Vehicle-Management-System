import { useState } from "react";
import { Sign } from "./components";
import SignUpFormCaregiver from "./components/Form/SignUpFormCaregiver";
import SignUpFormMember from "./components/Form/SignUpFormMember";

const Registration: React.FC = () => {
  const [isCaregiver, setIsCaregiver] = useState<number>(0);
  console.log(isCaregiver);
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      {isCaregiver === 0 ? (
        <Sign setIsCaregiver={setIsCaregiver} />
      ) : isCaregiver === 1 ? (
        <SignUpFormCaregiver setIsCaregiver={setIsCaregiver} />
      ) : (
        <SignUpFormMember setIsCaregiver={setIsCaregiver} />
      )}
    </div>
  );
};

export default Registration;
