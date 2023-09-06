import React from "react";
import { Formik, Form, Field } from "formik";
import ValidationSchema from "../../validation/Validation";

import "./UserProfilePopup.scss";

export const UserProfilePopupEmail: React.FC<{
  email: string;
  isEmailActive: boolean;
  onClose: () => void;
}> = (props) => {
  const submitHandlerMail = async () => {
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
                  <div
                    className="user-profile-popup__button-box_back"
                    onClick={() => {
                      props.onClose();
                    }}
                  >
                    Back
                  </div>

                  <button
                    onClick={() => {
                      props.onClose();
                    }}
                    type="submit"
                    name="address_submit"
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
