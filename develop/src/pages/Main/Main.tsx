import { Helmet } from "react-helmet";
import { MainContent } from "../../components/MainContent";

const Main: React.FC<{
  state: boolean;
  changeState: () => void;
}> = (props) => {
  return (
    <>
      <Helmet>
        <title>JustStore - Homepage</title>
      </Helmet>
      <MainContent state={props.state} changeState={props.changeState} />
    </>
  );
};

export default Main;
