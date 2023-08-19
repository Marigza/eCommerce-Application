import { Link } from "react-router-dom";
import "./Product.scss";

const Product: React.FC = () => {
  return (
    <Link to="/product" className="product">
      <h3>Item</h3>
      <div>Image</div>
      <div>description</div>
      <button>more info...</button>
    </Link>
  );
};

export default Product;
