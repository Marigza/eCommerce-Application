import "./loginPage.scss";

function LoginPage(): JSX.Element {
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
        <form className="login-page__form" action="#" method="post">
          <label>Login</label>
          <input type="email" name="auth_email" placeholder="Enter your email" required></input>
          <label>Password</label>
          <div className="login-page__password">
            <input
              type="password"
              name="auth_pass"
              placeholder="Enter your password"
              required
            ></input>
            <div onClick={passwordControl}></div>
          </div>
          <button
            className="login-page__button login-page__button--log-in"
            type="submit"
            name="form_auth_submit"
          >
            Log in
          </button>
        </form>
        <button
          className="login-page__button login-page__button--sign-up"
          type="submit"
          name="form_auth_submit"
        >
          Sign up
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
