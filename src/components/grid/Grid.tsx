import { projects, type Project } from '../../data/projects';
import ProjectCard from '../projectCard/ProjectCard';
import './grid.css';

interface GridProps {
  onSelect: (project: Project) => void;
}

function Grid({ onSelect }: GridProps) {
  return (
    <section className="grid-view" onClick={(e) => e.stopPropagation()}>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} variant="grid" onSelect={onSelect} />
      ))}
    </section>
  );
}

export default Grid;
