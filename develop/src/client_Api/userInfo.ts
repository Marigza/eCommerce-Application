import { region, projectKey, tokenGenerate } from "./tokenGenerate";
import { IBodyOfChangeUserData, IUser } from "../components/UserProfile/interfaces";

export const getUserInfo = async (): Promise<IUser | null> => {
  const customerStorage = <string | null>localStorage.getItem("customer_info");
  const token: string | null = await tokenGenerate();

  if (!token || !customerStorage) return null;

  const ID: string = JSON.parse(customerStorage).ID;

  const url = `https://api.${region}.commercetools.com/${projectKey}/customers/${ID}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
    });

    return await response.json();
  } catch (error) {
    return null;
  }
};

export const changeDataOfUser = async (body: IBodyOfChangeUserData) => {
  const user = await getUserInfo();
  const token: string | null = await tokenGenerate();

  if (!token || !user) return null;

  const url = `https://api.${region}.commercetools.com/${projectKey}/customers/${user.id}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        version: user.version,
        actions: [body],
      }),
    });

    return await response.json();
  } catch (error) {
    return null;
  }
};
