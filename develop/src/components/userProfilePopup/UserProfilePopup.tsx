import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./UserProfilePopup.scss";

export const getData = () => {};

export const UserProfilePopup: React.FC = () => {
  return (
    <div className="user-profile-popup">
      <div className="user-profile-popup__wrapper">
        <div className="user-profile-popup__card">
          <div className="user-profile-popup__header">
            <h2 className="user-profile-popup__header_title">Enter new Email</h2>
            <div className="user-profile-popup__header_logo"></div>
          </div>
          <div className="user-profile-popup__content"></div>
          <div className="user-profile-popup__button-box">
            <Link to="/userProfile">
              <div className="user-profile-popup__button-box_button">Back</div>
            </Link>
            <Link to="/userProfile">
              <div className="user-profile-popup__button-box_button">Submit</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
