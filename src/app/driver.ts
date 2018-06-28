export interface DriverList {
  DriverList: Driver[];
}

export interface Driver {
  id: NumberWrapper;
  name: StringWrapper;
  avatar: StringWrapper;
  phone: StringWrapper;
  post: StringWrapper;
  department: StringWrapper;
  generalContractor: StringWrapper;
  company: StringWrapper;
  lineManager: StringWrapper;
  driverLicenseNumber: StringWrapper;
  driverLicenseDate: StringWrapper;
  experience: NumberWrapper;
  driverAutoLicenseCategory: ArrayWrapper;
  driverTractLicenseCategory: ArrayWrapper;
}

export interface ArrayWrapper extends Wrapper {
  value: Array<AutoCategory | TractorCategory>;
}

export interface StringWrapper extends Wrapper {
  value: string;
}

export interface NumberWrapper extends Wrapper {
  value: number;
}

export interface Wrapper {
  canWrite: boolean;
  canRead: boolean;
}

export enum AutoCategory {
  'A', 'A1', 'B', 'BE', 'B1', 'C', 'CE', 'C1', 'C1E', 'D', 'DE', 'D1', 'D1E', 'M', 'Tm', 'Tb'
}

export enum TractorCategory {
  'A', 'A1', 'A2', 'A3', 'A4', 'B', 'C', 'D', 'E', 'F'
}
