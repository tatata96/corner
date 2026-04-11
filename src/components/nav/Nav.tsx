import './nav.css';

export type ViewMode = 'grid' | 'feed';

interface NavProps {
  view: ViewMode | null;
  onViewChange: (view: ViewMode) => void;
}

function Nav({ view, onViewChange }: NavProps) {
  return (
    <nav className="nav">
      <span className="nav__name">eif</span>

      <div className="nav__views">
        <button
          className={`nav__view-btn${view === 'grid' ? ' nav__view-btn--active' : ''}`}
          onClick={() => onViewChange('grid')}
        >
          grid
        </button>

        <button
          className={`nav__view-btn${view === 'feed' ? ' nav__view-btn--active' : ''}`}
          onClick={() => onViewChange('feed')}
        >
          feed
        </button>
      </div>

      <div className="nav__links">
        <a href="mailto:info@intermedia.foundation" className="nav__link">email</a>

        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="nav__link"
        >
          ig
        </a>
      </div>
    </nav>
  );
}

export default Nav;
