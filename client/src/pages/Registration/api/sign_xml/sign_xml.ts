import $api from "@/http";
import { signResponse } from "@/ts/types";

export const sign_xml = (xmlData: string) => {
  return $api.post<signResponse>("/sign_xml", {
    xml_to_sign: xmlData,
  });
};
