/* eslint-disable @typescript-eslint/no-unused-vars */
import { IToken, ICustomerInfoForSingUp, ICustomerInfoForLogin } from "./types";

const projectKey = process.env.REACT_APP_PROJECT_KEY;
const clientId = process.env.REACT_APP_CLIENT_ID;
const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
const region = process.env.REACT_APP_REGION;
const scope = process.env.REACT_APP_SCOPE;

const getToken = async (): Promise<IToken | null> => {
  const url = `https://auth.${region}.commercetools.com/oauth/token`;
  const requestBody = `grant_type=client_credentials&scope=${scope}`;
  try {
    const response: Response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
      },
      body: requestBody,
    });

    return await response.json();
  } catch (error) {
    return null;
  }
};

export const singUpCustomer = async (body: ICustomerInfoForSingUp): Promise<boolean | null> => {
  const url = `https://api.${region}.commercetools.com/${projectKey}/customers`;
  const token: IToken | null = await getToken();

  if (!token) return null;

  try {
    if (!token.access_token) return null;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.access_token}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) return false;

    const result = await response.json();

    if (
      result.customer.id &&
      result.customer.version &&
      result.customer.addresses[0].id &&
      result.customer.addresses[0].id
    ) {
      await Promise.all([
        fetch(`${url}/${result.customer.id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.access_token}`,
          },
          body: JSON.stringify({
            version: result.customer.version,
            actions: [
              { action: "addShippingAddressId", addressId: result.customer.addresses[0].id },
              { action: "addBillingAddressId", addressId: result.customer.addresses[1].id },
            ],
          }),
        }),
      ]);
    }

    return true;
  } catch (error) {
    return null;
  }
};

export const loginCustomer = async (bodyObject: ICustomerInfoForLogin): Promise<boolean | null> => {
  const url = `https://auth.${region}.commercetools.com/oauth/${projectKey}/customers/token`;
  const requestBody = `grant_type=password&username=${bodyObject.email}&password=${bodyObject.password}&scope=${scope}`;

  try {
    const response: Response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
      },
      body: requestBody,
    });
    return response.ok;
  } catch (error) {
    return null;
  }
};
