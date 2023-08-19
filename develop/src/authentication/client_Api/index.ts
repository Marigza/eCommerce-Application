import { IgetProject, IBodyOfSingUpCustomer, ILoginCustomer } from "./types";

const projectKey: string = "just-develop23";
const clientId: string = "2PT-eztNLU3wgvgDpf8UwSxZ";
const clientSecret: string = "IunouGO33BJdWp3ge2ocqTJBvuSSCJpq";
const region: string = "europe-west1.gcp";
const scope: string[] = [
  "manage_project:just-develop23 view_audit_log:just-develop23 manage_api_clients:just-develop23",
];

const getToken = async () => {
  const url: string = `https://auth.${region}.commercetools.com/oauth/token`;
  const requestBody: string = `grant_type=client_credentials&scope=${scope.join(" ")}`;

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
};

export const singUpCustomer = async (body: IBodyOfSingUpCustomer) => {
  const url = `https://api.${region}.commercetools.com/${projectKey}/customersss`;
  const objectToken: IgetProject = await getToken();

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
    return response.ok;
  } catch (error) {
    return null;
  }
};

export const loginCustomer = async (bodyObject: ILoginCustomer) => {
  const url: string = `https://auth.${region}.commercetools.com/oauth/${projectKey}/customers/token`;
  const requestBody: string = `grant_type=password&username=${bodyObject.email}&password=${
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
