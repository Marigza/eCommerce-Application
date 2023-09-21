import { Helmet } from "react-helmet";
import { BasketContent } from "../../components/BasketContent";

const Basket: React.FC<{
  state: boolean;
  changeState: () => void;
}> = (props) => {
  return (
    <>
      <Helmet>
        <title>JustStore - Basket</title>
      </Helmet>
      <BasketContent state={props.state} changeState={props.changeState} />
    </>
  );
};

export default Basket;
