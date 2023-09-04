import React from "react";
import { Formik, Form, Field } from "formik";
import ValidationSchema from "../../validation/Validation";

import "./UserProfilePopup.scss";

export const UserProfilePopupData: React.FC<{
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  isDataActive: boolean;
  onClose: () => void;
}> = (props) => {
  const submitHandlerData = () => {
    props.onClose();
  };

  return (
    <div className={`user-profile-popup ${props.isDataActive ? "data-active" : ""}`}>
      <div className="user-profile-popup__wrapper">
        <div className="user-profile-popup__header">
          <h2 className="user-profile-popup__header_title">Change a Data...</h2>
          <div className="user-profile-popup__header_logo"></div>
        </div>
        <div className="user-profile-popup__content">
          <Formik
            initialValues={{
              firstName: props.firstName,
              lastName: props.lastName,
              dateOfBirth: props.dateOfBirth,
            }}
            validationSchema={ValidationSchema(1)}
            onSubmit={submitHandlerData}
            enableReinitialize
          >
            {({ errors, touched }) => (
              <Form className="login-wrapper__card-form">
                <div>
                  <Field type="text" name="firstName" />
                  <div className="left">
                    <label>Firstname</label>
                    {errors.firstName && touched.firstName ? (
                      <div className="error">{errors.firstName}</div>
                    ) : null}
                  </div>

                  <Field type="text" name="lastName" />
                  <div className="right">
                    <label>Lastname</label>
                    {errors.lastName && touched.lastName ? (
                      <div className="error">{errors.lastName}</div>
                    ) : null}
                  </div>
                </div>

                <Field type="date" name="dateOfBirth" id="date" />
                <div>
                  <label>Date of birth</label>
                  {errors.dateOfBirth && touched.dateOfBirth ? (
                    <div className="error">{errors.dateOfBirth}</div>
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
