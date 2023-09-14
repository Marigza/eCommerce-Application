export interface IAddresses {
  id: string;
  type: string;
  country: string;
  streetName: string;
  postalCode: string;
  city: string;
  flag: boolean;
}

export interface IUser {
  addresses: IAddresses[];
  authenticationMode: string;
  billingAddressIds: string[];
  createdAt: string;
  createdBy: { clientId: string; isPlatformClient: boolean };
  dateOfBirth: string;
  email: string;
  firstName: string;
  id: string;
  isEmailVerified: boolean;
  lastMessageSequenceNumber: number;
  lastModifiedAt: string;
  lastModifiedBy: { clientId: string; isPlatformClient: boolean };
  lastName: string;
  password: string;
  shippingAddressIds: string[];
  stores: { key: string; typeId: string }[];
  version: number;
  versionModifiedAt: string;
  key?: string;
  customerNumber?: string;
  defaultShippingAddressId?: string;
  defaultBillingAddressId?: string;
}

export interface IUserInfoState {
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: JSX.Element[];
}
