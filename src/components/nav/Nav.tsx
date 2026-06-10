import './nav.css';

export type ViewMode = 'about' | 'feed' | 'pale-blue-dot' | 'dump';

interface NavProps {
  view: ViewMode | null;
  onViewChange: (view: ViewMode) => void;
  onHome: () => void;
}

function Nav({ view, onViewChange, onHome }: NavProps) {
  return (
    <nav className="nav">
      <button className="nav__name" onClick={onHome}>tamara kozok</button>

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

        <button
          className={`nav__view-btn${view === 'dump' ? ' nav__view-btn--active' : ''}`}
          onClick={() => onViewChange('dump')}
        >
          dump
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
