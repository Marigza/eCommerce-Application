import { useEffect, useState } from "react";
import { projectKey, tokenGenerate } from "./tokenGenerate";
import { IProductDetails } from "./interfaces";

export function useChioseProduct() {
  const [ProductItem, setProduct] = useState<IProductDetails>();
  const getIDProduct = localStorage.getItem("ID");

  const getProduct = async (Id: string) => {
    const objectToken: string | null = await tokenGenerate();

    if (!objectToken) return null;

    try {
      const response = await fetch(
        `https://api.europe-west1.gcp.commercetools.com/${projectKey}/products/${Id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${objectToken}`,
          },
        }
      );
      const product = await response.json();

      if (!product) return null;

      setProduct(product);
      return product;
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    if (getIDProduct) {
      getProduct(getIDProduct);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ProductItem };
}
