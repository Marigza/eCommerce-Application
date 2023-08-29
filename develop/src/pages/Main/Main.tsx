/* eslint-disable import/no-named-as-default */
import Helmet from "react-helmet";

import { Header } from "../../components/Header";
import { MainContent } from "../../components/MainContent";

const Main: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>JustStore - Homepage</title>
      </Helmet>
      <Header />
      <MainContent />
    </>
  );
};

export default Main;
