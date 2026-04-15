import { PALE_BLUE_DOT_COLOR_GROUPS } from '../../data/paleBlueDot';
import './filterBar.css';

interface FilterBarProps {
  tags: string[];
  activeTags: Set<string>;
  layout: 'list' | 'grid';
  onToggle: (tag: string) => void;
  onClear: () => void;
  onLayoutChange: (layout: 'list' | 'grid') => void;
}

function FilterBar({ tags, activeTags, layout, onToggle, onClear, onLayoutChange }: FilterBarProps) {
  return (
    <div className="filter-bar" onClick={(e) => e.stopPropagation()}>
      <div className="filter-bar__tags">
        {tags.map((tag, i) => {
          const active = activeTags.has(tag);
          const color = PALE_BLUE_DOT_COLOR_GROUPS[i % PALE_BLUE_DOT_COLOR_GROUPS.length];
          return (
            <button
              key={tag}
              className={`filter-bar__pill${active ? ' filter-bar__pill--active' : ''}`}
              style={active ? { backgroundColor: color, borderColor: color } : undefined}
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

      <div className="filter-bar__layout" aria-label="Choose layout">
        <button
          className={`filter-bar__layout-button${layout === 'list' ? ' filter-bar__layout-button--active' : ''}`}
          onClick={() => onLayoutChange('list')}
          aria-pressed={layout === 'list'}
        >
          list
        </button>
        <button
          className={`filter-bar__layout-button${layout === 'grid' ? ' filter-bar__layout-button--active' : ''}`}
          onClick={() => onLayoutChange('grid')}
          aria-pressed={layout === 'grid'}
        >
          grid
        </button>
      </div>
    </div>
  );
}

export default FilterBar;
