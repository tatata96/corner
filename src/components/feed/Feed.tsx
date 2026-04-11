import { projects, type Project } from '../../data/projects';
import ProjectCard from '../projectCard/ProjectCard';
import './feed.css';

interface FeedProps {
  onSelect: (project: Project) => void;
}

function Feed({ onSelect }: FeedProps) {
  return (
    <section className="feed-view" onClick={(e) => e.stopPropagation()}>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} variant="feed" onSelect={onSelect} />
      ))}
    </section>
  );
}

export default Feed;
