import { changeQuantityInCart, cleanCart } from "../../../client_Api/carts";
import { ICart } from "../../../client_Api/interfaces";

type CartType = {
  cart: ICart;
};

const FillBasket: React.FC<CartType> = (props) => {
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
            <span>{item.quantity}</span>
            <span>
              <span>{item.totalPrice.centAmount / 100} </span>
              <span>{item.totalPrice.currencyCode}</span>
            </span>
            <button className="delete-item" onClick={() => changeQuantityInCart(item.productId, 0)}>
              Delete
            </button>
          </div>
        ))}
      </div>
      <div className="delete__block">
        <button
          className="delete-all"
          onClick={() => {
            const isSure = confirm("Are you really want to clean your cart?");
            if (isSure) {
              cleanCart();
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
