import { useAllProducts } from "../../client_Api/useAllProducts";
import { Product } from "../Product";

import "./MainContent.scss";

const MainContent: React.FC = () => {
  const { Products } = useAllProducts();
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
