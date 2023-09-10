import { region, projectKey, tokenGenerate } from "./tokenGenerate";
import { ICart, ICartError } from "./interfaces";

const createCart = async (): Promise<ICart | null> => {
  const token: string | null = await tokenGenerate();

  if (!token) return null;

  const url = `https://api.${region}.commercetools.com/${projectKey}/me/carts`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        currency: "USD",
      }),
    });

    return await response.json();
  } catch (error) {
    return null;
  }
};

export const getActiveCart = async (): Promise<ICart | null> => {
  const token: string | null = await tokenGenerate();

  if (!token) return null;

  const url = `https://api.${region}.commercetools.com/${projectKey}/me/active-cart`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) return null;

    return await response.json();
  } catch (error) {
    return null;
  }
};

const getCart = async (): Promise<string | null> => {
  const anonimousCart: string | null = localStorage.getItem("anonimousCart");

  if (anonimousCart) return anonimousCart;
  const response = await createCart();

  if (!response || !response.id) return null;

  localStorage.setItem("anonimousCart", response.id);
  return response.id;
};

const getAnonimousCart = async (): Promise<ICart | null> => {
  // const IdOfAnonimousCart: string | null = await getIdOfAnonimousCart();
  const IdOfAnonimousCart = "c41d8b11-a3b2-4376-8754-e4adee26f1e7";
  const tokenUnknown: string | null = await tokenGenerate();

  if (!tokenUnknown || !IdOfAnonimousCart) return null;

  const url = `https://api.${region}.commercetools.com/${projectKey}/me/carts/${IdOfAnonimousCart}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenUnknown}`,
      },
    });

    return await response.json();
  } catch (error) {
    return null;
  }
};

export const addProductToAnonimousCart = async (IdOfProduct: string) => {
  const tokenUnknown: string | null = await tokenGenerate();
  const cart: ICart | null = await getAnonimousCart();

  if (!tokenUnknown || !cart || !cart.version || !cart.id) return null;

  const url = `https://api.${region}.commercetools.com/${projectKey}/me/carts/${cart.id}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenUnknown}`,
      },
      body: JSON.stringify({
        version: cart.version,
        actions: [
          {
            action: "addLineItem",
            productId: IdOfProduct,
            variantId: 1,
            quantity: 1,
          },
        ],
      }),
    });

    return await response.json();
  } catch (error) {
    return null;
  }
};
