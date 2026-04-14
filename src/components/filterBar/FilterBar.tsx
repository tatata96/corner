import './filterBar.css';

interface FilterBarProps {
  tags: string[];
  activeTags: Set<string>;
  onToggle: (tag: string) => void;
  onClear: () => void;
}

function FilterBar({ tags, activeTags, onToggle, onClear }: FilterBarProps) {
  return (
    <div className="filter-bar">
      {tags.map((tag) => (
        <button
          key={tag}
          className={`filter-bar__pill${activeTags.has(tag) ? ' filter-bar__pill--active' : ''}`}
          onClick={() => onToggle(tag)}
          aria-pressed={activeTags.has(tag)}
        >
          {tag}
        </button>
      ))}
      {activeTags.size > 0 && (
        <button className="filter-bar__clear" onClick={onClear}>
          clear
        </button>
      )}
    </div>
  );
}

export default FilterBar;
