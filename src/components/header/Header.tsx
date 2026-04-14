import './header.css';

interface HeaderProps {
  onOpenPaleBlueDot: () => void;
}

function Header({ onOpenPaleBlueDot }: HeaderProps) {
  return (
    <header className="header">
      <h1 className="header__title">
        human<br />
        on a small dot
      </h1>

      <div className="header__mobile-links">
        <a href="https://github.com/tatata96" target="_blank" rel="noopener noreferrer" className="header__mobile-link">github</a>
        <a href="https://www.linkedin.com/in/tamara-kozok/" target="_blank" rel="noopener noreferrer" className="header__mobile-link">linkedin</a>
        <a href="mailto:tamarakozok@gmail.com" className="header__mobile-link">email</a>
      </div>

      <button
        type="button"
        className="header__pale-blue-dot"
        onClick={onOpenPaleBlueDot}
        aria-label="open pale blue dot"
      />

      <div className="header__bottom">
        <button type="button" className="header__subtitle" onClick={onOpenPaleBlueDot}>
          you are seeing "pale blue dot" by carl sagan
        </button>
      </div>
    </header>
  );
}

export default Header;
