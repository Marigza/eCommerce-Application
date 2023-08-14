import "./Product.scss";

function Product(): JSX.Element {
  return (
    <div className="product">
      <h3>Item</h3>
      <div>Image</div>
      <div>description</div>
      <button>more info...</button>
    </div>
  );
}

export default Product;
