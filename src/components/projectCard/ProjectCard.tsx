import type { ContentItem } from '../../data/content';
import './projectCard.css';

interface ProjectCardProps<T extends ContentItem> {
  item: T;
  variant?: 'grid' | 'feed';
  onSelect: (item: T) => void;
}

function getMeta(item: ContentItem) {
  return item.type === 'article' ? item.date : `${item.year} — ${item.medium}`;
}

function ProjectCard<T extends ContentItem>({ item, variant = 'grid', onSelect }: ProjectCardProps<T>) {
  return (
    <article
      className={`card card--${variant} card--${item.type}`}
      onClick={() => onSelect(item)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onSelect(item)}
    >
      <div className="card__diagonal" aria-hidden="true" />

      <div className="card__checker" aria-hidden="true" />

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
