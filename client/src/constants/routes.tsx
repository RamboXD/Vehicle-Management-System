import { Login } from "@/pages";
import { Drivers, Fuels, Maintenance, Tasks, Vehicles } from "@/pages/Admin";
import Driver from "@/pages/Admin/Drivers/components/DriverTable/Driver";
import FuelingPerson from "@/pages/Admin/Fuels/components/FuelingTable/Fueling";
import MaintenancePerson from "@/pages/Admin/Maintenance/components/MaintenanceTable/MaintenancePerson";
import { DriverProfile } from "@/pages/Driver/Profile/DriverProfile";
import UnTasks from "@/pages/Driver/UnTasks/UnTasks";
import CreateFueling from "@/pages/Fueling/CreateFueling/CreateFueling";
import { FuelingProfile } from "@/pages/Fueling/Profile/FuelingProfile";
import Landing from "@/pages/Landing/Landing";
import CreateMaintenance from "@/pages/Maintenance/CreateMaintenance/CreateMaintenance";
import { MaintenanceProfile } from "@/pages/Maintenance/Profile/MaintenanceProfile";
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
    path: "/admin/drivers",
    component: <Drivers />,
    roles: [Role.CLIENT, Role.ADMIN],
    isPublic: false,
  },
  {
    name: "Drivers",
    path: "/admin/driver/:id",
    component: <Driver />,
    roles: [Role.CLIENT, Role.ADMIN],
    isPublic: false,
  },
  {
    name: "Fueling people",
    path: "/admin/fuels",
    component: <Fuels />,
    roles: [Role.CLIENT, Role.ADMIN],
    isPublic: false,
  },
  {
    name: "Fueling_person",
    path: "/admin/fuel/:id",
    component: <FuelingPerson />,
    roles: [Role.CLIENT, Role.ADMIN],
    isPublic: false,
  },
  {
    name: "Maintenance people",
    path: "/admin/maintenance",
    component: <Maintenance />,
    roles: [Role.CLIENT, Role.ADMIN],
    isPublic: false,
  },
  {
    name: "Maintenance person",
    path: "/admin/maintenance/:id",
    component: <MaintenancePerson />,
    roles: [Role.CLIENT, Role.ADMIN],
    isPublic: false,
  },
  {
    name: "Tasks",
    path: "/admin/tasks",
    component: <Tasks />,
    roles: [Role.CLIENT, Role.ADMIN],
    isPublic: false,
  },
  {
    name: "UnassignedTasks",
    path: "/driver/tasks",
    component: <UnTasks />,
    roles: [Role.CLIENT, Role.ADMIN],
    isPublic: false,
  },
  {
    name: "Tasks",
    path: "/driver/me",
    component: <DriverProfile />,
    roles: [Role.CLIENT, Role.ADMIN],
    isPublic: false,
  },
  {
    name: "MaintenanceTasks",
    path: "/maintenance/tasks",
    component: <CreateMaintenance />,
    roles: [Role.CLIENT, Role.ADMIN],
    isPublic: false,
  },
  {
    name: "MaintenanceInfo",
    path: "/maintenance/me",
    component: <MaintenanceProfile />,
    roles: [Role.CLIENT, Role.ADMIN],
    isPublic: false,
  },
  {
    name: "FuelingTasks",
    path: "/fueling/tasks",
    component: <CreateFueling />,
    roles: [Role.CLIENT, Role.ADMIN],
    isPublic: false,
  },
  {
    name: "FuelingInfo",
    path: "/fueling/me",
    component: <FuelingProfile />,
    roles: [Role.CLIENT, Role.ADMIN],
    isPublic: false,
  },
  {
    name: "Vehicles",
    path: "/admin/vehicles",
    component: <Vehicles />,
    roles: [Role.CLIENT, Role.ADMIN],
    isPublic: false,
  },
];
