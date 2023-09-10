import React from "react";
import "./UserPopup.scss";
import { Link } from "react-router-dom";

import { useUserContext } from "../../context/UserContext";
import { logoutCustomer } from "../../client_Api/authentication";

interface IUserPopupProps {
  onClose: () => void;
}

const UserPopup: React.FC<IUserPopupProps> = ({ onClose }) => {
  const { userData, setUserData } = useUserContext();

  const handleLogout = async (): Promise<void> => {
    setUserData({
      email: "",
      password: "",
      incorrect: false,
      logged: false,
    });
    await logoutCustomer();
    onClose();
  };

  return (
    <>
      <div className="background" onClick={onClose} />
      <div className="user-popup">
        {userData.logged ? (
          <>
            <Link to="userProfile" className="user-popup__link" onClick={onClose}>
              Profile
            </Link>
            <Link to="" onClick={handleLogout} className="user-popup__link">
              Log Out
            </Link>
          </>
        ) : (
          <>
            <Link to="registration" className="user-popup__link" onClick={onClose}>
              <b>Sign up</b>
            </Link>
            <Link to="login" className="user-popup__link" onClick={onClose}>
              Log in
            </Link>
          </>
        )}
        <Link to="support" className="user-popup__link" onClick={onClose}>
          Сontact with support
        </Link>
        <Link to="agreements" className="user-popup__link" onClick={onClose}>
          User agreements
        </Link>
      </div>
    </>
  );
};

export default UserPopup;
