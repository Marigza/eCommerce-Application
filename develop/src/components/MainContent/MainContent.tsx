import { Product } from "../Product";
import "./MainContent.scss";

const MainContent: React.FC = () => {
  return (
    <main className="mainContent">
      <div className="content__block">
        <Product />
        <Product />
        <Product />
      </div>
    </main>
  );
};

export default MainContent;
