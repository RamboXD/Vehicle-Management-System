export type Driver = {
  DriverID: string;
  UserID: string;
  Government: string;
  Name: string;
  Surname: string;
  MiddleName: string;
  Address: string;
  Phone: string;
  Email: string;
  DrivingLicenseCode: string;
};
export type UserRega = {
  email: string;
  password: string;
};

export type DriverRega = {
  government: string;
  name: string;
  surname: string;
  middleName: string;
  address: string;
  phone: string;
  email: string;
  drivingLicenseCode: string;
};

export type DriverProfileRega = {
  user: UserRega;
  driver: DriverRega;
};
type FuelingRega = {
  certification: string;
  name: string;
  surname: string;
  middleName: string;
};

export type FuelingProfileRega = {
  user: UserRega;
  fueling_person: FuelingRega;
};
