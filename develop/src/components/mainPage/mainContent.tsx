import "./mainContent.scss";
import Product from "./product";

function MainContent(): JSX.Element {
  return (
    <main className="mainContent">
      <h1>Welcome to JustStore!</h1>
      <div className="content__block">
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
      </div>
    </main>
  );
}

export default MainContent;
