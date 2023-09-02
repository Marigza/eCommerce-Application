import { useEffect, useState } from "react";
import { tokenGenerate } from "./tokenGenerate";
import { IProduct } from "./interfaces";

export function useAllProducts() {
  const [Products, setProducts] = useState<IProduct[]>([]);
  const projectKey = "just-develop23";

  const getProducts = async () => {
    const objectToken: string | null = await tokenGenerate();

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
      setProducts(products.results);
      return products.results;
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    getProducts();
  });

  return { Products };
}
