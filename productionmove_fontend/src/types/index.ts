export interface User {
  id: number;
  email: string;
  displayName: string;
  phone: string;
  photoURL: string;
  roleId: number;
}

export enum Role {
  DIRECTOR = 1,
  FACTORY = 2,
  INSURANCE = 3,
  DISTRIBUTION = 4,
}

export interface Product {
  id: string;
  productName: string;
  productLine: string;
}
export enum PRODUCT_STATUS {
  REQUEST_PRODUCED = 0,
  NEW_PRODUCED = 1,
  BRING_TO_DISTRIBUTION = 2,
  SOLD = 3,
  ERROR_NEED_WARRANTY = 4,
  WARRANTY_REPAIRING = 5,
  WARRANTY_DONE = 6,
  RETURN_WARRANTY_FOR_CUSTOMER = 7,
  ERROR_NEED_RETURN_FACTORY = 8,
  ERROR_IS_RETURNED_FACTORY = 9,
  NEED_TO_RECOVERY = 10,
  WARRANTY_TIME_OUT = 11,
  RETURN_TO_THE_MANUFACTURER = 12,
}
