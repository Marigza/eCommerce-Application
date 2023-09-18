import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import { getActiveCart, addProductToCart } from "../../client_Api/carts";
import { ProductType, ICart } from "../../client_Api/interfaces";
import { Rating } from "@mui/material";

import "./CatalogProduct.scss";

const writeIdProduct = (ID: string): string => {
  localStorage.setItem("ID", ID);
  return ID;
};

const CatalogProduct: React.FC<ProductType> = (props) => {
  const [Cart, setCart] = useState<ICart>();

  const IsInCart = useCallback(
    (item: string) => {
      const itemsID = Cart?.lineItems.map((elem) => elem.productId);
      const isInclude = itemsID?.includes(item);
      return isInclude;
    },
    [Cart?.lineItems]
  );

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

  useEffect(() => {
    async function fetchData() {
      const response = await getActiveCart();
      if (!response) return null;
      setCart(response);
    }

    fetchData();
  }, [IsInCart]);

  return (
    <div className="product__wpapper">
      <Link to={toPath} className="product" onClick={() => writeIdProduct(props.product.id)}>
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
                    .00$
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
                  props.product.masterVariant.prices[0].discounted
                    ? "discont-price"
                    : "normal-price"
                }
              >
                {props.product.masterVariant.prices[0].discounted?.value.centAmount
                  ? props.product.masterVariant.prices[0].discounted.value.centAmount / 100 + `0`
                  : props.product.masterVariant.prices[0].value.centAmount / 100 + `.00`}
                $
              </p>
            </div>
          </div>
          <p className="shipping">
            free shipping <LocalShippingIcon style={{ fontSize: "2.5vh" }} />
          </p>
        </div>
      </Link>
      <div>
        {!IsInCart(props.product.id) ? (
          <div
            className="buy-now"
            onClick={() => {
              addProductToCart(props.product.id);
            }}
          >
            <AddShoppingCartOutlinedIcon style={{ fontSize: "4vh" }} />
          </div>
        ) : (
          <div className="alredy-in-cart">already in cart</div>
        )}
      </div>
    </div>
  );
};

export default CatalogProduct;
