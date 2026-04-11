import './header.css';

function Header() {
  return (
    <header className="header">
      <h1 className="header__title">
        human<br />
        on a small dot
      </h1>
      <span className="header__pale-blue-dot" aria-hidden="true" />

      <div className="header__bottom">
        <p className="header__subtitle">you are seeing pale blue dot by carl sagan</p>
      </div>
    </header>
  );
}

export default Header;
