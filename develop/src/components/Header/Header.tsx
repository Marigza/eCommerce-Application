import "./Header.scss";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import UserPopup from "../UserPopup/UserPopup";

import { addProductToAnonimousCart, getActiveCart } from "../../client_Api/carts";

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

  const addProduct = async () => {
    // const p1 = "da0435ec-0370-4e91-9197-00393cd2f02a";
    // const p2 = "abbfe9f2-232a-4766-9887-dfcaf9013dbf";
    // const p3 = "e897e8d1-5cfb-4962-940a-578a5f4ccd65";
    // const p4 = "c59bfa30-021c-4059-9a9d-ff626da70e3b";
    // const p5 = "0da7bd17-0a91-4490-b603-d17cd0559e9a";
    // const p6 = "daa1f14b-ed71-4928-b496-970226e49549";
    // const p7 = "de2c58f8-4665-4795-be1f-66f14058edba";
    // const p8 = "9373ddd3-afc3-4488-bdd8-71c22980b347";
    // const p9 = "9a23a487-9366-49d2-9b62-f885b5d95334";  5d81f286-1b03-4e91-93d0-e19e81943d19

    const responce = await getActiveCart();
    console.log(responce);
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
          <button onClick={addProduct}>Carts</button>
          <button>Log out</button>
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
