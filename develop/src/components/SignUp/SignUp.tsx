import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import "./SignUp.scss";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";

import ValidationSchema from "../../validation/Validation";

const SignUp: React.FC = () => {
  const [clickedButton, setClickedButton] = useState("");
  const [registrationStep, setRegistrationStep] = useState(1);
  const [passwordVisible, setPasswordVisible] = useState({
    passw: false,
  });

  const handleTogglePasswordVisibility = (field: keyof typeof passwordVisible) => {
    setPasswordVisible((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };
  const handleNextStep = () => {
    setRegistrationStep(registrationStep + 1);
  };
  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
          firstName: "",
          lastName: "",
          dateOfBirth: "",
          country: "",
          city: "",
          street: "",
          postalcode: "",
          countryB: "",
          cityB: "",
          streetB: "",
          postalcodeB: "",
        }}
        validationSchema={ValidationSchema(registrationStep)}
        onSubmit={(values, { setSubmitting }) => {
          if (clickedButton === "nextStep") {
            handleNextStep();
          } else if (clickedButton === "submit") {
            if (registrationStep === 2) {
              const updatedValues = {
                email: values.email,
                password: values.password,
                firstName: values.firstName,
                lastName: values.lastName,
                dateOfBirth: values.dateOfBirth,
                addresses: [
                  {
                    country: values.country,
                    city: values.city,
                    street: values.street,
                    postalcode: values.postalcode,
                  },
                  {
                    country: values.country,
                    city: values.city,
                    street: values.street,
                    postalcode: values.postalcode,
                  },
                ],
              };
              console.log(updatedValues);
            } else {
              const updatedValues = {
                email: values.email,
                password: values.password,
                firstName: values.firstName,
                lastName: values.lastName,
                dateOfBirth: values.dateOfBirth,
                addresses: [
                  {
                    country: values.country,
                    city: values.city,
                    street: values.street,
                    postalcode: values.postalcode,
                  },
                  {
                    country: values.countryB,
                    city: values.cityB,
                    street: values.streetB,
                    postalcode: values.postalcodeB,
                  },
                ],
              };
              console.log(updatedValues);
            }
          }
          setSubmitting(false);
        }}
      >
        {({ errors, touched }) => (
          <>
            <Helmet>
              <title>JustStore - Sing up</title>
            </Helmet>
            <div className="singup">
              <Link to="/" className="background" />
              <div className="singup-wrapper">
                <div className="singup-wrapper__card">
                  <Link to="/">
                    <div className="singup-wrapper__card-logo"></div>
                  </Link>
                  {registrationStep === 1 && (
                    <>
                      <h2 className="singup-wrapper__card-title">Registration</h2>
                      <Form className="singup-wrapper__card-form">
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

                        <Field type="text" name="email" />
                        <div>
                          <label>Email</label>
                          {errors.email && touched.email ? (
                            <div className="error">{errors.email}</div>
                          ) : null}
                        </div>

                        <Field type={passwordVisible.passw ? "text" : "password"} name="password" />
                        <div>
                          <label>Password</label>
                          <span
                            className={passwordVisible.passw ? "visible" : ""}
                            onClick={() => handleTogglePasswordVisibility("passw")}
                          />
                          {errors.password && touched.password ? (
                            <div className="error">{errors.password}</div>
                          ) : null}
                        </div>

                        <Field type="date" name="dateOfBirth" id="date" />
                        <div>
                          <label>Date of birth</label>
                          {errors.dateOfBirth && touched.dateOfBirth ? (
                            <div className="error">{errors.dateOfBirth}</div>
                          ) : null}
                        </div>
                        <button
                          type="submit"
                          onClick={() => {
                            setClickedButton("nextStep");
                            console.log("Errors:", errors);
                          }}
                        >
                          fill in shipping address
                          <span className="arrow" />
                        </button>
                      </Form>
                    </>
                  )}
                  {registrationStep === 2 && (
                    <>
                      <h2 className="singup-wrapper__card-title">Shipping address</h2>
                      <Form className="singup-wrapper__card-form">
                        <div>
                          <Field name="country" as="select" defaultValue="">
                            <option value="" disabled>
                              Wonderland
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

                        <button
                          type="submit"
                          onClick={() => {
                            setClickedButton("nextStep");
                            console.log("Errors:", errors);
                          }}
                        >
                          fill in billing adress
                          <span className="arrow" />
                        </button>
                        <p> Or set address as default and</p>
                        <button
                          type="submit"
                          onClick={() => {
                            setClickedButton("submit");
                            console.log("Errors:", errors);
                          }}
                        >
                          Sign up
                        </button>
                      </Form>
                    </>
                  )}
                  {registrationStep === 3 && (
                    <>
                      <h2 className="singup-wrapper__card-title">Billing address</h2>
                      <Form className="singup-wrapper__card-form">
                        <div>
                          <Field name="countryB" as="select" defaultValue="">
                            <option value="" disabled>
                              Wonderland
                            </option>
                            <option value="US">United States</option>
                            <option value="GB">United Kingdom</option>
                            <option value="FR">France</option>
                            <option value="DE">Germany</option>
                            <option value="PL">Poland</option>
                          </Field>
                          <div className="left">
                            <label>Country</label>
                            {errors.countryB && touched.countryB ? (
                              <div className="error">{errors.countryB}</div>
                            ) : null}
                          </div>

                          <Field type="text" name="cityB" />
                          <div className="right">
                            <label>City</label>
                            {errors.cityB && touched.cityB ? (
                              <div className="error">{errors.cityB}</div>
                            ) : null}
                          </div>
                        </div>

                        <Field type="text" name="streetB" />
                        <div>
                          <label>Street</label>
                          {errors.streetB && touched.streetB ? (
                            <div className="error">{errors.streetB}</div>
                          ) : null}
                        </div>

                        <Field type="text" name="postalcodeB" />
                        <div>
                          <label>Postal code</label>
                          {errors.postalcodeB && touched.postalcodeB ? (
                            <div className="error">{errors.postalcodeB}</div>
                          ) : null}
                        </div>

                        <button
                          type="submit"
                          onClick={() => {
                            setClickedButton("submit");
                          }}
                        >
                          Sign up
                        </button>
                      </Form>
                    </>
                  )}
                  <p>
                    Do you already have an account?
                    <Link to="/login">
                      <span> Log in</span>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </Formik>
    </>
  );
};

export default SignUp;
