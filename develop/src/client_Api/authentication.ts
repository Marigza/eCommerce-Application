import { ICustomerInfoForSingUp, ICustomerInfoForLogin, ICustomerStorage } from "./interfaces";
import { region, projectKey, tokenGenerate } from "./tokenGenerate";

export const signUpCustomer = async (body: ICustomerInfoForSingUp): Promise<boolean | null> => {
  const url = `https://api.${region}.commercetools.com/${projectKey}/customers`;
  const token: string | null = await tokenGenerate();

  if (!token) return null;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) return false;

    const result = await response.json();

    if (result.customer.id) {
      const customerStorage: ICustomerStorage = { ID: result.customer.id, email: body.email };
      localStorage.setItem("customer_info", JSON.stringify(customerStorage));
    }

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
            Authorization: `Bearer ${token}`,
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

export const loginCustomer = async (body: ICustomerInfoForLogin): Promise<boolean | null> => {
  const token: string | null = await tokenGenerate();
  const url = `https://api.${region}.commercetools.com/${projectKey}/login`;

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
    const result = await response.json();

    if (result && result.customer.id) {
      const customerStorage: ICustomerStorage = { ID: result.customer.id, email: body.email };
      localStorage.setItem("customer_info", JSON.stringify(customerStorage));
    }

    return response.ok;
  } catch (error) {
    return null;
  }
};
