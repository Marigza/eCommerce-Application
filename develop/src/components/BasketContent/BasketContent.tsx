import { EmptyBasket } from "./EmptyBasket";
import { FillBasket } from "./FillBasket";

import "./BasketContent.scss";

const BasketContent: React.FC = () => {
  return (
    <main className="BasketContent">
      <h2 className="basket_header">Basket</h2>
      {/* <FillBasket /> */}
      {/* when a cart isn't empty delete next block*/}
      <EmptyBasket />
    </main>
  );
};

export default BasketContent;
