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
