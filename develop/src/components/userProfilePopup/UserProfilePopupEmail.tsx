import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import ValidationSchema from "../../validation/Validation";
import { IEmailState } from "../UserProfile/interfaces";

import "./UserProfilePopup.scss";

export const getData = () => {};

export const UserProfilePopupEmail: React.FC<{ email: string; isEmailActive: boolean }> = (props: {
  email: string;
  isEmailActive: boolean;
}) => {
  const [value, setValue] = useState<IEmailState>({
    emailPopupActive: props.isEmailActive,
    email: props.email,
  });

  const handleChange = (event: { target: { value: string } }) => {
    setValue({ ...value, email: event.target.value });
  };

  const emailPopupClose = (arg: boolean): void => {
    if (!arg) {
      setValue({ ...value, emailPopupActive: false });
    }
  };

  return (
    <div className={`user-profile-popup ${value.emailPopupActive ? "email-active" : ""}`}>
      <div className="user-profile-popup__wrapper">
        <div className="user-profile-popup__header">
          <h2 className="user-profile-popup__header_title">Change an Email</h2>
          <div className="user-profile-popup__header_logo"></div>
        </div>
        <div className="user-profile-popup__content">
          <input type="text" value={value.email} onChange={handleChange} />
        </div>
        <div className="user-profile-popup__button-box">
          <button
            onClick={() => {
              emailPopupClose(false);
            }}
          >
            Back
          </button>
          <button>Submit</button>
        </div>
      </div>
    </div>
  );
};
