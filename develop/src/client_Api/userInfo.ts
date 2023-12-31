import { region, projectKey, tokenGenerate } from "./tokenGenerate";
import { IUser } from "../components/UserProfile/interfaces";
import { IBodyOfChangeUserAddres } from "./interfaces";

const path = `https://api.${region}.commercetools.com/${projectKey}/customers`;

export const getUserInfo = async (): Promise<IUser | null> => {
  const customerStorage = <string | null>localStorage.getItem("customer_info");
  const token: string | null = await tokenGenerate();

  if (!token || !customerStorage) return null;

  const ID: string = JSON.parse(customerStorage).ID;

  const url = `${path}/${ID}`;

  try {
    const response: Response = await fetch(url, {
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

export const changeEmailOfUser = async (body: { email: string }): Promise<void> => {
  const user: IUser | null = await getUserInfo();
  const token: string | null = await tokenGenerate();
  if (!token || !user) return;

  const url = `${path}/${user.id}`;

  try {
    await Promise.all([
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          version: user.version,
          actions: [{ action: "changeEmail", email: `${body.email}` }],
        }),
      }),
    ]);
  } catch (error) {
    return;
  }
};

export const changeDataOfUser = async (body: {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}): Promise<void> => {
  const user: IUser | null = await getUserInfo();
  const token: string | null = await tokenGenerate();
  if (!token || !user) return;

  const url = `${path}/${user.id}`;

  try {
    await Promise.all([
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          version: user.version,
          actions: [
            { action: "setFirstName", firstName: `${body.firstName}` },
            { action: "setLastName", lastName: `${body.lastName}` },
            { action: "setDateOfBirth", dateOfBirth: `${body.dateOfBirth}` },
          ],
        }),
      }),
    ]);
  } catch (error) {
    return;
  }
};

export const changeAddressOfUser = async (body: IBodyOfChangeUserAddres): Promise<void> => {
  const user: IUser | null = await getUserInfo();
  const token: string | null = await tokenGenerate();

  if (!token || !user) return;

  const url = `${path}/${user.id}`;

  try {
    const response: Response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        version: user.version,
        actions: [
          { action: "removeAddress", addressId: body.id },
          {
            action: "addAddress",
            address: {
              streetName: body.street,
              postalCode: body.postalcode,
              city: body.city,
              country: body.country,
            },
          },
        ],
      }),
    });

    if (!response.ok) return;

    const result: IUser = await response.json();

    if (result.addresses && result.version && result.addresses[result.addresses.length - 1].id) {
      {
        await Promise.all([
          fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              version: result.version,
              actions: [
                {
                  action: `add${body.type}AddressId`,
                  addressId: result.addresses[result.addresses.length - 1].id,
                },
              ],
            }),
          }),
        ]);
      }
    }
  } catch (error) {
    return;
  }
};

export const addAddressOfUser = async (body: IBodyOfChangeUserAddres): Promise<void> => {
  const user: IUser | null = await getUserInfo();
  const token: string | null = await tokenGenerate();

  if (!token || !user) return;

  const url = `${path}/${user.id}`;
  try {
    const response: Response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        version: user.version,
        actions: [
          {
            action: "addAddress",
            address: {
              streetName: body.street,
              postalCode: body.postalcode,
              city: body.city,
              country: body.country,
            },
          },
        ],
      }),
    });

    if (!response.ok) return;

    const result: IUser = await response.json();

    if (result.addresses && result.version && result.addresses[result.addresses.length - 1].id) {
      {
        await Promise.all([
          fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              version: result.version,
              actions: [
                {
                  action: `add${body.type}AddressId`,
                  addressId: result.addresses[result.addresses.length - 1].id,
                },
              ],
            }),
          }),
        ]);
      }
    }
  } catch (error) {
    return;
  }
};

export const removeAddressOfUser = async (id: string): Promise<void> => {
  const user: IUser | null = await getUserInfo();
  const token: string | null = await tokenGenerate();
  if (!token || !user) return;

  const url = `${path}/${user.id}`;

  try {
    await Promise.all([
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          version: user.version,
          actions: [{ action: "removeAddress", addressId: id }],
        }),
      }),
    ]);
  } catch (error) {
    return;
  }
};
