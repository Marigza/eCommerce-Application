import { region, projectKey, tokenGenerate } from "./tokenGenerate";
import { IUser } from "../components/UserProfile/interfaces";

export const getUserInfo = async (): Promise<IUser | null> => {
  const customerStorage = <string | null>localStorage.getItem("customer_info");
  const token: string | null = await tokenGenerate();

  if (!token) return null;

  if (!customerStorage || (customerStorage && !JSON.parse(customerStorage).ID)) return null;
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
