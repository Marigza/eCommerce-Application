import { ChangeEventHandler, FC, useState } from "react";

import "./Login.scss";
import { singUpCustom } from "../../authentication/client_Api";
import { userLoginValidate, userPasswordValidate } from "../../validation/validation";

const Login: FC = () => {
  const testBody = {
    email: "puytsaioioma@mail.ru",
    password: "#Qwc50puhgfdy8234$",
    firstName: "Mikhail",
    lastName: "Hancharuk",
    dateOfBirth: "1985-01-27",
  };
  // addresses: [
  //   {
  //     city: "Grodno",
  //     country: "Bialorus",
  //     postalCode: "230017",
  //     streetName: "Oginskogo",
  //   },
  //   {
  //     city: "Grodno",
  //     country: "Bialorus",
  //     postalCode: "230023",
  //     streetName: "Kupaly",
  //   },
  // ],

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
    singUpCustom(JSON.stringify(testBody)).then((data) => console.log(data));
    // if (userLoginValidate(email)) {
    // if (userPasswordValidate(password)) {
    // alert("Пароль валиден...");
    // alert("Валидация прошла успешно !");
    // return;
    // }
    // alert("Пароль не валидный !");
    // return;
    // }
    // alert("Логин не валидный !");
    // return;
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
