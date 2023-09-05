import { Helmet } from "react-helmet";
import HomeSlider from "../../components/HomeSlider/HomeSlider";

const Main: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>JustStore - Homepage</title>
      </Helmet>
      <main className="main">
        <HomeSlider />
      </main>
    </>
  );
};

export default Main;
