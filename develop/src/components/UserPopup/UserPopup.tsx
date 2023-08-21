import React from "react";
import "./UserPopup.scss";
import { Link } from "react-router-dom";

interface UserPopupProps {
  onClose: () => void;
}

const UserPopup: React.FC<UserPopupProps> = ({ onClose }) => {
  return (
    <>
      <div className="user-popup">
        <Link to="/registration" className="user-popup__link" onClick={onClose}>
          <b>Sign up</b>
        </Link>
        <Link to="/login" className="user-popup__link" onClick={onClose}>
          Log in
        </Link>
        <Link to="" className="user-popup__link" onClick={onClose}>
          Сontact with support
        </Link>
        <Link to="" className="user-popup__link" onClick={onClose}>
          User agreements
        </Link>
      </div>
    </>
  );
};

export default UserPopup;
