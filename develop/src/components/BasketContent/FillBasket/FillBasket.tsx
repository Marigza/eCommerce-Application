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
              <span>{item.price.value.centAmount / 100} </span>
              <span>{item.price.value.currencyCode}</span>
            </span>
            <span>{item.quantity}</span>
            <span>
              <span>{item.totalPrice.centAmount / 100} </span>
              <span>{item.totalPrice.currencyCode}</span>
            </span>
            <button className="delete-item">Delete</button>
          </div>
        ))}
      </div>
      <div className="delete__block">
        <button className="delete-all">Delete All</button>
      </div>
    </div>
  );
};

export default FillBasket;
