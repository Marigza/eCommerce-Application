import { Helmet } from "react-helmet";
import { BasketContent } from "../../components/BasketContent";

const Basket: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>JustStore - Basket</title>
      </Helmet>
      <BasketContent />
    </>
  );
};

export default Basket;
