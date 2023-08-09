import "./loginPage.scss";

function LoginPage(): JSX.Element {
  return (
    <div className="login-page">
      <div className="login-page__container">
        <p className="login-page__title">Authorization</p>
        <form className="login-page__form" action="#" method="post">
          <label>Login</label>
          <input type="email" name="auth_email" placeholder="Enter your email" required></input>
          <label>Password</label>
          <input
            type="password"
            name="auth_pass"
            placeholder="Enter your password"
            required
          ></input>
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
