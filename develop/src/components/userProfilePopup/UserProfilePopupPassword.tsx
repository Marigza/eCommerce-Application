import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import ValidationSchema from "../../validation/Validation";

import "./UserProfilePopup.scss";

export const UserProfilePopupPassword: React.FC<{
  email: string;
  isPasswordActive: boolean;
  onClose: () => void;
}> = (props) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const submitHandler = () => {
    props.onClose();
  };

  return (
    <div className={`user-profile-popup ${props.isPasswordActive ? "password-active" : ""}`}>
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
            onSubmit={submitHandler}
          >
            {({ errors, touched }) => (
              <Form className="login-wrapper__card-form">
                <Field type={passwordVisible ? "text" : "password"} name="password" />
                <div>
                  <label>Old password</label>
                  <span
                    className={passwordVisible ? "visible" : ""}
                    onClick={handleTogglePasswordVisibility}
                  />
                  {errors.password && touched.password ? (
                    <div className="error">{errors.password}</div>
                  ) : null}
                </div>

                <Field type={passwordVisible ? "text" : "password"} name="password" />
                <div>
                  <label>New password</label>
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
                      props.onClose();
                    }}
                  >
                    Back
                  </button>
                  <button
                    onClick={() => {
                      props.onClose();
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
