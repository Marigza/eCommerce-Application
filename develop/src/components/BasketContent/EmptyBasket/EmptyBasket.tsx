import { Link } from "react-router-dom";

const EmptyBasket: React.FC = () => {
  return (
    <div className="empty_block">
      <div className="empty_block-message">
        <div className="empty_block-text">Oops! Your cart is empty! You can</div>
        <Link to="/catalog" className="cart__link">
          <div>start shopping</div>
        </Link>
        <div className="empty_block-text">just now. Welcome!</div>
      </div>
    </div>
  );
};

export default EmptyBasket;
