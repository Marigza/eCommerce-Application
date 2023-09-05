import { Link } from "react-router-dom";
import { ProductType } from "../../client_Api/interfaces";

import "./Product.scss";

const writeIdProduct = (ID: string): string => {
  localStorage.setItem("ID", ID);
  return ID;
};

const Product: React.FC<ProductType> = (props) => {
  const keyFirstChar = props.product.key.charAt(0);

  const getPath = (firstChar: string) => {
    switch (firstChar) {
      case "1":
        return `/catalog/phones/${props.product.key}`;
      case "2":
        return `/catalog/tablets/${props.product.key}`;
      case "3":
        return `/catalog/laptops/${props.product.key}`;
      default:
        return `/catalog/${props.product.key}`;
    }
  };

  const toPath = getPath(keyFirstChar);
  return (
    <Link to={toPath} className="product-home" onClick={() => writeIdProduct(props.product.id)}>
      <h3>{props.product.name["en-US"]}</h3>
      <div>
        <img
          className="imageItem"
          src={props.product.masterVariant.images[0].url}
          alt="foto"
          height="200"
        />
      </div>
      <div>
        {props.product.masterVariant.prices[0].value.centAmount / 100}
        {props.product.masterVariant.prices[0].value.currencyCode}
      </div>
      <button className="button__more_info">more info...</button>
    </Link>
  );
};

export default Product;
