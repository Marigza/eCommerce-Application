import React, { useState, useEffect } from "react";
import { changeQuantityInCart, cleanCart, getActiveCart } from "../../../client_Api/carts";
import { applyDiscountCode, removeOneDiscountCode } from "../../../client_Api/discount";
import { ICart, IDiscountCodeInCart, IproductInCart } from "../../../client_Api/interfaces";

const FillBasket: React.FC<{ cart: ICart; count: () => void }> = (props) => {
  const handlerClick = async (id: string, flag: number) => {
    if (!id) {
      await cleanCart().then(() => props.count());
    }
    await changeQuantityInCart(id, flag).then(() => props.count());
  };

  const [inputValue, setInputValue] = useState("");
  const [infoState, setInfoState] = useState(false);
  const [autumnPromo, setAutumnPromo] = useState(false);
  const [customerPromo, setCustomerPromo] = useState(false);

  const checkPromocode = async (): Promise<void> => {
    const cart: ICart | null = await getActiveCart();

    if (!cart || !cart.discountCodes) return;

    const promocodeArray: IDiscountCodeInCart[] = cart.discountCodes;

    setInfoState(false);
    setAutumnPromo(false);
    setCustomerPromo(false);

    if (promocodeArray.length !== 0) {
      setInfoState(true);

      promocodeArray.forEach((el: IDiscountCodeInCart) => {
        if (!el.discountCode.id) return;
        else if (el.discountCode.id === "106db22b-2631-4ee8-b552-abfb051a0ca6")
          setAutumnPromo(true);
        else if (el.discountCode.id === "e55d9d99-8e49-4b23-818f-305ffdb41c58")
          setCustomerPromo(true);
      });
    }

    props.count();
  };

  const handlerClickAddPromocode = async (): Promise<void> => {
    if (inputValue === "newcustomer") {
      const newCustomer: string | null = localStorage.getItem("new_customer");

      if (!newCustomer) {
        alert("Only newly registered users have access to this promocode !");
        return;
      }

      const response: boolean | null = await applyDiscountCode(inputValue);

      if (!response) return;

      setInputValue("");
      await checkPromocode();
      return;
    } else if (inputValue === "hotautumn") {
      const response: boolean | null = await applyDiscountCode(inputValue);

      if (!response) return;

      setInputValue("");
      await checkPromocode();
      return;
    }

    alert("Promo code is not valid...");
    return;
  };

  const handlerClickRemovePromocode = async (id: string): Promise<void> => {
    await removeOneDiscountCode(id).then(() => checkPromocode());
  };

  const totalPrice = (): JSX.Element => {
    if (!props.cart.totalPrice.centAmount) return <>0</>;
    const currantPrice = props.cart.totalPrice.centAmount;

    if (props.cart.discountCodes.length === 0) return <>{currantPrice / 100}</>;

    const productArray: IproductInCart[] = props.cart.lineItems;
    const fullPrice: number = productArray
      .map((el: IproductInCart) => {
        if (!el.price.value.centAmount || !el.quantity) return 0;
        return el.price.value.centAmount * el.quantity;
      })
      .reduce((a, b) => a + b);

    return (
      <>
        {<s>{fullPrice / 100}</s>} {currantPrice / 100}
      </>
    );
  };

  useEffect(() => {
    checkPromocode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="items_block">
      <div className="total-cost">
        <span>Total Cost</span>
        <span>
          <span>{totalPrice()} </span>
          <span>{props.cart.totalPrice.currencyCode}</span>
        </span>
      </div>
      <div className="items">
        {props.cart.lineItems.map((item) => (
          <div className="item" key={item.id}>
            <img src={item.variant.images[0].url} alt={item.name["en-US"]} height="100"></img>
            <span>{item.name["en-US"]}</span>
            <span>
              <span>
                {item.price.discounted
                  ? item.price.discounted.value.centAmount / 100
                  : item.price.value.centAmount / 100}{" "}
              </span>
              <span>{item.price.value.currencyCode}</span>
            </span>
            <span className="item-quantity">
              <span
                className="quantity quantity__btn"
                onClick={() => handlerClick(item.productId, -1)}
              >
                {"-"}
              </span>
              <span className="quantity">{item.quantity}</span>
              <span
                className="quantity quantity__btn"
                onClick={() => handlerClick(item.productId, 1)}
              >
                {"+"}
              </span>
            </span>
            <span>
              <span>{item.totalPrice.centAmount / 100} </span>
              <span>{item.totalPrice.currencyCode}</span>
            </span>
            <button className="delete-item" onClick={() => handlerClick(item.productId, 0)}>
              Delete
            </button>
          </div>
        ))}
      </div>
      <div className="basket-promocode">
        <div className="basket-promocode__action">
          <input
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="enter promocode"
            className="basket-promocode__action_input"
            type="text"
            value={inputValue}
          />
          <button
            onClick={handlerClickAddPromocode}
            className="basket-promocode__action_submit"
          ></button>
        </div>
        <div className={`basket-promocode__info ${infoState ? "" : "invisible"}`}>
          <div className={`basket-promocode__info_button-box ${autumnPromo ? "" : "invisible"}`}>
            hotautumn
            <button
              onClick={() => handlerClickRemovePromocode("106db22b-2631-4ee8-b552-abfb051a0ca6")}
              className="basket-promocode__info_button"
            ></button>
          </div>
          <div className={`basket-promocode__info_button-box ${customerPromo ? "" : "invisible"}`}>
            newcustomer
            <button
              onClick={() => handlerClickRemovePromocode("e55d9d99-8e49-4b23-818f-305ffdb41c58")}
              className="basket-promocode__info_button"
            ></button>
          </div>
        </div>
      </div>
      <div className="delete__block">
        <button
          className="delete-all"
          onClick={() => {
            const isSure = confirm("Do you really want to clean your cart?");
            if (isSure) {
              handlerClick("", 0);
            }
          }}
        >
          Clear shopping cart
        </button>
      </div>
    </div>
  );
};

export default FillBasket;
