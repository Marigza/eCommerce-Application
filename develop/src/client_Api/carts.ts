import { region, projectKey, tokenGenerate } from "./tokenGenerate";
import { ICart, IproductInCart } from "./interfaces";

const path = `https://api.${region}.commercetools.com/${projectKey}/me`;

const createCart = async (): Promise<ICart | null> => {
  const token: string | null = await tokenGenerate();

  if (!token) return null;

  const url = `${path}/carts`;

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

export const getActiveCart = async (): Promise<ICart | null> => {
  const token: string | null = await tokenGenerate();

  if (!token) return null;

  const url = `${path}/active-cart`;

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

const getCart = async (): Promise<ICart | null> => {
  const cart: ICart | null = await getActiveCart();

  if (cart) return cart;

  const newCart: ICart | null = await createCart();
  return newCart;
};

export const addProductToCart = async (IdOfProduct: string) => {
  const token: string | null = await tokenGenerate();
  const cart: ICart | null = await getCart();

  if (!token || !cart || !cart.version || !cart.id) return null;

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

  if (!token || !cart || !cart.id || !cart.version || !cart.lineItems) return null;

  const lineItem: IproductInCart | undefined = cart.lineItems.find(
    (el: IproductInCart): boolean => el.productId === IdOfProduct
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

export const cleanCart = async () => {
  const token: string | null = await tokenGenerate();
  const cart: ICart | null = await getActiveCart();

  if (!token || !cart || !cart.id || !cart.version) return null;

  const url = `${path}/carts/${cart.id}?version=${cart.version}`;

  try {
    const response: Response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) return null;

    await createCart();
  } catch (error) {
    return null;
  }
};
