import { useEffect, useState } from "react";
import "./nav.css";

export type ViewMode = "feed" | "works" | "pale-blue-dot" | "dump";

interface NavProps {
  view: ViewMode | null;
  onViewChange: (view: ViewMode) => void;
  onHome: () => void;
}

function Nav({view, onViewChange, onHome}: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  function handleHome() {
    setMenuOpen(false);
    onHome();
  }

  function handleView(next: ViewMode) {
    setMenuOpen(false);
    onViewChange(next);
  }

  return (
    <nav className={`nav${menuOpen ? " nav--menu-open" : ""}`}>
      <div className="nav__name-wrap">
        <button className="nav__name" onClick={handleHome}>
          tamara kozok
        </button>
        <img className="nav__me" src="/me.png" alt="Tamara Kozok" />
      </div>

      <button
        type="button"
        className="nav__menu-toggle"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label={menuOpen ? "close menu" : "open menu"}
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
      >
        <span />
        <span />
      </button>

      <div className="nav__views">
        <button
          className={`nav__view-btn${view === "works" ? " nav__view-btn--active" : ""}`}
          onClick={() => handleView("works")}
        >
          works
        </button>

        <button
          className={`nav__view-btn${view === "feed" ? " nav__view-btn--active" : ""}`}
          onClick={() => handleView("feed")}
        >
          writing
        </button>

        <button
          className={`nav__view-btn nav__view-btn--playground${view === "dump" ? " nav__view-btn--active" : ""}`}
          onClick={() => handleView("dump")}
          aria-label="playground: a loose archive of side projects, interface studies, motion sketches, visual experiments, and things made while thinking through design."
        >
          playground
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

        <a href="mailto:tamarakozok@gmail.com" className="nav__link">
          email
        </a>
      </div>

      {menuOpen && (
        <div id="mobile-menu" className="nav__mobile-menu">
          <div className="nav__mobile-primary">
            <button
              className={`nav__mobile-item${view === "works" ? " nav__mobile-item--active" : ""}`}
              onClick={() => handleView("works")}
            >
              works
            </button>
            <button
              className={`nav__mobile-item${view === "feed" ? " nav__mobile-item--active" : ""}`}
              onClick={() => handleView("feed")}
            >
              writing
            </button>
            <button
              className={`nav__mobile-item${view === "dump" ? " nav__mobile-item--active" : ""}`}
              onClick={() => handleView("dump")}
            >
              playground
            </button>
          </div>

          <div className="nav__mobile-links">
            <a
              href="https://github.com/tatata96"
              target="_blank"
              rel="noopener noreferrer"
              className="nav__mobile-link"
              onClick={() => setMenuOpen(false)}
            >
              github
            </a>
            <a
              href="https://www.linkedin.com/in/tamara-kozok/"
              target="_blank"
              rel="noopener noreferrer"
              className="nav__mobile-link"
              onClick={() => setMenuOpen(false)}
            >
              linkedin
            </a>
            <a
              href="mailto:tamarakozok@gmail.com"
              className="nav__mobile-link"
              onClick={() => setMenuOpen(false)}
            >
              email
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Nav;
