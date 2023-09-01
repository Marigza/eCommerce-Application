import { useEffect, useState } from "react";
import { Product } from "../Product";
import { tokenGenerate } from "../../client_Api/tokenGenerate";
import { IProduct } from "../../client_Api/interfaces";

import "./MainContent.scss";

function useMyProduct() {
  const [Products, setProducts] = useState<IProduct[]>([]);
  const projectKey = "just-develop23";

  const getProducts = async () => {
    const objectToken: string | null = await tokenGenerate();
    if (objectToken) {
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
    }
  };

  useEffect(() => {
    getProducts();
  });

  return { Products };
}

const MainContent: React.FC = () => {
  const { Products } = useMyProduct();
  return (
    <main className="mainContent">
      <div className="content__block">
        {Products.map((product) => (
          <Product product={product} key={product.id} />
        ))}
      </div>
    </main>
  );
};

export default MainContent;
