import { useState } from "react";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
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
            <form
              onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}
              className="login-wrapper__card-form"
            >
              <input type="text" name="auth_email" required></input>
              <label>Login</label>

              <input
                type={passwordVisible.passw ? "text" : "password"}
                name="auth_pass"
                required
              ></input>
              <div>
                <label>Password</label>
                <span
                  className={passwordVisible.passw ? "visible" : ""}
                  onClick={() => handleTogglePasswordVisibility("passw")}
                />
              </div>

              <button type="submit" name="auth_submit">
                Log in
              </button>
            </form>
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
