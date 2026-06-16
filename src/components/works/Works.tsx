import type { Project } from '../../data/projects';
import './works.css';

interface WorksProps {
  projects: Project[];
  onSelect: (project: Project) => void;
}

function Works({ projects, onSelect }: WorksProps) {
  return (
    <section className="works-view">
      {projects.length === 0 ? (
        <div className="works-view__empty">works will live here</div>
      ) : (
        <div className="works-view__rows">
          {projects.map((project, i) => (
            <article
              key={project.id}
              className="work-row"
              onClick={(event) => {
                event.stopPropagation();
                onSelect(project);
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  onSelect(project);
                }
              }}
            >
              <div className="work-row__index">{String(i + 1).padStart(2, '0')}</div>

              <div className="work-row__main">
                <h2 className="work-row__title">{project.title}</h2>
                <p className="work-row__description">{project.description}</p>
                <div className="work-row__meta">{project.year} / {project.medium}</div>
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
