import { region, projectKey, tokenGenerate } from "./tokenGenerate";
import { ICart, IDiscountCodeInCart } from "./interfaces";
import { getActiveCart } from "./carts";

const path = `https://api.${region}.commercetools.com/${projectKey}`;

export const applyDiscountCode = async (code: string): Promise<boolean | null> => {
  const token: string | null = await tokenGenerate();
  const cart: ICart | null = await getActiveCart();

  if (!token || !cart || !cart.id || !cart.version) return null;

  const url = `${path}/carts/${cart.id}`;

  try {
    const response: Response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        version: cart.version,
        actions: [{ action: "addDiscountCode", code: code }],
      }),
    });

    return response.ok;
  } catch (error) {
    return null;
  }
};

export const removeAllDiscountCode = async (): Promise<ICart | null> => {
  const token: string | null = await tokenGenerate();
  const cart: ICart | null = await getActiveCart();

  if (!token || !cart || !cart.id || !cart.version || !cart.discountCodes) return null;

  const actionArray: ({
    action: string;
    discountCode: {
      typeId: string;
      id: string;
    };
  } | null)[] = cart.discountCodes.map((el: IDiscountCodeInCart) => {
    if (!el.discountCode.id) return null;

    return {
      action: "removeDiscountCode",
      discountCode: {
        typeId: "discount-code",
        id: el.discountCode.id,
      },
    };
  });

  const url = `${path}/carts/${cart.id}`;

  try {
    const response: Response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        version: cart.version,
        actions: actionArray,
      }),
    });

    return await response.json();
  } catch (error) {
    return null;
  }
};

export const removeOneDiscountCode = async (id: string) => {
  const token: string | null = await tokenGenerate();
  const cart: ICart | null = await getActiveCart();

  if (!token || !cart || !cart.id || !cart.version || !cart.discountCodes) return null;

  const url = `${path}/carts/${cart.id}`;

  try {
    const response: Response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        version: cart.version,
        actions: [
          {
            action: "removeDiscountCode",
            discountCode: {
              typeId: "discount-code",
              id: id,
            },
          },
        ],
      }),
    });

    return await response.json();
  } catch (error) {
    return null;
  }
};
