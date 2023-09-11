import React from "react";
import { IProductGet } from "../../client_Api/interfaces";
import Slider from "../Slider/Slider";
import { Helmet } from "react-helmet";

import "./ProductCard.scss";

type ProductType = {
  product: IProductGet;
};

const ProductCard: React.FC<ProductType> = (props) => {
  const propsData = props?.product?.masterData?.staged;

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
            <div className="product-price price">
              {propsData?.masterVariant?.prices[0]?.discounted && (
                <div className="product-price__old">
                  <p className="old-price">
                    {propsData.masterVariant.prices[0].discounted?.value.centAmount
                      ? propsData.masterVariant.prices[0].value.centAmount / 100
                      : ""}
                    $
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
                  propsData?.masterVariant?.prices[0].discounted ? "discont-price" : "normal-price"
                }
              >
                {propsData?.masterVariant?.prices[0]?.discounted?.value?.centAmount
                  ? Math.floor(propsData.masterVariant.prices[0].discounted.value.centAmount / 100)
                  : propsData.masterVariant.prices[0].value.centAmount / 100}
                ,00$
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
