import "./header.css";

interface HeaderProps {
  onOpenPaleBlueDot: () => void;
  showAbout: boolean;
}

function Header({onOpenPaleBlueDot, showAbout}: HeaderProps) {
  return (
    <header className="header">
      <div className="header__intro">
        <div className="header__title-group">
          <h1 className="header__title" tabIndex={0}>
            human
            <br />
            on a small dot
            <img className="header__me" src="/me.png" alt="Tamara Kozok" />
          </h1>

          <button
            type="button"
            className="header__pale-blue-dot"
            onClick={onOpenPaleBlueDot}
            aria-label="open pale blue dot"
          />
        </div>

        {showAbout && (
          <div className="header__about">
            <p>
              Welcome to my corner of the web. I’m a frontend developer moving
              toward the more creative side of the web.
            </p>
            <p>
              My work sits between interface design, creative coding, motion,
              and web development. I’m interested in websites that feel
              particular, alive, not just functional.
            </p>

            <div className="header__about-sections">
              <section>
                <h2>Experience</h2>
                <p>
                  Web3, DeFi, fintech, AI-driven products, education, mobile
                  apps, design systems, wallet flows, internal tools.
                </p>
              </section>

              <section>
                <h2>Interests</h2>
                <p>
                  visual interfaces, motion, typography, digital archives,
                  creative coding, web experiments, design systems, editorial
                  layouts.
                </p>
              </section>

              <section>
                <h2>Stack</h2>
                <p>
                  React, Next.js, React Native, Expo, TypeScript, JavaScript,
                  CSS, Tailwind CSS, ShadCN, Figma, GitHub, Firebase, Sentry,
                  Cursor, Claude.
                </p>
              </section>
            </div>
          </div>
        )}
      </div>

      <div className="header__bottom">
        <button
          type="button"
          className="header__subtitle"
          onClick={onOpenPaleBlueDot}
        >
          you are seeing my favourite passage, "pale blue dot" by carl sagan
        </button>
      </div>
    </header>
  );
}

export default Header;
