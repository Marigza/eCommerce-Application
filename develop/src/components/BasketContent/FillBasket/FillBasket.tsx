import React from "react";
import { changeQuantityInCart, cleanCart } from "../../../client_Api/carts";
import { ICart } from "../../../client_Api/interfaces";

const FillBasket: React.FC<{ cart: ICart; count: () => void }> = (props) => {
  const handlerClick = async (id: string, flag: number) => {
    if (!id) {
      await cleanCart().then(() => props.count());
    }
    await changeQuantityInCart(id, flag).then(() => props.count());
  };

  const handlerClickPromocode = async () => {
    console.log("hi");
  };

  return (
    <div className="items_block">
      <div className="total-cost">
        <span>Total Cost</span>
        <span>
          <span>{props.cart.totalPrice.centAmount / 100} </span>
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
      <div className="basket__promocode_box">
        <div className="basket__promocode_info"></div>
        <input placeholder="enter promocode" className="basket__promocode_input" type="text" />
        <button onClick={handlerClickPromocode} className="basket__promocode_submit"></button>
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
