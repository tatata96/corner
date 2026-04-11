import './about.css';

function About() {
  return (
    <section className="about-view" onClick={(e) => e.stopPropagation()}>
      <article className="about-panel">
        <div className="about-panel__diagonal" aria-hidden="true" />

        <span className="about-panel__label">about</span>
        <h2 className="about-panel__title">tamara kozok</h2>
        <div className="about-panel__body">
          <p>I’m a frontend developer working mostly with React and TypeScript.</p>
          <p>I’ve worked on Web3 tools, dashboards, and mobile apps — focusing on making complex things easier to use and understand.</p>
          <p>That includes building developer-facing interfaces, structuring data-heavy dashboards, and working with React Native on mobile features.</p>
          <p>I usually learn by doing, adapting as I go, and working closely with others to get things into production.</p>
          <p>More recently, I’ve been interested in how AI-driven features are presented on the frontend — and how to keep them clear and usable.</p>
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
