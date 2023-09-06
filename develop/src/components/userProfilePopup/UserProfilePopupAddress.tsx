import React from "react";
import { Formik, Form, Field } from "formik";
import ValidationSchema from "../../validation/Validation";
import { IBodyOfChangeUserAddres } from "../../client_Api/interfaces";
import { changeAddressOfUser } from "../../client_Api/userInfo";

import "./UserProfilePopup.scss";

export const UserProfilePopupAddress: React.FC<{
  id: string;
  type: string;
  country: string;
  streetName: string;
  postalCode: string;
  city: string;
  isAddressActive: boolean;
  flag: boolean;
  onClose: () => void;
}> = (props) => {
  const submitHandlerAddress = async (values: IBodyOfChangeUserAddres) => {
    changeAddressOfUser(values).then(() => props.onClose());
  };

  return (
    <div className={`user-profile-popup ${props.isAddressActive ? "address-active" : ""}`}>
      <div className="user-profile-popup__wrapper">
        <div className="user-profile-popup__header">
          <h2 className="user-profile-popup__header_title">Change an address...</h2>
          <div className="user-profile-popup__header_logo"></div>
        </div>
        <div className="user-profile-popup__content">
          <Formik
            initialValues={{
              country: props.country,
              city: props.city,
              street: props.streetName,
              postalcode: props.postalCode,
              type: props.type,
              id: props.id,
              flag: props.flag,
            }}
            validationSchema={ValidationSchema(2)}
            onSubmit={submitHandlerAddress}
            enableReinitialize
          >
            {({ errors, touched }) => (
              <Form className="singup-wrapper__card-form">
                <div>
                  <Field name="country" as="select" defaultValue="">
                    <option value="" disabled>
                      Choose the country
                    </option>
                    <option value="US">United States</option>
                    <option value="GB">United Kingdom</option>
                    <option value="FR">France</option>
                    <option value="DE">Germany</option>
                    <option value="PL">Poland</option>
                  </Field>
                  <div className="left">
                    <label>Country</label>
                    {errors.country && touched.country ? (
                      <div className="error">{errors.country}</div>
                    ) : null}
                  </div>

                  <Field type="text" name="city" />
                  <div className="right">
                    <label>City</label>
                    {errors.city && touched.city ? (
                      <div className="error">{errors.city}</div>
                    ) : null}
                  </div>
                </div>

                <Field type="text" name="street" />
                <div>
                  <label>Street</label>
                  {errors.street && touched.street ? (
                    <div className="error">{errors.street}</div>
                  ) : null}
                </div>

                <Field type="text" name="postalcode" />
                <div>
                  <label>Postal code</label>
                  {errors.postalcode && touched.postalcode ? (
                    <div className="error">{errors.postalcode}</div>
                  ) : null}
                </div>

                <Field name="type" as="select" defaultValue="">
                  <option value="" disabled>
                    Choose an address type
                  </option>
                  <option value="Shipping">Shipping</option>
                  <option value="Billing">Billing</option>
                </Field>

                <div className="user-profile-popup__button-box">
                  <div
                    className="user-profile-popup__button-box_back"
                    onClick={() => {
                      props.onClose();
                    }}
                  >
                    Back
                  </div>

                  <button type="submit" name="address_submit">
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
