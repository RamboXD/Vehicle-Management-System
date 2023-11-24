import $api from "@/http";
import { loginType } from "@/ts/types";

export const login = (data: loginType) => {
  console.log(data);
  return $api.post("/auth/login", data);
};
