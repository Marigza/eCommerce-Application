import { IgetProject } from "./types";

const projectKey: string = "just-develop23";
const clientId: string = "2PT-eztNLU3wgvgDpf8UwSxZ";
const clientSecret: string = "IunouGO33BJdWp3ge2ocqTJBvuSSCJpq";
const region: string = "europe-west1.gcp";
const scope: string[] = [
  "manage_project:just-develop23 view_audit_log:just-develop23 manage_api_clients:just-develop23",
];

const getToken = async () => {
  const baseUrl: string = `https://auth.${region}.commercetools.com/oauth/token`;
  const requestBody: string = `grant_type=client_credentials&scope=${scope.join(" ")}`;

  const response: Response = await fetch(baseUrl, {
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

export const singUpCustom = async (body: string) => {
  const url = `https://api.${region}.commercetools.com/${projectKey}/customers`;
  const objectToken: IgetProject = await getToken();

  try {
    const response: Response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `${objectToken.token_type} ${objectToken.access_token}`,
      },
      body: body,
    });
    console.log(response);
    const result = await response.json();
    return result.status === 201 ? true : false;
  } catch (error) {
    return null;
  }
};

export const getInProject = async (objectToken: IgetProject, endPath: string) => {
  const baseUrl = `https://api.${region}.commercetools.com/${projectKey}/${endPath}`;

  const response = await fetch(baseUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `${objectToken.token_type} ${objectToken.access_token}`,
    },
  });

  return await response.json();
};
