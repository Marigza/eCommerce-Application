import React, { useState, useEffect } from "react";
import "./RegistrationPage.scss";

interface PasswordVisibility {
  passw: boolean;
}

const RegistrationPage: React.FC = () => {
  const [registrationStep, setRegistrationStep] = useState(1);
  const [isFormValid, setIsFormValid] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState<PasswordVisibility>({
    passw: false,
  });

  const [requestData, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    birthdate: "",
    country: "",
    city: "",
    street: "",
    postalCode: "",
  });

  useEffect(() => {
    const form = document.querySelector(".registration-page__card-form");

    if (form instanceof HTMLFormElement) {
      const checkFormValidity = () => {
        setIsFormValid(form.checkValidity());
      };

      form.addEventListener("input", checkFormValidity);

      return () => {
        form.removeEventListener("input", checkFormValidity);
      };
    }
  }, [registrationStep]);

  const togglePasswordVisibility = (field: keyof PasswordVisibility) => {
    setPasswordVisible((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const nextStep = () => {
    setIsFormValid(false);
    setRegistrationStep(registrationStep + 1);
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch("http://localhost:3000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    }).then((response) => response.json());
  };

  return (
    <div className="registration-page">
      <div className="registration-page__card">
        <div className="registration-page__card-logo"></div>
        {registrationStep === 1 && (
          <>
            <h2 className="registration-page__card-title">Registration</h2>
            <form className="registration-page__card-form">
              <div>
                <input
                  type="text"
                  name="sign_firstname"
                  maxLength={14}
                  required
                  onChange={(e) =>
                    setData((prevData) => ({
                      ...prevData,
                      firstName: e.target.value,
                    }))
                  }
                />
                <label>Firstname</label>
                <input
                  type="text"
                  name="sign_lastname"
                  maxLength={14}
                  required
                  onChange={(e) =>
                    setData((prevData) => ({
                      ...prevData,
                      lastName: e.target.value,
                    }))
                  }
                />
                <label>Lastname</label>
              </div>
              <input
                type="text"
                name="sign_email"
                maxLength={35}
                required
                onChange={(e) =>
                  setData((prevData) => ({
                    ...prevData,
                    email: e.target.value,
                  }))
                }
              />
              <label>Email</label>

              <input
                type={passwordVisible.passw ? "text" : "password"}
                name="sign_passw"
                maxLength={25}
                required
                onChange={(e) =>
                  setData((prevData) => ({
                    ...prevData,
                    password: e.target.value,
                  }))
                }
              />
              <div>
                <label>Password</label>
                <span
                  className={passwordVisible.passw ? "visible" : ""}
                  onClick={() => togglePasswordVisibility("passw")}
                ></span>
              </div>

              <input
                type="date"
                name="sign_birthdate"
                required
                onChange={(e) =>
                  setData((prevData) => ({
                    ...prevData,
                    birthdate: e.target.value,
                  }))
                }
              />
              <label>Date of birth</label>

              <button type="button" disabled={!isFormValid} onClick={nextStep}>
                fill in address<span className="arrow"></span>
              </button>
            </form>
          </>
        )}
        {registrationStep === 2 && (
          <>
            <h2 className="registration-page__card-title">Delivery address</h2>
            <form className="registration-page__card-form" onSubmit={submitForm}>
              <input
                type="text"
                name="sign_country"
                required
                onChange={(e) =>
                  setData((prevData) => ({
                    ...prevData,
                    country: e.target.value,
                  }))
                }
              />
              <label>Country</label>

              <input
                type="text"
                name="sign_city"
                required
                onChange={(e) =>
                  setData((prevData) => ({
                    ...prevData,
                    city: e.target.value,
                  }))
                }
              />
              <label>City</label>

              <input
                type="text"
                name="sign_street"
                required
                onChange={(e) =>
                  setData((prevData) => ({
                    ...prevData,
                    street: e.target.value,
                  }))
                }
              />
              <label>Street</label>

              <input
                type="text"
                name="sign_postalcode"
                required
                onChange={(e) =>
                  setData((prevData) => ({
                    ...prevData,
                    postalCode: e.target.value,
                  }))
                }
              />
              <label>Postal code</label>

              <button type="submit" disabled={!isFormValid}>
                Sign up
              </button>
            </form>
          </>
        )}
        <p>
          Do you already have an account? <span>Log in</span>
        </p>
      </div>
    </div>
  );
};

export default RegistrationPage;
