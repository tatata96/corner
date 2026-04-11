import { projects } from '../../data/projects';
import ProjectCard from '../projectCard/ProjectCard';
import './grid.css';

function Grid() {
  return (
    <section className="grid-view" onClick={(e) => e.stopPropagation()}>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} variant="grid" />
      ))}
    </section>
  );
}

export default Grid;
