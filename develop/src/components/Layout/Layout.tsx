import { Outlet } from "react-router-dom";
import { Header } from "../Header";
import { Footer } from "../Footer";

const Layout: React.FC<{
  state: boolean;
  changeState: () => void;
}> = (props) => {
  return (
    <>
      <Header state={props.state} changeState={props.changeState} />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
