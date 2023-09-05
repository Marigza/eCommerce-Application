import { Routes, Route } from "react-router-dom";

import { Login } from "../components/Login";
import { SignUp } from "../components/SignUp";
import { UserProvider } from "../context/UserContext";
import { Main } from "../pages/Main";
import { NotFound } from "../pages/NotFound";
import { Catalog } from "../pages/Catalog";
import Layout from "../components/Layout/Layout";

const App: React.FC = () => {
  return (
    <>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Main />} />
            <Route path="catalog" element={<Catalog />}>
              <Route path="phones"></Route>
              <Route path="tablets"></Route>
              <Route path="laptops"></Route>
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
          <Route path="login" element={<Login />} />
          <Route path="registration" element={<SignUp />} />
        </Routes>
      </UserProvider>
    </>
  );
};

export default App;
