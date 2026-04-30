import type { ContentItem } from '../../data/content';
import type { CSSProperties, MouseEvent } from 'react';
import './projectCard.css';

interface ProjectCardProps<T extends ContentItem> {
  item: T;
  colorIndex: number;
  variant?: 'grid' | 'feed';
  onSelect: (item: T) => void;
}

const fallbackImages = ['/images/img1.png', '/images/img2.png', '/videos/metrics.png'];
const cardColors = [
  '#AEB8EA',
  '#8FB8D8',
  '#D6E77A',
  '#BBD7A0',
  '#E9A464',
  '#E8A3BF',
  '#B8A6D9',
  '#8DCFC5',
];

function getMeta(item: ContentItem) {
  return item.type === 'article' ? item.date : `${item.year} — ${item.medium}`;
}

function getFallbackImage(id: string) {
  const hash = Array.from(id).reduce((total, char) => total + char.charCodeAt(0), 0);
  return fallbackImages[hash % fallbackImages.length];
}

function getStableColor(id: string, index: number) {
  const hash = Array.from(id).reduce((total, char) => total + char.charCodeAt(0), 0);
  return cardColors[(hash + index) % cardColors.length];
}

function getMedia(item: ContentItem) {
  const video = 'video' in item ? item.video : undefined;
  const image = 'image' in item ? item.image : undefined;

  return {
    type: video ? 'video' : 'image',
    src: video ?? image ?? getFallbackImage(item.id),
  };
}

function getSummary(item: ContentItem) {
  if (item.type === 'project') {
    return item.description;
  }

  const firstParagraph = item.content
    .split(/\n\s*\n/)
    .find((paragraph) => paragraph.trim().length > 0);

  return (firstParagraph ?? item.content)
    .replace(/[#*_`[\]()]/g, '')
    .trim();
}

function ProjectCard<T extends ContentItem>({
  item,
  colorIndex,
  variant = 'grid',
  onSelect,
}: ProjectCardProps<T>) {
  const cardColor = getStableColor(item.id, colorIndex);
  const media = getMedia(item);
  const summary = getSummary(item);
  const style = {
    '--card-color': cardColor,
    '--card-soft-color': `color-mix(in srgb, ${cardColor} 22%, white)`,
  } as CSSProperties;

  function handleClick(e: MouseEvent<HTMLElement>) {
    e.stopPropagation();
    onSelect(item);
  }

  return (
    <article
      className={`card card--${variant} card--${item.type} card--shape-${colorIndex % 4}`}
      style={style}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onSelect(item)}
    >
      <div className="card__media-wrap" aria-hidden="true">
        <div className="card__media">
          {media.type === 'video' ? (
            <video src={media.src} autoPlay muted loop playsInline preload="metadata" />
          ) : (
            <img src={media.src} alt="" loading="lazy" />
          )}
        </div>
      </div>

      <div className="card__content">
        <div className="card__eyebrow">
          <span className="card__label">{String(colorIndex + 1).padStart(2, '0')}</span>
          <span className="card__label">{item.type}</span>
        </div>
        <h2 className="card__title">{item.title}</h2>
        <p className="card__summary">{summary}</p>
        <div className="card__tags" aria-label="Tags">
          {item.tags.slice(0, 4).map((tag) => (
            <span className="card__tag" key={tag}>{tag}</span>
          ))}
        </div>
        <div className="card__footer">
          <span className="card__meta">{getMeta(item)}</span>
          <span className="card__action">Open</span>
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
