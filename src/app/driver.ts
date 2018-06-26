export interface DriverList {
  DriverList: Driver[];
}
export interface Driver {
  id: Wrapper;
  name:  StringWrapper;
  avatar:  StringWrapper;
  phone:  StringWrapper;
  post:  StringWrapper;
  department:  StringWrapper;
  generalContractor:  StringWrapper;
  company: StringWrapper;
  lineManager:  StringWrapper;
  driverLicenseNumber:  StringWrapper;
  driverLicenseDate:  StringWrapper;
  experience:  NumberWrapper;
  driverAutoLicenseCategory: AutoCategory;
  driverTractLicenseCategory: TractorCategory;
}
export interface StringWrapper extends Wrapper{
  value: string;
}
export interface BooleanWrapper extends Wrapper{
  value: boolean;
}
export interface NumberWrapper extends Wrapper{
  value: number;
}
export interface Wrapper {
  canWrite: boolean;
  canRead: boolean;
}
export enum AutoCategory {
  A,B,C,D,E
}
export enum TractorCategory {
  A,B,C,D,E
}
