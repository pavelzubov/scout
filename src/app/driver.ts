export interface DriverList {
  DriverList: Driver[];
}

export interface Driver {
  id: Wrapper<number>;
  name: Wrapper<string>;
  avatar: Wrapper<string>;
  phone: Wrapper<string>;
  post: Wrapper<string>;
  department: Wrapper<string>;
  generalContractor: Wrapper<string>;
  company: Wrapper<string>;
  lineManager: Wrapper<string>;
  driverLicenseNumber: Wrapper<string>;
  driverLicenseDate: Wrapper<string>;
  experience: Wrapper<number>;
  driverAutoLicenseCategory: Wrapper<Array<AutoCategory>>;
  driverTractLicenseCategory: Wrapper<Array<TractorCategory>>;
}

export interface Wrapper<T> {
  canWrite: boolean;
  canRead: boolean;
  value: T;
}

export enum AutoCategory {
  'A', 'A1', 'B', 'BE', 'B1', 'C', 'CE', 'C1', 'C1E', 'D', 'DE', 'D1', 'D1E', 'M', 'Tm', 'Tb'
}

export enum TractorCategory {
  'A', 'A1', 'A2', 'A3', 'A4', 'B', 'C', 'D', 'E', 'F'
}
