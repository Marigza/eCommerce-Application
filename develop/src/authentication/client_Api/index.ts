/* eslint-disable @typescript-eslint/no-unused-vars */
import { IgetToken, ICustomerInfoForSingUp, ICustomerInfoForLogin } from "./types";

const projectKey = "just-develop23";
const clientId = "2PT-eztNLU3wgvgDpf8UwSxZ";
const clientSecret = "IunouGO33BJdWp3ge2ocqTJBvuSSCJpq";
const region = "europe-west1.gcp";
const scope: string[] = [
  "manage_project:just-develop23 view_audit_log:just-develop23 manage_api_clients:just-develop23",
];

const getToken = async (): Promise<IgetToken | null> => {
  const url = `https://auth.${region}.commercetools.com/oauth/token`;
  const requestBody = `grant_type=client_credentials&scope=${scope.join(" ")}`;
  try {
    const response: Response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
      },
      body: requestBody,
    });

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    return null;
  }
};

export const singUpCustomer = async (body: ICustomerInfoForSingUp): Promise<boolean | null> => {
  const url = `https://api.${region}.commercetools.com/${projectKey}/customers`;
  const objectToken: IgetToken | null = await getToken();
  if (objectToken) {
    try {
      const response: Response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `${objectToken.token_type} ${objectToken.access_token}`,
        },
        body: JSON.stringify(body),
      });
      const result = await response.json();

      if (response.ok) {
        try {
          fetch(`${url}/${result.customer.id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `${objectToken.token_type} ${objectToken.access_token}`,
            },
            body: JSON.stringify({
              version: result.customer.version,
              actions: [
                { action: "addShippingAddressId", addressId: result.customer.addresses[0].id },
                { action: "addBillingAddressId", addressId: result.customer.addresses[1].id },
              ],
            }),
          });
          return true;
        } catch (err) {
          return true;
        }
      } else return false;
    } catch (error) {
      return null;
    }
  } else return null;
};

export const loginCustomer = async (bodyObject: ICustomerInfoForLogin): Promise<boolean | null> => {
  const url = `https://auth.${region}.commercetools.com/oauth/${projectKey}/customers/token`;
  const requestBody = `grant_type=password&username=${bodyObject.email}&password=${
    bodyObject.password
  }&scope=${scope.join(" ")}`;

  try {
    const response: Response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
      },
      body: requestBody,
    });
    const result = await response.json();
    return response.ok;
  } catch (error) {
    return null;
  }
};
