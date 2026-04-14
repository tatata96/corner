import './about.css';

function About() {
  return (
    <section className="about-view">
      <article className="about-panel" onClick={(e) => e.stopPropagation()}>
        <div className="about-panel__diagonal" aria-hidden="true" />

        <span className="about-panel__label">about</span>
        <h2 className="about-panel__title">tamara kozok</h2>
        <div className="about-panel__body">
          <p>I build for the web, mostly with React and TypeScript.</p>
          <p>Across Web3 tools, dashboards, and mobile apps,<br />I’ve worked on making complex things feel a little more simple —<br />a little easier to understand.</p>
          <p>Developer interfaces, data-heavy views,<br />and some mobile work with React Native along the way.</p>
          <p>I also care about design —<br />mostly how things feel,<br />how they come together,<br />and how little details add up.</p>
          <p>I tend to learn by doing.<br />Figuring things out as I go,<br />asking questions when needed,<br />and working closely with others to get things into production.</p>
          <p>Lately, I’ve been thinking about how AI shows up in products —<br />and how to keep it clear, usable, and not overwhelming.</p>
<br />
          On a small dot, details still matter.
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
