import React from "react";
import { Formik, Form, Field } from "formik";
import ValidationSchema from "../../validation/Validation";

import "./UserProfilePopup.scss";

export const UserProfilePopupEmail: React.FC<{
  email: string;
  isEmailActive: boolean;
  onClose: () => void;
}> = (props) => {
  const submitHandlerMail = () => {
    props.onClose();
  };

  return (
    <div className={`user-profile-popup ${props.isEmailActive ? "email-active" : ""}`}>
      <div className="user-profile-popup__wrapper">
        <div className="user-profile-popup__header">
          <h2 className="user-profile-popup__header_title">Change an Email...</h2>
          <div className="user-profile-popup__header_logo"></div>
        </div>
        <div className="user-profile-popup__content">
          <Formik
            initialValues={{
              email: props.email,
            }}
            validationSchema={ValidationSchema(0)}
            onSubmit={submitHandlerMail}
            enableReinitialize
          >
            {({ errors, touched }) => (
              <Form className="login-wrapper__card-form">
                <Field type="text" name="email" />
                <div>
                  {errors.email && touched.email ? (
                    <div className="error">{errors.email}</div>
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
