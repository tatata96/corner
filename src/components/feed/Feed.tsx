import type { Article } from '../../data/articles';
import type { ContentItem } from '../../data/content';
import type { Project } from '../../data/projects';
import ProjectCard from '../projectCard/ProjectCard';
import './feed.css';

interface FeedProps {
  projects: Project[];
  articles: Article[];
  onSelect: (item: ContentItem) => void;
}

function Feed({ projects, articles, onSelect }: FeedProps) {
  const items: ContentItem[] = [...projects, ...articles];

  return (
    <section className="feed-view" onClick={(e) => e.stopPropagation()}>
      {items.map((item) => (
        <ProjectCard key={item.id} item={item} variant="feed" onSelect={onSelect} />
      ))}
    </section>
  );
}

export default Feed;
