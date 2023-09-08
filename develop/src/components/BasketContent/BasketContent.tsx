import { Link } from "react-router-dom";

import "./BasketContent.scss";

const BasketContent: React.FC = () => {
  return (
    <main className="BasketContent">
      <h2 className="basket_header">Basket</h2>
      {/* <div className="items_block"></div> */}
      {/* when a cart isn't empty delete next block*/}
      <div className="empty_block">
        <div className="empty_block-message">
          <div className="empty_block-text">Oops! Your cart is empty! You can</div>
          <Link to="/catalog" className="cart__link">
            <div>start shopping</div>
          </Link>
          <div className="empty_block-text">just now. Welcome!</div>
        </div>
      </div>
    </main>
  );
};

export default BasketContent;
