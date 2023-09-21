import { ProductCard } from "../../components/ProductCard";
import { useChioseProduct } from "../../client_Api/useChoiseProduct";

const ProductPage: React.FC<{
  state: boolean;
  changeState: () => void;
}> = (props) => {
  const { ProductItem } = useChioseProduct();
  return (
    <>
      {ProductItem && (
        <ProductCard product={ProductItem} state={props.state} changeState={props.changeState} />
      )}
    </>
  );
};

export default ProductPage;
