import { useState, useEffect } from "react";
import { IProductResponse } from "../../client_Api/interfaces";
import { getProductList } from "../../client_Api/productList";
import { PromoBlock } from "../../components/PromoBlock";
import CatalogProduct from "../CatalogProduct/CatalogProduct";
import "./MainContent.scss";

const MainContent: React.FC<{
  state: boolean;
  changeState: () => void;
}> = (props) => {
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
  }, [props.state]);

  return (
    <main className="mainContent">
      <PromoBlock />
      <div className="content__block">
        {Products.results.map((product) => (
          <CatalogProduct
            product={product}
            key={product.id}
            state={props.state}
            changeState={props.changeState}
          />
        ))}
      </div>
    </main>
  );
};

export default MainContent;
