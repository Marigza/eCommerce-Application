import { region, projectKey, tokenGenerate } from "./tokenGenerate";
import { ICart, ICartError, IproductInCart } from "./interfaces";

const createCart = async (): Promise<ICart | null> => {
  const token: string | null = await tokenGenerate();

  if (!token) return null;

  const url = `https://api.${region}.commercetools.com/${projectKey}/me/carts`;

  try {
    const response: Response = await fetch(url, {
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

const getActiveCart = async (): Promise<ICart | null> => {
  const token: string | null = await tokenGenerate();

  if (!token) return null;

  const url = `https://api.${region}.commercetools.com/${projectKey}/me/active-cart`;

  try {
    const response: Response = await fetch(url, {
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

export const getCart = async (): Promise<ICart | null> => {
  const cart: ICart | null = await getActiveCart();

  if (cart) return cart;

  const newCart: ICart | null = await createCart();
  return newCart;
};

export const addProductToCart = async (IdOfProduct: string) => {
  const token: string | null = await tokenGenerate();
  const cart: ICart | null = await getCart();

  if (!token || !cart || !cart.version || !cart.id) return null;

  const url = `https://api.${region}.commercetools.com/${projectKey}/me/carts/${cart.id}`;

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

export const changeQuantityInCart = async (IdOfProduct: string, quantity: number) => {
  const token: string | null = await tokenGenerate();
  const cart: ICart | null = await getActiveCart();

  if (!token || !cart || !cart.id || !cart.version) return null;

  const lineItem: IproductInCart | undefined = cart.lineItems.find(
    (el) => el.productId === IdOfProduct
  );

  if (!lineItem || !lineItem.quantity) return null;

  let currantQuantity: number = lineItem.quantity;
  switch (quantity) {
    case 1:
      currantQuantity++;
      break;
    case -1:
      currantQuantity--;
      break;
    case 0:
      currantQuantity = 0;
      break;
  }
  const url = `https://api.${region}.commercetools.com/${projectKey}/me/carts/${cart.id}`;

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
            action: "changeLineItemQuantity",
            lineItemId: lineItem.id,
            variantId: 1,
            quantity: currantQuantity,
          },
        ],
      }),
    });

    return await response.json();
  } catch (error) {
    return null;
  }
};

/*

const getAnonimousCart = async (): Promise<ICart | null> => {
const IdOfAnonimousCart: string | null = await getIdOfAnonimousCart();
  const IdOfAnonimousCart = "c41d8b11-a3b2-4376-8754-e4adee26f1e7";
  const tokenUnknown: string | null = await tokenGenerate();

  if (!tokenUnknown || !IdOfAnonimousCart) return null;

  const url = `https://api.${region}.commercetools.com/${projectKey}/me/carts/${IdOfAnonimousCart}`;

  try {
    const response: Response = await fetch(url, {
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

*/
