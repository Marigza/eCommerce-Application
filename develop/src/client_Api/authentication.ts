import { ICustomerInfoForSingUp, ICustomerInfoForLogin, ICustomerStorage } from "./interfaces";
import { IUser } from "../components/UserProfile/interfaces";
import { region, projectKey, tokenGenerate, changeToken } from "./tokenGenerate";
import { removeAllDiscountCode } from "./discount";

const path = `https://api.${region}.commercetools.com/${projectKey}`;

export const signUpCustomer = async (body: ICustomerInfoForSingUp): Promise<boolean | null> => {
  const url = `${path}/me/signup`;
  const token: string | null = await tokenGenerate();

  if (!token) return null;

  try {
    const response: Response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) return false;

    localStorage.setItem("new_customer", "true");
    const customer: IUser = (await response.json()).customer;
    await changeToken({ email: body.email, password: body.password });

    if (customer.id) {
      const customerStorage: ICustomerStorage = { ID: customer.id, email: body.email };
      localStorage.setItem("customer_info", JSON.stringify(customerStorage));
    }

    if (customer.id && customer.version && customer.addresses[0].id && customer.addresses[1].id) {
      const newToken: string | null = await tokenGenerate();

      await Promise.all([
        fetch(`${path}/customers/${customer.id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${newToken}`,
          },
          body: JSON.stringify({
            version: customer.version,
            actions: [
              { action: "addShippingAddressId", addressId: customer.addresses[0].id },
              { action: "addBillingAddressId", addressId: customer.addresses[1].id },
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

export const loginCustomer = async (body: ICustomerInfoForLogin): Promise<boolean | null> => {
  const token: string | null = await tokenGenerate();
  const url = `${path}/me/login`;

  if (!token) {
    return null;
  }

  try {
    const response: Response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    const customer: IUser = (await response.json()).customer;

    if (customer.id) {
      const customerStorage: ICustomerStorage = { ID: customer.id, email: body.email };
      localStorage.setItem("customer_info", JSON.stringify(customerStorage));
    }

    await changeToken(body);

    return response.ok;
  } catch (error) {
    return null;
  }
};

export const logoutCustomer = async (): Promise<void> => {
  await removeAllDiscountCode();
  localStorage.removeItem("token");
  localStorage.removeItem("customer_info");
  localStorage.removeItem("new_customer");
  await tokenGenerate();
};
