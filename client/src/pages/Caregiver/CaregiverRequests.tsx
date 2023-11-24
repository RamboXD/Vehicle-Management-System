import $api from "@/http";
import {
  ApplicationsResponse,
  ApplyResponse,
  AppointmentsResponse,
  JobsResponse,
} from "./CaregiverTypes";

export const getJobs = () => {
  return $api.get<JobsResponse>(`/caregiver/getJobs`);
};

export const getAppointments = () => {
  return $api.get<AppointmentsResponse>(`/caregiver/getAppointments`);
};
export const getApplications = () => {
  return $api.get<ApplicationsResponse>(`/caregiver/applications`);
};

export const applyForJob = (id: string) => {
  return $api.post<ApplyResponse>(`/caregiver/applyJob/${id}`);
};

export const confirmAppointment = (id: string) => {
  return $api.post<ApplyResponse>(`/caregiver/appointment/${id}`, {
    status: "Confirmed",
  });
};

export const declineAppointment = (id: string) => {
  return $api.post<ApplyResponse>(`/caregiver/appointment/${id}`, {
    status: "Declined",
  });
};
