import React from "react";
import { IProduct } from "../../client_Api/interfaces";

import "./ProductCard.scss";

type ProductType = {
  product: IProduct;
};

const ProductCard: React.FC<ProductType> = (props) => {
  return (
    <main className="cardcontent__block">
      <div className="productContent__content">
        <div className="slider_block">
          <div className="slider_controls">
            <div className="control_prev">prev</div>
            <div className="control_prev">next</div>
          </div>
          <div className="product_images">
            {props.product.masterData.staged.masterVariant.images.length > 1 ? (
              props.product.masterData.staged.masterVariant.images.map((item, index) => (
                <img className="image_item item_small" src={item.url} alt="foto" key={index} />
              ))
            ) : (
              <img
                className="image_item item_big"
                src={props.product.masterData.staged.masterVariant.images[0].url}
                alt="foto"
              />
            )}
          </div>
        </div>
        <div>
          <h2 className="product_name">{props.product.masterData.staged.name["en-US"]}</h2>
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
  );
};

export default ProductCard;
