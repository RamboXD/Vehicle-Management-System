import { Login } from "@/pages";
import { Drivers, Fuels, Maintenance, Tasks, Vehicles } from "@/pages/Admin";
import { Jobs } from "@/pages/Administration";
import Caregivers from "@/pages/Administration/Deals/Caregivers";
import Appointments from "@/pages/Administration/Employees/Appointments";
import JobApplicants from "@/pages/Administration/Organizations/JobApplicants";
import ApplicationList from "@/pages/Caregiver/Applications/ApplicationList";
import AppointmentList from "@/pages/Caregiver/Appointments/AppointmentList";
import JobList from "@/pages/Caregiver/Jobs/JobList";
import Landing from "@/pages/Landing/Landing";
import { IRoute, Role } from "@/ts/types";

export const routes: IRoute[] = [
  {
    name: "Worker Login",
    path: "/login",
    component: <Login />,
    roles: [Role.CLIENT, Role.ADMIN],
    isPublic: true,
  },
  {
    name: "Landing Page",
    path: "/",
    component: <Landing />,
    roles: [Role.CLIENT, Role.ADMIN],
    isPublic: true,
  },
  {
    name: "Drivers",
    path: "/drivers",
    component: <Drivers />,
    roles: [Role.CLIENT, Role.ADMIN],
    isPublic: true,
  },
  {
    name: "Fueling people",
    path: "/fuels",
    component: <Fuels />,
    roles: [Role.CLIENT, Role.ADMIN],
    isPublic: true,
  },
  {
    name: "Maintenance people",
    path: "/maintenance",
    component: <Maintenance />,
    roles: [Role.CLIENT, Role.ADMIN],
    isPublic: true,
  },
  {
    name: "Tasks",
    path: "/tasks",
    component: <Tasks />,
    roles: [Role.CLIENT, Role.ADMIN],
    isPublic: true,
  },
  {
    name: "Vehicles",
    path: "/vehicles",
    component: <Vehicles />,
    roles: [Role.CLIENT, Role.ADMIN],
    isPublic: true,
  },
  {
    name: "Caregivers",
    path: "/member/caregivers",
    component: <Caregivers />,
    roles: [Role.CLIENT, Role.ADMIN],
    isPublic: false,
  },
  {
    name: "Organizations",
    path: "/member/jobs",
    component: <Jobs />,
    roles: [Role.CLIENT, Role.ADMIN],
    isPublic: false,
  },
  {
    name: "Employees",
    path: "/member/appointments",
    component: <Appointments />,
    roles: [Role.CLIENT, Role.ADMIN],
    isPublic: false,
  },
  {
    name: "Jobs",
    path: "/caregiver/jobs",
    component: <JobList />,
    roles: [Role.CLIENT, Role.ADMIN],
    isPublic: false,
  },
  {
    name: "Applications",
    path: "/caregiver/applications",
    component: <ApplicationList />,
    roles: [Role.CLIENT, Role.ADMIN],
    isPublic: false,
  },
  {
    name: "Appointments",
    path: "/caregiver/appointments",
    component: <AppointmentList />,
    roles: [Role.CLIENT, Role.ADMIN],
    isPublic: false,
  },
  {
    name: "JobApplicants",
    path: "/job-applicants/:id",
    component: <JobApplicants />,
    roles: [Role.CLIENT, Role.ADMIN],
    isPublic: false,
  },
  // {
  //   name: "Registration",
  //   path: "/registration",
  //   component: <Registration />,
  //   roles: [Role.CLIENT, Role.ADMIN],
  //   isPublic: true,
  // },
];
