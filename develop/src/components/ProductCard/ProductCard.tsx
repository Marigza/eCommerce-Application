import React, { useState, useEffect } from "react";
import { IProductDetails, ICart } from "../../client_Api/interfaces";
import Slider from "../Slider/Slider";
import { Helmet } from "react-helmet";
import { getActiveCart, addProductToCart, changeQuantityInCart } from "../../client_Api/carts";

import "./ProductCard.scss";

const ProductCard: React.FC<{
  product: IProductDetails;
  state: boolean;
  changeState: () => void;
}> = (props) => {
  const [Cart, setCart] = useState<ICart>();

  const propsData = props?.product?.masterData?.staged;

  useEffect(() => {
    async function fetchData() {
      const response = await getActiveCart();
      if (!response) return null;
      setCart(response);
    }

    fetchData();
  }, [props.state]);

  const IsInCart = (item: string) => {
    const itemsID = Cart?.lineItems.map((elem) => elem.productId);
    const isInclude = itemsID?.includes(item);
    return isInclude;
  };

  const handlerClick = async (flag: boolean) => {
    if (flag) {
      await addProductToCart(props.product.id).then(() => props.changeState());
    } else {
      await changeQuantityInCart(props.product.id, 0).then(() => props.changeState());
    }
  };

  return (
    <>
      <Helmet>
        <title>JustStore - {propsData?.name["en-US"]}</title>
      </Helmet>
      <div className="cardcontent__block">
        <div className="productContent__content">
          <div className="images">
            <div className="main_image">
              <div
                className="product-image"
                style={{
                  backgroundImage: `url(${propsData?.masterVariant?.images[0]?.url})`,
                }}
              ></div>
            </div>
            <Slider images={propsData?.masterVariant?.images} />
          </div>
          <div className="description">
            <h2 className="product_name">{propsData?.name["en-US"]}</h2>
            <div className="product_description">
              <p>Description:</p>
              <p>{propsData?.description["en-US"]}</p>
              <div className="product-description__attributes product_description__description__attributes">
                <p>Specifications:</p>
                {propsData?.masterVariant?.attributes?.map((attribute, index) => (
                  <p key={index}>
                    {attribute.name}: {attribute.value}
                  </p>
                ))}
              </div>
            </div>
            <div className="product-price-cart__wrapper">
              <div className="product-price price">
                {propsData?.masterVariant?.prices[0]?.discounted && (
                  <div className="product-price__old">
                    <p className="old-price">
                      {propsData.masterVariant.prices[0].discounted?.value.centAmount
                        ? propsData.masterVariant.prices[0].value.centAmount / 100
                        : ""}
                      .00$
                    </p>
                    <p className="discount-percent">
                      -
                      {propsData.masterVariant.prices[0].discounted?.value.centAmount
                        ? ((propsData.masterVariant.prices[0].value.centAmount -
                            propsData.masterVariant.prices[0].discounted.value.centAmount) /
                            propsData.masterVariant.prices[0].value.centAmount) *
                          100
                        : ""}
                      %
                    </p>
                  </div>
                )}
                <p
                  className={
                    propsData?.masterVariant?.prices[0].discounted
                      ? "discont-price"
                      : "normal-price"
                  }
                >
                  {propsData?.masterVariant?.prices[0]?.discounted?.value?.centAmount
                    ? propsData.masterVariant.prices[0].discounted.value.centAmount / 100 + `0`
                    : propsData.masterVariant.prices[0].value.centAmount / 100 + `.00`}
                  $
                </p>
              </div>
              {!IsInCart(props.product.id) ? (
                <div className="product-cart" onClick={() => handlerClick(true)}>
                  Add to cart
                </div>
              ) : (
                <div>
                  <div className="product-in-cart">already in cart</div>
                  <div className="remove-from-cart" onClick={() => handlerClick(false)}>
                    remove
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
