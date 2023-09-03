import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import ValidationSchema from "../../validation/Validation";

import "./UserProfilePopup.scss";

export const UserProfilePopupPassword: React.FC<{
  email: string;
  isPasswordActive: boolean;
}> = (props: { email: string; isPasswordActive: boolean }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  let passwordStyle = props.isPasswordActive;

  const handleTogglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const passwordPopupClose = (arg: boolean): void => {
    if (!arg) {
      passwordStyle = false;
    }
  };

  return (
    <div className={`user-profile-popup ${passwordStyle ? "password-active" : ""}`}>
      <div className="user-profile-popup__wrapper">
        <div className="user-profile-popup__header">
          <h2 className="user-profile-popup__header_title">Enter new password...</h2>
          <div className="user-profile-popup__header_logo"></div>
        </div>
        <div className="user-profile-popup__content">
          <Formik
            initialValues={{
              password: "",
            }}
            validationSchema={ValidationSchema(0)}
            onSubmit={() => passwordPopupClose(false)}
          >
            {({ errors, touched }) => (
              <Form className="login-wrapper__card-form">
                <Field type={passwordVisible ? "text" : "password"} name="password" />
                <div>
                  <label>Password</label>
                  <span
                    className={passwordVisible ? "visible" : ""}
                    onClick={handleTogglePasswordVisibility}
                  />
                  {errors.password && touched.password ? (
                    <div className="error">{errors.password}</div>
                  ) : null}
                </div>
                <div className="user-profile-popup__button-box">
                  <button
                    onClick={() => {
                      passwordPopupClose(true);
                    }}
                  >
                    Back
                  </button>
                  <button
                    onClick={() => {
                      passwordPopupClose(false);
                    }}
                  >
                    Submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
