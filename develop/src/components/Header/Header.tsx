import "./Header.scss";
import React, { useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";

import { Login } from "../../components/Login";
import { SignUp } from "../../components/SignUp";
import UserPopup from "../UserPopup/UserPopup";

const Header: React.FC = () => {
  const [disableScroll, setDisableScroll] = useState(false);
  const [isUserPopupVisible, setIsUserPopupVisible] = useState(false);
  const location = useLocation();

  React.useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/registration") {
      setDisableScroll(true);
    } else {
      setDisableScroll(false);
    }

    if (disableScroll) {
      document.body.style.padding = "0 calc(17px - (100vw - 100%)) 0 0";
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.padding = "0";
      document.body.style.overflowY = "auto";
    }
  }, [location, disableScroll]);

  const toggleUserPopup = () => {
    setIsUserPopupVisible(!isUserPopupVisible);
  };

  return (
    <>
      <header className="header">
        <Link to="/" className="header-logo"></Link>
        <div>
          <div className="header__search-button" />
          <div className="header__basket-button" />
          <button
            className={`customers__button ${isUserPopupVisible ? "active" : ""}`}
            onClick={toggleUserPopup}
          >
            <div>
              <span />
              <span />
              <span />
            </div>
            <div />
          </button>
        </div>
        {isUserPopupVisible && <UserPopup onClose={toggleUserPopup} />}
      </header>
      <Routes>
        <Route path="registration" element={<SignUp />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </>
  );
};

export default Header;
