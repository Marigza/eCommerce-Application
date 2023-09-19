import "./Header.scss";
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import UserPopup from "../UserPopup/UserPopup";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import { getCart } from "../../client_Api/carts";

const Header: React.FC = () => {
  const [isUserPopupVisible, setIsUserPopupVisible] = useState(false);
  const [cartItemCount, setCartItemCount] = useState<number | null>(null);

  const toggleUserPopup = () => {
    setIsUserPopupVisible(!isUserPopupVisible);
    if (!isUserPopupVisible) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  };

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: 5,
      top: 10,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
      background: "black",
      color: "white",
    },
  }));

  const fetchCartItemCount = async () => {
    const cart = await getCart();
    if (cart) {
      setCartItemCount(cart.totalLineItemQuantity);
    }
  };

  useEffect(() => {
    fetchCartItemCount();
    const intervalId = setInterval(() => {
      fetchCartItemCount();
    }, 500);
    return () => clearInterval(intervalId);
  }, []);

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
          <Link to="basket">
            <StyledBadge badgeContent={cartItemCount ?? 0}>
              <div className="header__basket-button" />
            </StyledBadge>
          </Link>
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
