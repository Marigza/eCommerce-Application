import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { loginCustomer } from "../../client_Api/authentication";
import { useUserContext } from "../../context/UserContext";
import ValidationSchema from "../../validation/Validation";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { userData, setUserData } = useUserContext();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleFormSubmit = async (values: FormValues) => {
    const success = await loginCustomer({
      email: values.email,
      password: values.password,
    });

    if (success) {
      const updatedUserData = {
        email: values.email,
        password: values.password,
        incorrect: false,
        logged: true,
      };
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
  };

  const clearIncorrectFlag = () => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      incorrect: false,
    }));
  };

  interface FormValues {
    email: string;
    password: string;
  }

  return (
    <>
      <Helmet>
        <title>JustStore - Login</title>
      </Helmet>
      <div className="singup">
        <div className="background" />
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
              onSubmit={handleFormSubmit}
            >
              {({ errors, touched }) => (
                <Form className="login-wrapper__card-form">
                  <Field type="text" name="email" onFocus={clearIncorrectFlag} />
                  <div>
                    <label>Login</label>
                    {errors.email && touched.email ? (
                      <div className="error">{errors.email}</div>
                    ) : null}
                  </div>
                  <Field
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    onFocus={clearIncorrectFlag}
                  />
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
                  <button type="submit" name="auth_submit">
                    Log in
                  </button>
                  {userData.incorrect && <div id="incorrect">Incorrect email or password</div>}
                </Form>
              )}
            </Formik>
            <p>
              You don&apos;t have an account yet?
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
