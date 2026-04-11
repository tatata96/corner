import './header.css';

function Header() {
  return (
    <header className="header">
      <h1 className="header__title">
        theoretical<br />
        analysis of the<br />
        intermedia<br />
        art form
      </h1>

      <div className="header__bottom">
        <div className="header__rule" />

        <p className="header__subtitle">experimental intermedia foundation</p>
      </div>
    </header>
  );
}

export default Header;
