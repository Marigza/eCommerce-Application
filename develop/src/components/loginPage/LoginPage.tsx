import "./loginPage.scss";
import { userLoginValidate, userPasswordValidate } from "../../validation/validation";

function LoginPage(): JSX.Element {
  function validation(): void {
    const login = (document.querySelector(".login-page__form") as HTMLFormElement).querySelector(
      "input",
    ) as HTMLInputElement;
    const password = (
      document.querySelector(".login-page__password") as HTMLDivElement
    ).querySelector("input") as HTMLInputElement;
    if (userLoginValidate(login.value)) {
      alert("Логин валиден...");
      if (userPasswordValidate(password.value)) {
        alert("Пароль валиден...");
        alert("Валидация прошла успешно !");
        return;
      }
      alert("Пароль не валидный !");
      return;
    }
    alert("Логин не валидный !");
    return;
  }

  function passwordControl(): void {
    const password = document.querySelector(".login-page__password") as HTMLDivElement;
    if (
      password.firstChild &&
      password.firstChild instanceof HTMLInputElement &&
      password.firstChild.getAttribute("type") === "password"
    ) {
      password.firstChild.setAttribute("type", "text");
      password.classList.add("view");
    } else if (
      password.firstChild &&
      password.firstChild instanceof HTMLInputElement &&
      password.firstChild.getAttribute("type") === "text"
    ) {
      password.firstChild.setAttribute("type", "password");
      password.classList.remove("view");
    }
  }

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
          <input type="email" name="auth_email" placeholder="Enter your email" required></input>
          <label>Password</label>
          <div className="login-page__password">
            <input
              type="password"
              name="auth_pass"
              placeholder="8 to 16 digit, also use special digit"
            ></input>
            <div onClick={passwordControl}></div>
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
}

export default LoginPage;
