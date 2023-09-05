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
      <main className="cardcontent__block">
        <h2 className="product_name">{props.product.masterData.staged.name["en-US"]}</h2>
        <div className="productContent__content">
          <div className="images">
            <div className="main_image">
              <img
                className="image_item item_big"
                src={props.product.masterData.staged.masterVariant.images[0].url}
                alt="foto"
              />
            </div>
            <Slider images={props.product.masterData.staged.masterVariant.images} />
          </div>
          <div className="description">
            <div className="product_description">
              <span>Description</span>
              <span>{props.product.masterData.staged.description["en-US"]}</span>
            </div>
            <div className="product_price">
              <span>Price</span>
              <span>
                {props.product.masterData.staged.masterVariant.prices[0].value.centAmount / 100}
                {props.product.masterData.staged.masterVariant.prices[0].value.currencyCode}
              </span>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProductCard;
