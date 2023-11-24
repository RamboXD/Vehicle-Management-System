import $api from "@/http";

export const register = () => {
  return $api.post("/registration/organization");
};
