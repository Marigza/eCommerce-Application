import { useState, useEffect } from "react";
import { IProduct } from "../../client_Api/interfaces";
import { getProductList } from "../../client_Api/productList";
import "./MainContent.scss";
import CatalogProduct from "../CatalogProduct/CatalogProduct";

const MainContent: React.FC = () => {
  const [Products, setProducts] = useState<IProduct[]>([]);

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
        {Products.map((product) => (
          <CatalogProduct product={product} key={product.id} />
        ))}
      </div>
    </main>
  );
};

export default MainContent;
