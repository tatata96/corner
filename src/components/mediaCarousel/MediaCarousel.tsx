import { useMemo, useState } from 'react';
import './mediaCarousel.css';

export type MediaCarouselItem = {
  id: string;
  title: string;
  type: 'image' | 'video';
  src: string;
  alt?: string;
  mediaWidth?: number;
  mediaHeight?: number;
};

interface MediaCarouselProps<T extends MediaCarouselItem> {
  items: T[];
  initialItemId?: string;
  onActiveItemChange?: (item: T) => void;
}

function getItemAspectRatio(item: MediaCarouselItem) {
  if (item.mediaWidth && item.mediaHeight) {
    return `${item.mediaWidth} / ${item.mediaHeight}`;
  }

  return '16 / 9';
}

function MediaCarousel<T extends MediaCarouselItem>({
  items,
  initialItemId,
  onActiveItemChange,
}: MediaCarouselProps<T>) {
  const initialIndex = useMemo(() => {
    const index = items.findIndex((item) => item.id === initialItemId);

    return index >= 0 ? index : 0;
  }, [initialItemId, items]);

  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const activeItem = items[activeIndex] ?? items[0];
  const hasNavigation = items.length > 1;

  function setActiveItem(nextIndex: number) {
    const wrappedIndex = (nextIndex + items.length) % items.length;
    const nextItem = items[wrappedIndex];

    setActiveIndex(wrappedIndex);

    if (nextItem) {
      onActiveItemChange?.(nextItem);
    }
  }

  if (!activeItem) {
    return null;
  }

  return (
    <div className="media-carousel">
      <div
        className="media-carousel__frame"
        style={{ aspectRatio: getItemAspectRatio(activeItem) }}
      >
        {activeItem.type === 'video' ? (
          <video
            src={activeItem.src}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        ) : (
          <img src={activeItem.src} alt={activeItem.alt ?? ''} />
        )}
      </div>

      {hasNavigation && (
        <div className="media-carousel__controls" aria-label="Media navigation">
          <button
            type="button"
            className="media-carousel__button"
            onClick={() => setActiveItem(activeIndex - 1)}
            aria-label="Previous media"
          >
            <span aria-hidden="true">←</span>
          </button>
          <span className="media-carousel__count">
            {activeIndex + 1} / {items.length}
          </span>
          <button
            type="button"
            className="media-carousel__button"
            onClick={() => setActiveItem(activeIndex + 1)}
            aria-label="Next media"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default MediaCarousel;
