import { useState, useEffect } from "react";
import { EmptyBasket } from "./EmptyBasket";
import { FillBasket } from "./FillBasket";
import { ICart } from "../../client_Api/interfaces";
import { getActiveCart } from "../../client_Api/carts";

import "./BasketContent.scss";

const BasketContent: React.FC = () => {
  const [Cart, setCart] = useState<ICart>();
  const [count, setCount] = useState(0);

  const fetchData = async () => {
    const response = await getActiveCart();
    if (!response) return null;
    setCart(response);
  };

  const countIncrease = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    fetchData().then(() => {});
  }, [count]);

  return (
    <main className="BasketContent">
      <h2 className="basket_header">Basket</h2>
      {Cart?.lineItems.length && <FillBasket cart={Cart} count={countIncrease} />}
      {!Cart?.lineItems.length && <EmptyBasket />}
    </main>
  );
};

export default BasketContent;
