export enum Role {
  CLIENT = "CLIENT",
  ADMIN = "ADMIN",
}

export type IRoute = {
  name: string;
  path: string;
  component: React.ReactElement;
  roles: Role[];
  isPublic: boolean;
};

export type organization_type = {
  id: string;
  name: string;
};

export type ecpData = {
  BIN: string;
  IIN: string;
  name: string;
  surname: string;
  patronymic: string;
  email: string;
  organization: string;
  organization_types: organization_type[];
};

type Citizenship = {
  value: string;
};

type SignedXML = {
  bin: string;
  certsn: string;
  cn: string;
  email: string;
  givenname: string;
  iin: string;
  org: string;
  surname: string;
};
export interface Appointment {
  AppointmentID: string;
  CaregiverUserID: string;
  MemberUserID: string;
  AppointmentDate: string;
  AppointmentTime: string;
  WorkHours: number;
  Status: string;
  Caregiver: Caregiver;
  Member: Member;
}

export type signResponse = {
  citizenships: Citizenship[];
  signed_xml: SignedXML;
  organization_types: organization_type[];
};

type AtsType = {
  is_city: boolean;
  priority: boolean;
  short_value_kz: string;
  short_value_ru: string;
  value_kz: string;
  value_ru: string;
};

export type LocationResponse = {
  actual: boolean;
  ats_type: AtsType;
  ats_type_id: number;
  cato: string;
  children: null | LocationResponse[];
  full_path_kaz: string;
  full_path_rus: string;
  id: number;
  modified: string;
  name_kaz: string;
  name_rus: string;
  parent_id: number;
  rco: string;
}[];

interface User {
  email: string;
  password: string;
  givenName: string;
  surname: string;
  city: string;
  phoneNumber: string;
  profileDescription: string;
}
interface Userr {
  Email: string;
  Password: string;
  GivenName: string;
  Surname: string;
  City: string;
  PhoneNumber: string;
  ProfileDescription: string;
}

interface Caregiver {
  photo: string;
  gender: string;
  caregivingType: string;
  hourlyRate: number;
}

interface Member {
  houseRules: string;
}

interface Address {
  houseNumber: string;
  street: string;
  town: string;
}

export interface caregiverData {
  user: User;
  caregiver: Caregiver;
}

export interface GetCaregiverData {
  CaregiverUserID: string;
  Photo: string; // Base64 encoded image string
  Gender: string;
  CaregivingType: string;
  HourlyRate: number;
  User: Userr;
}

export interface GetCaregiverData2 {
  caregiverUserId: string;
  photo: string; // Base64 encoded image string
  gender: string;
  caregivingType: string;
  hourlyRate: number;
  givenName: string;
  surname: string;
}
export interface loginType {
  email: string;
  password: string;
}

export interface memberData {
  user: User;
  member: Member;
  address: Address;
}

export type caregiverRegistartionForm = {
  step: number;
  email: string;
  password: string;
  givenName: string;
  surname: string;
  city: string;
  phoneNumber: string;
  profileDescription: string;
  photo: string;
  gender: string;
  caregivingType: string;
  hourlyRate: number;
};

export type memberRegistartionForm = {
  step: number;
  email: string;
  password: string;
  givenName: string;
  surname: string;
  city: string;
  phoneNumber: string;
  profileDescription: string;
  houseRules: string;
  houseNumber: string;
  street: string;
  town: string;
};

export type jobsTable = {
  JobID: string;
  RequiredCaregivingType: string;
  OtherRequirements: string;
  DatePosted: string;
};

export type dealsTable = {
  id: string;
  name: string;
};
