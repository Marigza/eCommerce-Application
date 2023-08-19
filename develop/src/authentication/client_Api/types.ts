export interface IgetProject {
  access_token: string;
  expires_in: number;
  scope: string[];
  token_type: string;
}

export interface IBodyOfSingUpCustomer {
  email: string;
  password: string;
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

export interface ILoginCustomer {
  email: string;
  password: string;
}
