import { useState, useEffect } from "react";
import { IProduct } from "../../client_Api/interfaces";
import { getProductList } from "../../client_Api/productList";
import HomeSlider from "../HomeSlider/HomeSlider";
import Product from "../Product/Product";
import "./MainContent.scss";

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
      <HomeSlider />
      <div className="content__block">
        {Products.map((product) => (
          <Product product={product} key={product.id} />
        ))}
      </div>
    </main>
  );
};

export default MainContent;
