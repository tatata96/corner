import './nav.css';

export type ViewMode = 'about' | 'feed';

interface NavProps {
  view: ViewMode | null;
  onViewChange: (view: ViewMode) => void;
}

function Nav({ view, onViewChange }: NavProps) {
  return (
    <nav className="nav">
      <span className="nav__name">tamara kozok</span>

      <div className="nav__views">
        <button
          className={`nav__view-btn${view === 'about' ? ' nav__view-btn--active' : ''}`}
          onClick={() => onViewChange('about')}
        >
          about
        </button>

        <button
          className={`nav__view-btn${view === 'feed' ? ' nav__view-btn--active' : ''}`}
          onClick={() => onViewChange('feed')}
        >
          feed
        </button>
      </div>

      <div className="nav__links">
        <a
          href="https://github.com/tatata96"
          target="_blank"
          rel="noopener noreferrer"
          className="nav__link"
        >
          github
        </a>

        <a
          href="https://www.linkedin.com/in/tamara-kozok/"
          target="_blank"
          rel="noopener noreferrer"
          className="nav__link"
        >
          linkedin
        </a>

        <a href="mailto:tamarakozok@gmail.com" className="nav__link">email</a>
      </div>
    </nav>
  );
}

export default Nav;
