import { Routes, Route } from "react-router-dom";

import { Login } from "../components/Login";
import { SignUp } from "../components/SignUp";
import { UserProfil } from "../components/userProfil";
import { UserProvider } from "../context/UserContext";
import { Main } from "../pages/Main";
import { NotFound } from "../pages/NotFound";

const App: React.FC = () => {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="registration" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="userProfil" element={<UserProfil />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </UserProvider>
  );
};

export default App;
