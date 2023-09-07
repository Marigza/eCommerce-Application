import React from "react";
import { IProductGet } from "../../client_Api/interfaces";
import Slider from "../Slider/Slider";

import "./ProductCard.scss";
import { Helmet } from "react-helmet";

type ProductType = {
  product: IProductGet;
};

const ProductCard: React.FC<ProductType> = (props) => {
  return (
    <>
      <Helmet>
        <title>JustStore - {props.product.masterData.staged.name["en-US"]}</title>
      </Helmet>
      <div className="cardcontent__block">
        <div className="productContent__content">
          <div className="images">
            <div className="main_image">
              <div
                className="product-image"
                style={{
                  backgroundImage: `url(${props.product.masterData.staged.masterVariant.images[0].url})`,
                }}
              ></div>
            </div>
            <Slider images={props.product.masterData.staged.masterVariant.images} />
          </div>
          <div className="description">
            <h2 className="product_name">{props.product.masterData.staged.name["en-US"]}</h2>
            <div className="product_description">
              <p>Description:</p>
              <p>{props.product.masterData.staged.description["en-US"]}</p>
              <div className="product-description__attributes product_description__description__attributes">
                <p>Specifications:</p>
                {props.product.masterData.staged.masterVariant.attributes.map(
                  (attribute, index) => (
                    <p key={index}>
                      {attribute.name}: {attribute.value}
                    </p>
                  )
                )}
              </div>
            </div>
            <div className="product-price price">
              {props.product.masterData.staged.masterVariant.prices[0].discounted && (
                <div className="product-price__old">
                  <p className="old-price">
                    {props.product.masterData.staged.masterVariant.prices[0].discounted?.value
                      .centAmount
                      ? props.product.masterData.staged.masterVariant.prices[0].value.centAmount /
                        100
                      : ""}
                    $
                  </p>
                  <p className="discount-percent">
                    -
                    {props.product.masterData.staged.masterVariant.prices[0].discounted?.value
                      .centAmount
                      ? ((props.product.masterData.staged.masterVariant.prices[0].value.centAmount -
                          props.product.masterData.staged.masterVariant.prices[0].discounted.value
                            .centAmount) /
                          props.product.masterData.staged.masterVariant.prices[0].value
                            .centAmount) *
                        100
                      : ""}
                    %
                  </p>
                </div>
              )}
              <p
                className={
                  props.product.masterData.staged.masterVariant.prices[0].discounted
                    ? "discont-price"
                    : "normal-price"
                }
              >
                {props.product.masterData.staged.masterVariant.prices[0].discounted?.value
                  .centAmount
                  ? Math.floor(
                      props.product.masterData.staged.masterVariant.prices[0].discounted.value
                        .centAmount / 100
                    )
                  : props.product.masterData.staged.masterVariant.prices[0].value.centAmount / 100}
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
