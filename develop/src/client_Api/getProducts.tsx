import { tokenGenerate } from "./tokenGenerate";
export const getProducts = async () => {
  const objectToken: string | null = await tokenGenerate();
  const projectKey = "just-develop23";

  if (!objectToken) return null;

  try {
    const response = await fetch(
      `https://api.europe-west1.gcp.commercetools.com/${projectKey}/products`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${objectToken}`,
        },
      }
    );
    const products = await response.json();

    if (!products.results) return null;

    return products.results;
  } catch (e) {
    return null;
  }
};
