import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import ValidationSchema from "../../validation/Validation";
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

  const emailPopupClose = (arg: boolean): void => {
    if (!arg) {
      setValue({ ...value, emailPopupActive: false });
    }
  };

  return (
    <div className={`user-profile-popup ${props.isEmailActive ? "email-active" : ""}`}>
      <div className="user-profile-popup__wrapper">
        <div className="user-profile-popup__header">
          <h2 className="user-profile-popup__header_title">Change an Email</h2>
          <div className="user-profile-popup__header_logo"></div>
        </div>
        <div className="user-profile-popup__content">
          <Formik
            initialValues={{
              email: `${props.email}`,
            }}
            validationSchema={ValidationSchema(0)}
            onSubmit={() => emailPopupClose(false)}
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
                      emailPopupClose(false);
                    }}
                  >
                    Back
                  </button>
                  <button>Submit</button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
