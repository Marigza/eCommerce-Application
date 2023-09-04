import React from "react";
import "./UserPopup.scss";
import { Link } from "react-router-dom";

import { useUserContext } from "../../context/UserContext";

interface IUserPopupProps {
  onClose: () => void;
}

const UserPopup: React.FC<IUserPopupProps> = ({ onClose }) => {
  const { userData, setUserData } = useUserContext();

  const handleLogout = (): void => {
    setUserData({
      email: "",
      password: "",
      incorrect: false,
      logged: false,
    });
    onClose();
  };

  return (
    <div className="user-popup">
      {userData.logged ? (
        <Link to="" onClick={handleLogout} className="user-popup__link">
          Log Out
        </Link>
      ) : (
        <>
          <Link to="/registration" className="user-popup__link" onClick={onClose}>
            <b>Sign up</b>
          </Link>
          <Link to="/login" className="user-popup__link" onClick={onClose}>
            Log in
          </Link>
        </>
      )}
      <Link to="" className="user-popup__link" onClick={onClose}>
        Contact with support
      </Link>
      <Link to="/userProfile" className="user-popup__link" onClick={onClose}>
        User profile
      </Link>
      <Link to="" className="user-popup__link" onClick={onClose}>
        User agreements
      </Link>
    </div>
  );
};

export default UserPopup;
