import { Formik, Form, Field } from "formik";
import React, { useState } from "react";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";

import { loginCustomer } from "../../authentication/client_Api";
import ValidationSchema from "../../validation/Validation";

const Login: React.FC = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    incorrect: false,
  });
  const [passwordVisible, setPasswordVisible] = useState({
    passw: false,
  });

  const handleTogglePasswordVisibility = (field: keyof typeof passwordVisible) => {
    setPasswordVisible((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  return (
    <>
      <Helmet>
        <title>JustStore - Login</title>
      </Helmet>
      <div className="singup">
        <Link to="/" className="background" />
        <div className="login-wrapper">
          <div className="login-wrapper__card">
            <Link to="/">
              <div className="login-wrapper__card-logo"></div>
            </Link>
            <h2 className="login-wrapper__card-title">Authorization</h2>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={ValidationSchema(0)}
              onSubmit={async (values) => {
                const success = await loginCustomer({
                  email: values.email,
                  password: values.password,
                });

                if (success) {
                  console.log("YEEEEEEEEEEEEEEEEEEEEES");
                  setUserData({
                    email: values.email,
                    password: values.password,
                    incorrect: false,
                  });
                } else {
                  console.log("NOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
                  setUserData({
                    email: "",
                    password: "",
                    incorrect: true,
                  });
                }
              }}
            >
              {({ errors, touched }) => (
                <Form className="login-wrapper__card-form">
                  <Field type="text" name="email" />
                  <div>
                    <label>Login</label>
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
                  <button type="submit" name="auth_submit">
                    Log in
                  </button>
                  {userData.incorrect && <div id="incorrect">Incorrect email or password</div>}
                </Form>
              )}
            </Formik>
            <p>
              You don't have an account yet?
              <Link to="/registration">
                <span> Sign up</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
