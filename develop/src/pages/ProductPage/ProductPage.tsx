import { Header } from "../../components/Header";
import { ProductCard } from "../../components/ProductCard";
import { useChioseProduct } from "../../client_Api/useChoiseProduct";

const ProductPage: React.FC = () => {
  const { ProductItem } = useChioseProduct();

  return (
    <>
      <Header />
      {ProductItem && <ProductCard product={ProductItem} />}
    </>
  );
};

export default ProductPage;
