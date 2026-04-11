import type { Project } from '../../data/projects';
import './projectCard.css';

interface ProjectCardProps {
  project: Project;
  variant?: 'grid' | 'feed';
  onSelect: (project: Project) => void;
}

function ProjectCard({ project, variant = 'grid', onSelect }: ProjectCardProps) {
  return (
    <article
      className={`card card--${variant}`}
      onClick={() => onSelect(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onSelect(project)}
    >
      <div className="card__diagonal" aria-hidden="true" />

      <div className="card__checker" aria-hidden="true" />

      <div className="card__overlay">
        <h2 className="card__title">{project.title}</h2>

        <p className="card__meta">{project.year} — {project.medium}</p>
      </div>
    </article>
  );
}

export default ProjectCard;
