import { Link } from "react-router-dom";
import { IProduct } from "../../client_Api/interfaces";

import "./Product.scss";

type ProductType = {
  product: IProduct;
};

const Product: React.FC<ProductType> = (props) => {
  return (
    <Link to="/product" className="product">
      <h3>{props.product.masterData.staged.name["en-US"]}</h3>
      <div>
        <img
          className="imageItem"
          src={props.product.masterData.staged.masterVariant.images[0].url}
          alt="foto"
          height="200"
        />
      </div>
      <div>
        {props.product.masterData.staged.masterVariant.prices[0].value.centAmount / 100}
        {props.product.masterData.staged.masterVariant.prices[0].value.currencyCode}
      </div>
      <button className="button__more_info">more info...</button>
    </Link>
  );
};

export default Product;
