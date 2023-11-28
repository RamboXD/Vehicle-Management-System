import { useAppDispatch } from "@/hooks/redux";
import { authSlice } from "@/store/reducers/authReducer";
import { useNavigate } from "react-router-dom";
import { Sign } from "./components";
import { loginType } from "@/ts/types";
import { login } from "./api/workerLogin/workerLogin";

const Login: React.FC = () => {
  const { setAuth } = authSlice.actions;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleSignUp = async (data: loginType) => {
    try {
      // console.log(data);
      const result = await login(data);
      console.log(result);
      localStorage.setItem("token", result.data.access_token);
      localStorage.setItem("role", result.data.role);
      dispatch(setAuth(true));
      if (result.data.role === "admin") navigate("/admin/drivers");
      if (result.data.role === "driver") navigate("/driver/tasks");
      if (result.data.role === "maintenance_person")
        navigate("/maintenance/tasks");
    } catch (error) {
      console.log("ERROR");
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Sign handleSignUp={handleSignUp} />
    </div>
  );
};

export default Login;
