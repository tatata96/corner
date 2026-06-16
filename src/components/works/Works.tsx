import type { Project } from '../../data/projects';
import './works.css';

interface WorksProps {
  projects: Project[];
}

function Works({ projects }: WorksProps) {
  return (
    <section className="works-view" onClick={(e) => e.stopPropagation()}>
      {projects.length === 0 ? (
        <div className="works-view__empty">works will live here</div>
      ) : (
        <div className="works-view__rows">
          {projects.map((project, i) => (
            <article key={project.id} className="work-row">
              <div className="work-row__index">{String(i + 1).padStart(2, '0')}</div>

              <div className="work-row__main">
                <h2 className="work-row__title">{project.title}</h2>
                <p className="work-row__description">{project.description}</p>
                <div className="work-row__meta">{project.year} / {project.medium}</div>
                {project.links && project.links.length > 0 && (
                  <div className="work-row__links" aria-label={`${project.title} links`}>
                    {project.links.map((link) => (
                      <a
                        key={link.href}
                        className="work-row__link"
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span>{link.label}</span>
                        <span className="work-row__link-arrow" aria-hidden="true">↗</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {project.images && project.images.length > 0 && (
                <div className="work-row__images" aria-label={`${project.title} images`}>
                  {project.images.map((image) => (
                    <img key={image} src={image} alt="" loading="lazy" />
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Works;
