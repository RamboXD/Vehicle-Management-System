import $api from "@/http";
import { LocationResponse } from "@/ts/types";

export const getAddresses = (location: string) => {
  return $api.get<LocationResponse>(
    `/ajax/address/localities?name=${location}`
  );
};
