import "./Header.scss";

function Header(): JSX.Element {
  return (
    <header className="header">
      <div className="logo">logo</div>
      <div className="navigation__wrapper">
        <ul className="navigation">
          <li>home</li>
          <li>cart</li>
          <li>about Us</li>
        </ul>
      </div>
      <div className="login__block">
        <button onClick={() => alert("go to LogIn")}>logIn</button>
        <button onClick={() => alert("go to Registration")}>Registration</button>
      </div>
    </header>
  );
}

export default Header;
