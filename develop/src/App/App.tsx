import { Routes, Route } from "react-router-dom";

import { Login } from "../components/Login";
import { SignUp } from "../components/SignUp";
import { UserProfile } from "../components/UserProfile";
import { UserProvider } from "../context/UserContext";
import UserProfilePopup from "../components/userProfilePopup";
import { Main } from "../pages/Main";
import { NotFound } from "../pages/NotFound";
import { ProductPage } from "../pages/ProductPage";

const App: React.FC = () => {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="registration" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="userProfile" element={<UserProfile />}></Route>
          <Route path="userProfile/userProfilePopup" element={<UserProfilePopup />} />
        </Route>
        <Route path="product" element={<ProductPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </UserProvider>
  );
};

export default App;
