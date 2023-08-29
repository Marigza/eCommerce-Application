/* eslint-disable react/no-unescaped-entities */
/* eslint-disable import/no-named-as-default */
import Helmet from "react-helmet";
import { Link } from "react-router-dom";

import AnimationComponent from "./Animation";

import "./NotFound.scss";

const NotFound: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>JustStore - Page not found</title>
      </Helmet>
      <div className="not-found__page">
        <div className="not-found__page-animation">
          <AnimationComponent isPlaying={true} />
          <h2>Oops! Page Not Found</h2>
        </div>
        <p>
          Sorry, we couldn't find this page. But don't worry, you can find plenty of other things on
          our <Link to="/">homepage</Link>.
        </p>
      </div>
    </>
  );
};

export default NotFound;
