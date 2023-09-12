import { useState, useEffect } from "react";
import { EmptyBasket } from "./EmptyBasket";
import { FillBasket } from "./FillBasket";
import { ICart } from "../../client_Api/interfaces";

import "./BasketContent.scss";
import { getCart } from "../../client_Api/carts";

const BasketContent: React.FC = () => {
  const [Cart, setCart] = useState<ICart>();

  useEffect(() => {
    async function fetchData() {
      const response = await getCart();
      if (!response) return null;
      setCart(response);
    }

    fetchData();
  }, []);

  return (
    <main className="BasketContent">
      <h2 className="basket_header">Basket</h2>
      {Cart?.lineItems.length && <FillBasket cart={Cart} />}
      {!Cart?.lineItems.length && <EmptyBasket />}
    </main>
  );
};

export default BasketContent;
