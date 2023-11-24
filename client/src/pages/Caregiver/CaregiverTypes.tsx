export interface User {
  UserID: string;
  Email: string;
  GivenName: string;
  Surname: string;
  City: string;
  PhoneNumber: string;
  ProfileDescription: string;
  Password: string; // Note: Storing passwords on the client side is not recommended for security reasons.
}

export interface Member {
  MemberUserID: string;
  HouseRules: string;
  User: User;
}

export interface Job {
  JobID: string;
  MemberUserID: string;
  RequiredCaregivingType: string;
  OtherRequirements: string;
  DatePosted: string;
  Member: Member;
}

export interface JobsResponse {
  jobs: Job[];
  status: string;
}

export interface ApplyResponse {
  message: string;
  status: string;
}

export interface ApplicationsResponse {
  applications: Application2[];
  status: string;
}

export interface Member {
  MemberUserID: string;
  HouseRules: string;
  User: {
    UserID: string;
    Email: string;
    GivenName: string;
    Surname: string;
    City: string;
    PhoneNumber: string;
    ProfileDescription: string;
    Password: string;
  };
}

export interface Application {
  CaregiverUserID: string;
  JobID: string;
  DateApplied: string;
  Caregiver: {
    CaregiverUserID: string;
    Photo: string | null;
    Gender: string;
    CaregivingType: string;
    HourlyRate: number;
    User: {
      UserID: string;
      Email: string;
      GivenName: string;
      Surname: string;
      City: string;
      PhoneNumber: string;
      ProfileDescription: string;
      Password: string;
    };
  };
  Job: {
    JobID: string;
    MemberUserID: string;
    RequiredCaregivingType: string;
    OtherRequirements: string;
    DatePosted: string;
    Member: Member;
  };
}

export interface UserDetails {
  UserID: string;
  Email: string;
  GivenName: string;
  Surname: string;
  City: string;
  PhoneNumber: string;
  ProfileDescription: string;
}

export interface MemberDetails {
  MemberUserID: string;
  HouseRules: string;
  UserDetails: UserDetails;
}

export interface JobDetails {
  JobID: string;
  MemberUserID: string;
  RequiredCaregivingType: string;
  OtherRequirements: string;
  DatePosted: string;
  MemberDetails: MemberDetails;
}

export interface Application2 {
  DateApplied: string;
  JobDetails: JobDetails;
}

export interface Appointment {
  AppointmentID: string;
  CaregiverUserID: string;
  MemberUserID: string;
  AppointmentDate: string;
  AppointmentTime: string;
  WorkHours: number;
  Status: string;
  Member: Member;
}

export interface AppointmentsResponse {
  appointments: Appointment[];
  status: string;
}
