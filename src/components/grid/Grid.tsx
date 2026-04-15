import type { ContentItem } from '../../data/content';
import ProjectCard from '../projectCard/ProjectCard';
import './grid.css';

interface GridProps {
  items: ContentItem[];
  onSelect: (item: ContentItem) => void;
}

function Grid({ items, onSelect }: GridProps) {
  return (
    <section className="grid-view" onClick={(e) => e.stopPropagation()}>
      {items.map((item, i) => (
        <ProjectCard key={item.id} item={item} colorIndex={i} variant="grid" onSelect={onSelect} />
      ))}
    </section>
  );
}

export default Grid;
