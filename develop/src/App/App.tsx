import React, { useState } from "react";
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
import { Basket } from "../pages/Basket";

const App: React.FC = () => {
  const [state, setState] = useState(false);
  const changestate = () => setState((prev) => !prev);
  return (
    <>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Layout state={state} changeState={changestate} />}>
            <Route index element={<Main state={state} changeState={changestate} />} />
            <Route path="catalog" element={<Catalog state={state} changeState={changestate} />}>
              <Route path="phones">
                <Route
                  path=":product"
                  element={<ProductPage state={state} changeState={changestate} />}
                />
              </Route>
              <Route path="tablets">
                <Route
                  path=":product"
                  element={<ProductPage state={state} changeState={changestate} />}
                />
              </Route>
              <Route path="laptops">
                <Route
                  path=":product"
                  element={<ProductPage state={state} changeState={changestate} />}
                />
              </Route>
            </Route>
            <Route path="about" element={<About />} />
            <Route path="basket" element={<Basket state={state} changeState={changestate} />} />
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
