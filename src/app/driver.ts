export interface DriverList {
  DriverList: Driver[];
}
export interface Driver {
  id: Wrapper;
  name:  Wrapper;
  avatar:  Wrapper;
  phone:  Wrapper;
  post:  Wrapper;
  department:  Wrapper;
  generalContractor:  Wrapper;
  company: Wrapper;
  lineManager:  Wrapper;
  driverLicenseNumber:  Wrapper;
  driverLicenseDate:  Wrapper;
  experience:  Wrapper;
  driverLicenseCategory: Wrapper;
  driverTractLicenseCategory: Wrapper;
}
export interface Wrapper {
  value: string;
  canWrite: boolean;
  canRead: boolean;
}
