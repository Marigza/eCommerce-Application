import { useState, useEffect } from "react";
import { IProductResponse } from "../../client_Api/interfaces";
import { getProductList } from "../../client_Api/productList";
import "./MainContent.scss";
import CatalogProduct from "../CatalogProduct/CatalogProduct";

const MainContent: React.FC = () => {
  const [Products, setProducts] = useState<IProductResponse>({
    count: 0,
    limit: 0,
    offset: 0,
    total: 0,
    results: [],
  });

  useEffect(() => {
    async function fetchData() {
      const response = await getProductList(``);
      setProducts(response);
    }

    fetchData();
  }, []);

  return (
    <main className="mainContent">
      <div className="content__block">
        {Products.results.map((product) => (
          <CatalogProduct product={product} key={product.id} />
        ))}
      </div>
    </main>
  );
};

export default MainContent;
