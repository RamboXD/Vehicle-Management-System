import $api from "@/http";
import { AuthResponse } from "@/models/response/AuthResponse";
import { caregiverData, memberData } from "@/ts/types";
import { AxiosResponse } from "axios";

export default class AuthService {
  static async login(
    username: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/auth/login/", {
      username: username,
      password: password,
    });
  }

  static async registerCaregiver(
    caregiverData: caregiverData
  ): Promise<string> {
    // Ensure hourlyRate is a string and parse it to a float
    if (typeof caregiverData.caregiver.hourlyRate === "string") {
      const hourlyRateFloat = parseFloat(caregiverData.caregiver.hourlyRate);
      if (!isNaN(hourlyRateFloat)) {
        // If conversion is successful, assign the float value back
        caregiverData.caregiver.hourlyRate = hourlyRateFloat;
      } else {
        throw new Error("Invalid hourly rate value");
      }
    }

    console.log(caregiverData);
    const response = await $api.post("/auth/register/caregiver", caregiverData);
    console.log(response);
    return "success";
  }

  static async registerMember(memberData: memberData): Promise<string> {
    console.log(memberData);
    const response = await $api.post("/auth/register/member", memberData);
    console.log(response);
    return "success";
  }

  static async logout(): Promise<void> {
    // TODO: if refresh token is sent to cookies
    return;
  }
}
