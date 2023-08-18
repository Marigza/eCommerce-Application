import { ChangeEventHandler, FC, useState } from "react";

import "./Login.scss";
import { singUpCustomer, getCustomer } from "../../authentication/client_Api";
import { IBodyOfSingUpCustomer } from "../../authentication/client_Api/types";
import { userLoginValidate, userPasswordValidate } from "../../validation/validation";

const Login: FC = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const userDataChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    setUserData((previousData) => ({
      ...previousData,
      [event.target.name]: event.target.value,
    }));
  };

  const validation = () => {
    const { email, password } = userData;

    const testBody: IBodyOfSingUpCustomer = {
      email: "muinna666@mail.ru",
      password: "#Qwcdkslb01894$",
      firstName: "Mikhail",
      lastName: "Hancharuk",
      dateOfBirth: "1985-01-27",
      addresses: [
        {
          country: "PL",
          streetName: "Oginskogo",
          postalCode: "230017",
          city: "Grodno",
        },
        {
          country: "PL",
          streetName: "Kupaly",
          postalCode: "230026",
          city: "Grodno",
        },
      ],
    };

    // ------- Вызов функции регистрации и получения кастомера по ID ------- //
    singUpCustomer(testBody).then((data) => console.log(data));
    getCustomer("e7e98586-8150-48ba-96a9-dd164cc326d4").then((responce) => console.log(responce));

    if (userLoginValidate(email)) {
      if (userPasswordValidate(password)) {
        alert("Пароль валиден...");
        alert("Валидация прошла успешно !");
        return;
      }
      alert("Пароль не валидный !");
      return;
    }
    alert("Логин не валидный !");
    return;
  };

  const passwordControl = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="login-page">
      <div className="login-page__container">
        <p className="login-page__title">Authorization</p>
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}
          className="login-page__form"
          action="#"
          method="post"
          noValidate
        >
          <label>Login</label>
          <div className="login-page__login">
            <div className="login-page__login--hint"></div>
            <input
              value={userData.email}
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              onChange={userDataChangeHandler}
            ></input>
          </div>
          <label>Password</label>
          <div className="login-page__password">
            <input
              value={userData.password}
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="8 to 16 digit, also use special digit"
              onChange={userDataChangeHandler}
            ></input>
            <div
              className={`login-page__password--secure ${showPassword ? "view" : ""}`}
              onClick={passwordControl}
            ></div>
            <div className="login-page__password--hint"></div>
          </div>
          <button
            onClick={validation}
            className="login-page__button login-page__button--log-in"
            type="submit"
            name="form_auth_submit"
          >
            Log in
          </button>
        </form>
        <button className="login-page__button login-page__button--sign-up">Sign up</button>
        <button className="login-page__button login-page__button--back">Back to main page</button>
      </div>
    </div>
  );
};

export default Login;
