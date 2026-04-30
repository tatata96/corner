import type { CSSProperties } from 'react';
import './filterBar.css';

interface FilterBarProps {
  tags: string[];
  tagColorMap: Map<string, string>;
  activeTags: Set<string>;
  onToggle: (tag: string) => void;
  onClear: () => void;
}

function FilterBar({ tags, tagColorMap, activeTags, onToggle, onClear }: FilterBarProps) {
  return (
    <div className="filter-bar" onClick={(e) => e.stopPropagation()}>
      <div className="filter-bar__tags">
        {tags.map((tag) => {
          const active = activeTags.has(tag);
          const color = tagColorMap.get(tag);
          const style = color
            ? ({ '--filter-color': color } as CSSProperties)
            : undefined;
          return (
            <button
              key={tag}
              className={`filter-bar__pill${active ? ' filter-bar__pill--active' : ''}`}
              style={style}
              onClick={() => onToggle(tag)}
              aria-pressed={active}
            >
              {tag}
            </button>
          );
        })}
        {activeTags.size > 0 && (
          <button className="filter-bar__clear" onClick={onClear} aria-label="Clear active tag filters">
            clear
          </button>
        )}
      </div>
    </div>
  );
}

export default FilterBar;
