import { region, projectKey, tokenGenerate } from "./tokenGenerate";

export const getProductList = async (endPath: string) => {
  const token: string | null = await tokenGenerate();

  if (!token) return null;

  const url = `https://api.${region}.commercetools.com/${projectKey}/product-projections/search${endPath}`;

  try {
    const response: Response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
    });
    const products = await response.json();

    if (!products.results) return null;

    return products;
  } catch (error) {
    return null;
  }
};
