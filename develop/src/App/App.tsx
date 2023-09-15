import { Routes, Route } from "react-router-dom";

import { Login } from "../components/Login";
import { SignUp } from "../components/SignUp";
import { UserProfile } from "../components/UserProfile";
import { UserProvider } from "../context/UserContext";
import { Main } from "../pages/Main";
import { NotFound } from "../pages/NotFound";
import { Catalog } from "../pages/Catalog";
import Layout from "../components/Layout/Layout";
import { ProductPage } from "../pages/ProductPage";
import About from "../pages/About/About";

const App: React.FC = () => {
  return (
    <>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Main />} />
            <Route path="catalog" element={<Catalog />}>
              <Route path="phones">
                <Route path=":product" element={<ProductPage />} />
              </Route>
              <Route path="tablets">
                <Route path=":product" element={<ProductPage />} />
              </Route>
              <Route path="laptops">
                <Route path=":product" element={<ProductPage />} />
              </Route>
            </Route>
            <Route path="about" element={<About />} />
          </Route>
          <Route path="*" element={<NotFound />} />
          <Route path="login" element={<Login />} />
          <Route path="registration" element={<SignUp />} />
          <Route path="userProfile" element={<UserProfile />} />
        </Routes>
      </UserProvider>
    </>
  );
};

export default App;
