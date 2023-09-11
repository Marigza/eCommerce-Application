import { IToken, ITokenStorage } from "./interfaces";

export const projectKey = process.env.REACT_APP_PROJECT_KEY;
export const clientId = process.env.REACT_APP_CLIENT_ID;
export const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
export const region = process.env.REACT_APP_REGION;
export const scope = process.env.REACT_APP_SCOPE;

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

export const tokenGenerate = async (): Promise<string | null> => {
  const actionTime = 129600000;
  const currantTime = Date.now();
  const tokenStorage = <string | null>localStorage.getItem("token");
  if (tokenStorage && currantTime - JSON.parse(tokenStorage).creation_time < actionTime) {
    const token: string = JSON.parse(tokenStorage).access_token;
    return token;
  }
  const token: IToken | null = await getToken();
  const data: ITokenStorage = {
    access_token: "",
    creation_time: 0,
  };
  if (token && "access_token" in token) {
    data.access_token = token.access_token;
    data.creation_time = currantTime;

    localStorage.setItem("token", JSON.stringify(data));
    return token.access_token;
  }
  return null;
};
