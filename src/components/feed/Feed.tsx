import { useState } from 'react';
import type { Article } from '../../data/articles';
import type { ContentItem } from '../../data/content';
import type { Project } from '../../data/projects';
import FilterBar from '../filterBar/FilterBar';
import ProjectCard from '../projectCard/ProjectCard';
import { createTagColorMap } from '../../utils/tagColors';
import './feed.css';

interface FeedProps {
  projects: Project[];
  articles: Article[];
  onSelect: (item: ContentItem) => void;
}

function Feed({ projects, articles, onSelect }: FeedProps) {
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set());

  const items: ContentItem[] = [...projects, ...articles];

  const allTags = Array.from(
    new Set(items.flatMap((item) => item.tags))
  ).sort();
  const tagColorMap = createTagColorMap(allTags);

  const visibleItems =
    activeTags.size === 0
      ? items
      : items.filter((item) =>
          Array.from(activeTags).every((tag) => item.tags.includes(tag))
        );

  function handleToggle(tag: string) {
    setActiveTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) {
        next.delete(tag);
      } else {
        next.add(tag);
      }
      return next;
    });
  }

  function handleClear() {
    setActiveTags(new Set());
  }

  return (
    <section className="feed-view">
      <FilterBar
        tags={allTags}
        tagColorMap={tagColorMap}
        activeTags={activeTags}
        onToggle={handleToggle}
        onClear={handleClear}
      />
      {visibleItems.length === 0 ? (
        <div className="feed-view__empty">no items match the selected filters</div>
      ) : (
        <div className="feed-view__cards">
          {visibleItems.map((item, i) => (
            <ProjectCard
              key={item.id}
              item={item}
              colorIndex={i}
              variant="feed"
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default Feed;
