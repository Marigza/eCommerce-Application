import React, { useState, FormEventHandler } from "react";
import "./SignUp.scss";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";

const SignUp: React.FC = () => {
  const [registrationStep, setRegistrationStep] = useState(1);
  const [passwordVisible, setPasswordVisible] = useState({
    passw: false,
  });

  const [formData, setFormData] = useState({
    firstName: { value: "", filled: false },
    lastName: { value: "", filled: false },
    email: { value: "", filled: false },
    password: { value: "", filled: false },
    birthdate: { value: "", filled: false },
    mainCountry: { value: "", filled: false },
    mainCity: { value: "", filled: false },
    mainStreet: { value: "", filled: false },
    mainPostal: { value: "", filled: false },
    billingCountry: { value: "", filled: false },
    billingCity: { value: "", filled: false },
    billingStreet: { value: "", filled: false },
    billingPostal: { value: "", filled: false },
  });

  const handleChangeField =
    (field: keyof typeof formData) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: {
          value: event.target.value,
          filled: event.target.value !== "",
        },
      }));
    };

  const handleTogglePasswordVisibility = (field: keyof typeof passwordVisible) => {
    setPasswordVisible((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handleNextStep = () => {
    setRegistrationStep(registrationStep + 1);
  };

  const handleSubmitForm: FormEventHandler = (e) => {
    e.preventDefault();

    const sendData = Object.fromEntries(
      Object.entries(formData)
        .filter(([key, { value }]) => value !== "")
        .map(([key, { value }]) => [key, value]),
    );

    fetch("http://localhost:3000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendData),
    }).then((response) => response.json());
  };

  return (
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
                <form className="singup-wrapper__card-form">
                  <div>
                    <input
                      type="text"
                      name="sign_firstname"
                      maxLength={14}
                      required
                      onChange={handleChangeField("firstName")}
                    />
                    <label>Firstname</label>
                    <input
                      type="text"
                      name="sign_lastname"
                      maxLength={14}
                      required
                      onChange={handleChangeField("lastName")}
                    />
                    <label>Lastname</label>
                  </div>
                  <input
                    type="text"
                    name="sign_email"
                    maxLength={35}
                    required
                    onChange={handleChangeField("email")}
                  />
                  <label>Email</label>

                  <input
                    type={passwordVisible.passw ? "text" : "password"}
                    name="sign_passw"
                    maxLength={25}
                    required
                    onChange={handleChangeField("password")}
                  />
                  <div>
                    <label>Password</label>
                    <span
                      className={passwordVisible.passw ? "visible" : ""}
                      onClick={() => handleTogglePasswordVisibility("passw")}
                    />
                  </div>

                  <input
                    type="date"
                    name="sign_birthdate"
                    required
                    onChange={handleChangeField("birthdate")}
                  />
                  <label>Date of birth</label>

                  <button
                    type="button"
                    disabled={
                      !Object.values(formData)
                        .slice(0, 5)
                        .map((field) => field.filled)
                        .every(Boolean)
                    }
                    onClick={handleNextStep}
                  >
                    fill in shipping adress
                    <span className="arrow" />
                  </button>
                </form>
              </>
            )}
            {registrationStep === 2 && (
              <>
                <h2 className="singup-wrapper__card-title">Shipping address</h2>
                <form className="singup-wrapper__card-form" onSubmit={handleSubmitForm}>
                  <div>
                    <input
                      type="text"
                      name="sign_country"
                      required
                      onChange={handleChangeField("mainCountry")}
                    />
                    <label>Country</label>

                    <input
                      type="text"
                      name="sign_city"
                      required
                      onChange={handleChangeField("mainCity")}
                    />
                    <label>City</label>
                  </div>

                  <input
                    type="text"
                    name="sign_street"
                    required
                    onChange={handleChangeField("mainStreet")}
                  />
                  <label>Street</label>

                  <input
                    type="text"
                    name="sign_postalcode"
                    required
                    onChange={handleChangeField("mainPostal")}
                  />
                  <label>Postal code</label>

                  <button
                    type="submit"
                    disabled={
                      !Object.values(formData)
                        .slice(5, 9)
                        .map((field) => field.filled)
                        .every(Boolean)
                    }
                    onClick={handleNextStep}
                  >
                    fill in billing adress
                    <span className="arrow" />
                  </button>
                  <p> Or set address as default and</p>
                  <button
                    type="submit"
                    disabled={
                      !Object.values(formData)
                        .slice(5, 9)
                        .map((field) => field.filled)
                        .every(Boolean)
                    }
                  >
                    Sign up
                  </button>
                </form>
              </>
            )}
            {registrationStep === 3 && (
              <>
                <h2 className="singup-wrapper__card-title">Billing address</h2>
                <form className="singup-wrapper__card-form" onSubmit={handleSubmitForm}>
                  <input
                    type="text"
                    name="sign_country"
                    required
                    onChange={handleChangeField("billingCountry")}
                  />
                  <label>Country</label>

                  <input
                    type="text"
                    name="sign_city"
                    required
                    onChange={handleChangeField("billingCity")}
                  />
                  <label>City</label>

                  <input
                    type="text"
                    name="sign_street"
                    required
                    onChange={handleChangeField("billingStreet")}
                  />
                  <label>Street</label>

                  <input
                    type="text"
                    name="sign_postalcode"
                    required
                    onChange={handleChangeField("billingPostal")}
                  />
                  <label>Postal code</label>

                  <button
                    type="submit"
                    disabled={
                      !Object.values(formData)
                        .slice(9)
                        .map((field) => field.filled)
                        .every(Boolean)
                    }
                  >
                    Sign up
                  </button>
                </form>
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
  );
};

export default SignUp;
