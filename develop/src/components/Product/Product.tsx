import './Product.scss';

const Product: React.FC = () => {
  return (
    <div className="product">
      <h3>Item</h3>
      <div>Image</div>
      <div>description</div>
      <button>more info...</button>
    </div>
  );
};

export default Product;
