import "./about.css";

function About() {
  return (
    <section className="about-view">
      <article className="about-panel" onClick={(e) => e.stopPropagation()}>
        <span className="about-panel__label">about</span>
        <h2 className="about-panel__title">tamara kozok</h2>
        <div className="about-panel__body">
          <p>
            I’m a frontend developer moving toward the more creative side of the
            web. I like building visual interfaces, interactive tools, motion
            experiments.
          </p>
          <p>
            My work sits between interface design, creative coding, motion, and
            web development. I’m interested in websites that feel particular,
            alive, not just functional.
          </p>

          <div className="about-panel__sections">
            <section>
              <h3>Experience</h3>
              <p>
                Web3, DeFi, fintech, AI-driven products, education, mobile apps,
                design systems, wallet flows, internal tools.
              </p>
            </section>

            <section>
              <h3>Interests</h3>
              <p>
                visual interfaces, motion, typography, digital archives,
                creative coding, web experiments, design systems, editorial
                layouts.
              </p>
            </section>

            <section>
              <h3>Toolkit</h3>
              <p>
                React, Next.js, React Native, Expo, TypeScript, JavaScript, CSS,
                Tailwind CSS, ShadCN, Figma, GitHub, Firebase, Sentry, Cursor,
                Cursor, Claude.
              </p>
            </section>
          </div>
        </div>

        <div className="about-panel__links">
          <a
            href="https://github.com/tatata96"
            target="_blank"
            rel="noopener noreferrer"
          >
            github
          </a>
          <a
            href="https://www.linkedin.com/in/tamara-kozok/"
            target="_blank"
            rel="noopener noreferrer"
          >
            linkedin
          </a>
          <a href="mailto:tamarakozok@gmail.com">email</a>
        </div>
      </article>
    </section>
  );
}

export default About;
