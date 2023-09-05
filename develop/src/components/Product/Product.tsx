import { Link } from "react-router-dom";
import { IProduct } from "../../client_Api/interfaces";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";

import "./Product.scss";
import { Rating } from "@mui/material";

type ProductType = {
  product: IProduct;
};

const writeIdProduct = (ID: string): string => {
  localStorage.setItem("ID", ID);
  return ID;
};

const Product: React.FC<ProductType> = (props) => {
  return (
    <Link to="/product" className="product" onClick={() => writeIdProduct(props.product.id)}>
      <div
        className="product-image"
        style={{ backgroundImage: `url(${props.product.masterVariant.images[0].url})` }}
      ></div>
      <div className="product-description">
        <h3>{props.product.name["en-US"]}</h3>
        <Rating name="size-small" defaultValue={5} readOnly style={{ fontSize: "2vh" }} />
        <div className="product-description__attributes">
          {props.product.masterVariant.attributes.map((attribute, index) => (
            <p key={index}>
              {attribute.name}: {attribute.value}
            </p>
          ))}
        </div>
        <div>
          <div className="product-price">
            {props.product.masterVariant.prices[0].discounted && (
              <div className="product-price__old">
                <p className="old-price">
                  {props.product.masterVariant.prices[0].discounted?.value.centAmount
                    ? props.product.masterVariant.prices[0].value.centAmount / 100
                    : ""}
                  $
                </p>
                <p className="discount-percent">
                  -
                  {props.product.masterVariant.prices[0].discounted?.value.centAmount
                    ? ((props.product.masterVariant.prices[0].value.centAmount -
                        props.product.masterVariant.prices[0].discounted.value.centAmount) /
                        props.product.masterVariant.prices[0].value.centAmount) *
                      100
                    : ""}
                  %
                </p>
              </div>
            )}
            <p
              className={
                props.product.masterVariant.prices[0].discounted ? "discont-price" : "normal-price"
              }
            >
              {props.product.masterVariant.prices[0].discounted?.value.centAmount
                ? Math.floor(
                    props.product.masterVariant.prices[0].discounted.value.centAmount / 100
                  )
                : props.product.masterVariant.prices[0].value.centAmount / 100}
              ,00$
            </p>
          </div>
        </div>
        <p className="shipping">
          free shipping <LocalShippingIcon style={{ fontSize: "2.5vh" }} />
        </p>
      </div>
      <div className="buy-now">
        <AddShoppingCartOutlinedIcon style={{ fontSize: "4vh" }} />
      </div>
    </Link>
  );
};

export default Product;
