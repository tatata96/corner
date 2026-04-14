import type { ContentItem } from '../../data/content';
import type { MouseEvent } from 'react';
import { PALE_BLUE_DOT_COLOR_GROUPS } from '../../data/paleBlueDot';
import './projectCard.css';

interface ProjectCardProps<T extends ContentItem> {
  item: T;
  colorIndex: number;
  variant?: 'grid' | 'feed';
  onSelect: (item: T) => void;
}

function getMeta(item: ContentItem) {
  return item.type === 'article' ? item.date : `${item.year} — ${item.medium}`;
}

function ProjectCard<T extends ContentItem>({ item, colorIndex, variant = 'grid', onSelect }: ProjectCardProps<T>) {
  const paletteColor = PALE_BLUE_DOT_COLOR_GROUPS[colorIndex % PALE_BLUE_DOT_COLOR_GROUPS.length];
  const bgColor = `color-mix(in srgb, ${paletteColor} 30%, white)`;

  function handleClick(e: MouseEvent<HTMLElement>) {
    e.stopPropagation();
    onSelect(item);
  }

  return (
    <article
      className={`card card--${variant} card--${item.type}`}
      style={{ backgroundColor: bgColor }}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onSelect(item)}
    >

      <div className="card__cover">
        <span className="card__label">{item.type}</span>
        <h2 className="card__title">{item.title}</h2>
        <p className="card__meta">{getMeta(item)}</p>
      </div>

      <div className="card__overlay">
        {item.type === 'article' ? (
          <>
            <span className="card__label">article</span>
            <h2 className="card__title">{item.title}</h2>
            <p className="card__meta">{item.date}</p>
            <p className="card__article">{item.content}</p>
          </>
        ) : (
          <>
            <h2 className="card__title">{item.title}</h2>

            <p className="card__meta">{getMeta(item)}</p>
          </>
        )}
      </div>
    </article>
  );
}

export default ProjectCard;
