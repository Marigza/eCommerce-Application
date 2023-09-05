import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { signUpCustomer } from "../../client_Api/authentication";
import { useUserContext } from "../../context/UserContext";
import ValidationSchema from "../../validation/Validation";
import "./SignUp.scss";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { userData, setUserData } = useUserContext();
  const [clickedButton, setClickedButton] = useState("");
  const [registrationStep, setRegistrationStep] = useState(1);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleNextStep = () => {
    setRegistrationStep(registrationStep + 1);
  };

  const handleFormSubmit = async (
    values: FormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    let updatedValues;

    if (clickedButton === "nextStep") {
      handleNextStep();
    } else if (clickedButton === "submit") {
      const commonValues = {
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
        dateOfBirth: values.dateOfBirth,
        addresses: [
          {
            country: values.country,
            streetName: values.street,
            postalCode: values.postalcode,
            city: values.city,
          },
        ],
      };

      if (registrationStep === 2) {
        updatedValues = {
          ...commonValues,
          addresses: [
            ...commonValues.addresses,
            {
              country: values.country,
              streetName: values.street,
              postalCode: values.postalcode,
              city: values.city,
            },
          ],
        };
      } else {
        updatedValues = {
          ...commonValues,
          addresses: [
            ...commonValues.addresses,
            {
              country: values.countryB,
              streetName: values.streetB,
              postalCode: values.postalcodeB,
              city: values.cityB,
            },
          ],
        };
      }
    }

    if (updatedValues) {
      const success = await signUpCustomer(updatedValues);
      if (success) {
        const updatedUserData = {
          email: updatedValues.email,
          password: updatedValues.password,
          incorrect: false,
          logged: true,
        };
        alert(
          `Success registration. Welcome to our store ${
            updatedValues.firstName + " " + updatedValues.lastName
          }`
        );
        setUserData(updatedUserData);
        navigate("/");
      } else {
        const incorrectUserData = {
          email: "",
          password: "",
          incorrect: true,
          logged: false,
        };
        setUserData(incorrectUserData);
      }
    }

    setSubmitting(false);
  };

  interface FormValues {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    country: string;
    city: string;
    street: string;
    postalcode: string;
    countryB: string;
    cityB: string;
    streetB: string;
    postalcodeB: string;
  }

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
        onSubmit={handleFormSubmit}
      >
        {({ errors, touched }) => (
          <>
            <Helmet>
              <title>JustStore - Sing up</title>
            </Helmet>
            <div className="singup">
              <div className="background" />
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

                        <button
                          type="submit"
                          onClick={() => {
                            setClickedButton("nextStep");
                          }}
                        >
                          fill in billing adress
                          <span className="arrow" />
                        </button>
                        <p> Or set address as billing too and</p>
                        <button
                          type="submit"
                          onClick={() => {
                            setClickedButton("submit");
                          }}
                        >
                          Sign up
                        </button>
                        {clickedButton === "submit" && userData.incorrect && (
                          <div id="incorrectSign">The entered email is already in use</div>
                        )}
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
                        {clickedButton === "submit" && userData.incorrect && (
                          <div id="incorrectSign">The entered email is already in use</div>
                        )}
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
