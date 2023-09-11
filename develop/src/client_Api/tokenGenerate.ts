import { IToken, ITokenStorage, ICustomerInfoForLogin } from "./interfaces";

export const projectKey = process.env.REACT_APP_PROJECT_KEY;
export const clientId = process.env.REACT_APP_CLIENT_ID;
export const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
export const region = process.env.REACT_APP_REGION;
export const scope = process.env.REACT_APP_SCOPE;

export const clientIdUnknown = process.env.REACT_APP_CLIENT_ID_UNKNOWN;
export const clientSecretUnknown = process.env.REACT_APP_CLIENT_SECRET_UNKNOWN;
export const scopeUnknown = process.env.REACT_APP_SCOPE_UNKNOWN;

const getToken = async (): Promise<IToken | null> => {
  const url = `https://auth.${region}.commercetools.com/oauth/${projectKey}/anonymous/token`;
  const requestBody = `grant_type=client_credentials&scope=${scopeUnknown}`;
  try {
    const response: Response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${btoa(`${clientIdUnknown}:${clientSecretUnknown}`)}`,
      },
      body: requestBody,
    });

    return await response.json();
  } catch (error) {
    return null;
  }
};

export const tokenGenerate = async (): Promise<string | null> => {
  const actionTime = 172790000;
  const currantTime: number = Date.now();
  const tokenStorage = <string | null>localStorage.getItem("token");

  if (tokenStorage && currantTime - JSON.parse(tokenStorage).creation_time < actionTime) {
    const token: string = JSON.parse(tokenStorage).access_token;
    return token;
  }

  if (
    tokenStorage &&
    currantTime - JSON.parse(tokenStorage).creation_time > actionTime &&
    JSON.parse(tokenStorage).token_type === "customer"
  ) {
    localStorage.removeItem("token");
    // Log Out !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    return null;
  }

  const token: IToken | null = await getToken();

  if (!token || !("access_token" in token)) return null;

  const data: ITokenStorage = {
    access_token: token.access_token,
    creation_time: currantTime,
    token_type: "anonimous",
  };

  localStorage.setItem("token", JSON.stringify(data));
  return token.access_token;
};

export const changeToken = async (body: ICustomerInfoForLogin): Promise<void> => {
  const url = `https://auth.${region}.commercetools.com/oauth/${projectKey}/customers/token`;
  const requestBody = `grant_type=password&username=${body.email}&password=${body.password}&scope=${scope}`;

  try {
    const response: Response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
      },
      body: requestBody,
    });

    const result: IToken = await response.json();
    const currantTime = Date.now();

    const data: ITokenStorage = {
      access_token: result.access_token,
      creation_time: currantTime,
      token_type: "customer",
    };

    localStorage.setItem("token", JSON.stringify(data));
  } catch (error) {
    return;
  }
};
