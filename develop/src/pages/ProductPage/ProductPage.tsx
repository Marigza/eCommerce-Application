import { ProductCard } from "../../components/ProductCard";
import { useChioseProduct } from "../../client_Api/useChoiseProduct";

const ProductPage: React.FC = () => {
  const { ProductItem } = useChioseProduct();
  return <>{ProductItem && <ProductCard product={ProductItem} />}</>;
};

export default ProductPage;
