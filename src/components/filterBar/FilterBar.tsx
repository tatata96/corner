import { PALE_BLUE_DOT_COLOR_GROUPS } from '../../data/paleBlueDot';
import './filterBar.css';

interface FilterBarProps {
  tags: string[];
  activeTags: Set<string>;
  onToggle: (tag: string) => void;
  onClear: () => void;
}

function FilterBar({ tags, activeTags, onToggle, onClear }: FilterBarProps) {
  return (
    <div className="filter-bar" onClick={(e) => e.stopPropagation()}>
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
  );
}

export default FilterBar;
