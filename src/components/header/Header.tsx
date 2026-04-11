import './header.css';

function Header() {
  return (
    <header className="header">
      <h1 className="header__title">
        care about<br />
        how it feels
      </h1>
      <span className="header__pale-blue-dot" aria-hidden="true" />

      <div className="header__bottom">
        <p className="header__subtitle">pale blue dot by carl sagan</p>
      </div>
    </header>
  );
}

export default Header;
