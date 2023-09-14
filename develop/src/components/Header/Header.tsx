import "./Header.scss";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import UserPopup from "../UserPopup/UserPopup";

const Header: React.FC = () => {
  const [isUserPopupVisible, setIsUserPopupVisible] = useState(false);

  const toggleUserPopup = () => {
    setIsUserPopupVisible(!isUserPopupVisible);
    if (!isUserPopupVisible) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  };

  return (
    <>
      <header className="header">
        <div className="header-links">
          <Link to="/" className="header-logo"></Link>
          <nav>
            <ul>
              <NavLink
                to="catalog"
                style={({ isActive }) => ({
                  borderBottom: isActive ? "0.2vh solid black" : "",
                })}
              >
                <li>Catalog</li>
              </NavLink>
              <NavLink
                to="about"
                style={({ isActive }) => ({
                  borderBottom: isActive ? "0.2vh solid black" : "",
                })}
              >
                <li>About us</li>
              </NavLink>
            </ul>
          </nav>
        </div>
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
    </>
  );
};

export default Header;
