export interface IgetToken {
  access_token: string;
  expires_in: number;
  scope: string[];
  token_type: string;
}

export interface ICustomerInfoForLogin {
  email: string;
  password: string;
}

export interface ICustomerInfoForSingUp extends ICustomerInfoForLogin {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: {
    country: string;
    streetName: string;
    postalCode: string;
    city: string;
  }[];
}
