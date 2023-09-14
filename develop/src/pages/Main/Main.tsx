import { Helmet } from "react-helmet";
import { MainContent } from "../../components/MainContent";

const Main: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>JustStore - Homepage</title>
      </Helmet>
      <MainContent />
    </>
  );
};

export default Main;
