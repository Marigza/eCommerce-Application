import { ChangeEventHandler, FC, useState } from 'react';

import './Login.scss';
import { createCustomer } from '../../client';
import { userLoginValidate, userPasswordValidate } from '../../validation/validation';

const Login: FC = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const userDataChangeHandler: ChangeEventHandler<HTMLInputElement> = event => {
    setUserData(previousData => ({
      ...previousData,
      [event.target.name]: event.target.value,
    }));
  };

  const hintInactive = (login: boolean, password: boolean) => {
    const loginHint = document.querySelector('.login-page__login--hint') as HTMLDivElement;
    const passwordHint = document.querySelector('.login-page__password--hint') as HTMLDivElement;

    if (!login) {
      loginHint.textContent = 'Login is invalid...';
      loginHint.classList.add('active');
      return;
    }
    if (!password) {
      passwordHint.textContent =
        'The password must be between 8 and 16 characters long and must contain at least one uppercase character and one special character, such as "@#$%^&"';
    }
    loginHint.classList.remove('active');
    passwordHint.classList.remove('active');
  };

  const validation = () => {
    const { email, password } = userData;
    if (userLoginValidate(email)) {
      if (userPasswordValidate(password)) {
        alert('Пароль валиден...');
        alert('Валидация прошла успешно !');
        return;
      }
      alert('Пароль не валидный !');
      return;
    }
    // вот здесь вызывается функция //
    const customer = { email: 'getting-started@example.com', password: 'Qerty123#' };
    createCustomer(customer); // userData

    return;
  };

  const passwordControl = () => {
    setShowPassword(prev => !prev);
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
          <label>Email</label>
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
          <div className={`login-page__password ${showPassword ? 'view' : ''}`}>
            <input
              value={userData.password}
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="8 to 16 digit, also use special digit"
              onChange={userDataChangeHandler}
            ></input>
            <div className="login-page__password--secure" onClick={passwordControl}></div>
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
