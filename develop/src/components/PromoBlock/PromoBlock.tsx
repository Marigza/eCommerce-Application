import "./PromoBlock.scss";

const PromoBlock: React.FC = () => {
  return (
    <div className="promo__block">
      <div className="promo__item">
        <div className="promo__header">
          <span>Just</span> for new customers!
        </div>
        <div className="promo__condition">
          Register now and take discont 5% for all in cart by promocode
        </div>
        <div className="promo__text">newcustomer</div>
      </div>
      <div className="promo__item">
        <div className="promo__header">
          <span>Just</span> this autumn!
        </div>
        <div className="promo__condition">
          You can apply a 10% discount* to your cart by using secret word
        </div>
        <div className="promo__text">hotautumn</div>
        <div className="promo__undertext">* only for registered customers</div>
      </div>
    </div>
  );
};

export default PromoBlock;
