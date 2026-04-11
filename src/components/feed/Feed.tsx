import { projects } from '../../data/projects';
import ProjectCard from '../projectCard/ProjectCard';
import './feed.css';

function Feed() {
  return (
    <section className="feed-view" onClick={(e) => e.stopPropagation()}>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} variant="feed" />
      ))}
    </section>
  );
}

export default Feed;
