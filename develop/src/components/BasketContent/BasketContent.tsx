import { useState, useEffect } from "react";
import { EmptyBasket } from "./EmptyBasket";
import { FillBasket } from "./FillBasket";
import { ICart } from "../../client_Api/interfaces";
import { getActiveCart } from "../../client_Api/carts";

import "./BasketContent.scss";

const BasketContent: React.FC<{
  state: boolean;
  changeState: () => void;
}> = (props) => {
  const [Cart, setCart] = useState<ICart>();

  const fetchData = async () => {
    const response = await getActiveCart();
    if (!response) return null;
    setCart(response);
  };

  useEffect(() => {
    fetchData().then(() => {});
  }, [props.state]);

  return (
    <main className="BasketContent">
      <h2 className="basket_header">Basket</h2>
      {Cart?.lineItems.length && <FillBasket cart={Cart} changeState={props.changeState} />}
      {!Cart?.lineItems.length && <EmptyBasket />}
    </main>
  );
};

export default BasketContent;
