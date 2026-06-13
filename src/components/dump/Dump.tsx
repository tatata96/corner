import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import { TransformComponent, TransformWrapper, useControls } from 'react-zoom-pan-pinch';
import { dumpAssets, type DumpAsset } from '../../data/dumpAssets';
import MediaCarousel from '../mediaCarousel/MediaCarousel';
import PdfFlipbook from '../pdfFlipbook/PdfFlipbook';
import './dump.css';

type PositionedDumpAsset = DumpAsset & {
  layoutX: number;
  layoutY: number;
};

function layoutDumpItems(items: DumpAsset[], compact: boolean): PositionedDumpAsset[] {
  if (!compact) {
    return items.map((item) => ({
      ...item,
      layoutX: item.x,
      layoutY: item.y,
    }));
  }

  return items.map((item, index) => {
    const column = index % 4;
    const row = Math.floor(index / 4);
    const rowOffset = row % 2 === 0 ? 0 : 120;

    return {
      ...item,
      layoutX: 280 + column * 390 + rowOffset,
      layoutY: 220 + row * 310,
    };
  });
}

function getWorldSize(items: PositionedDumpAsset[]) {
  const width = Math.max(...items.map((item) => item.layoutX + item.width), 1900) + 320;
  const height = Math.max(...items.map((item) => item.layoutY + item.width * 0.75), 1250) + 260;

  return { width, height };
}

function renderDumpMarkup(content: string) {
  function renderInline(line: string): ReactNode[] {
    const parts: ReactNode[] = [];
    const inlinePattern = /(\*\*([^*]+)\*\*)|(\[([^\]]+)\]\(([^)]+)\))/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = inlinePattern.exec(line)) !== null) {
      if (match.index > lastIndex) {
        parts.push(line.slice(lastIndex, match.index));
      }

      if (match[2]) {
        parts.push(<strong key={`${match.index}-strong`}>{match[2]}</strong>);
      }

      if (match[4] && match[5]) {
        parts.push(
          <a key={`${match.index}-link`} href={match[5]} target="_blank" rel="noreferrer">
            {match[4]}
          </a>
        );
      }

      lastIndex = inlinePattern.lastIndex;
    }

    if (lastIndex < line.length) {
      parts.push(line.slice(lastIndex));
    }

    return parts;
  }

  return content.split('\n').map((line, index) => {
    const key = `${index}-${line}`;

    if (line.trim() === '') {
      return null;
    }

    if (line.startsWith('- ')) {
      return <p className="dump-markup__li" key={key}>{renderInline(line.slice(2))}</p>;
    }

    return <p className="dump-markup__p" key={key}>{renderInline(line)}</p>;
  });
}

function DumpControls() {
  const { zoomIn, zoomOut, resetTransform } = useControls();

  return (
    <div className="dump-view__controls" onClick={(event) => event.stopPropagation()}>
      <button type="button" onClick={() => zoomOut()} aria-label="Zoom out">-</button>
      <button type="button" onClick={() => resetTransform()} aria-label="Reset view">reset</button>
      <button type="button" onClick={() => zoomIn()} aria-label="Zoom in">+</button>
    </div>
  );
}

function Dump() {
  const [activeTags, setActiveTags] = useState<Set<string>>(() => new Set());
  const [selectedAsset, setSelectedAsset] = useState<DumpAsset | null>(null);
  const [activeDetailAsset, setActiveDetailAsset] = useState<DumpAsset | null>(null);
  const pointerStartRef = useRef<{ assetId: string; x: number; y: number } | null>(null);

  const tags = useMemo(() => (
    Array.from(new Set(dumpAssets.flatMap((asset) => asset.tags))).sort()
  ), []);

  const visibleAssets = useMemo(() => {
    if (activeTags.size === 0) {
      return dumpAssets;
    }

    return dumpAssets.filter((asset) => (
      asset.tags.some((tag) => activeTags.has(tag))
    ));
  }, [activeTags]);

  const positionedAssets = useMemo(() => (
    layoutDumpItems(visibleAssets, activeTags.size > 0)
  ), [activeTags.size, visibleAssets]);

  const worldSize = useMemo(() => getWorldSize(positionedAssets), [positionedAssets]);

  const detailAssets = useMemo(() => {
    if (!selectedAsset) {
      return [];
    }

    if (!selectedAsset.collectionId) {
      return [selectedAsset];
    }

    return dumpAssets.filter((asset) => asset.collectionId === selectedAsset.collectionId);
  }, [selectedAsset]);

  const detailAsset = activeDetailAsset ?? selectedAsset;
  const mediaDetailAssets = useMemo(() => (
    detailAssets.filter((asset): asset is DumpAsset & { type: 'image' | 'video' } => asset.type !== 'pdf')
  ), [detailAssets]);

  useEffect(() => {
    setActiveDetailAsset(selectedAsset);
  }, [selectedAsset]);

  function toggleTag(tag: string) {
    setSelectedAsset(null);
    setActiveTags((current) => {
      const next = new Set(current);

      if (next.has(tag)) {
        next.delete(tag);
      } else {
        next.add(tag);
      }

      return next;
    });
  }

  function handleTileKeyDown(event: KeyboardEvent<HTMLElement>, assetId: string) {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }

    event.preventDefault();
    setSelectedAsset(dumpAssets.find((asset) => asset.id === assetId) ?? null);
  }

  function handleTilePointerDown(assetId: string, event: ReactPointerEvent<HTMLElement>) {
    pointerStartRef.current = {
      assetId,
      x: event.clientX,
      y: event.clientY,
    };
  }

  function openAsset(asset: DumpAsset, event: MouseEvent<HTMLElement>) {
    event.stopPropagation();

    const pointerStart = pointerStartRef.current;
    const moved = pointerStart
      ? Math.hypot(event.clientX - pointerStart.x, event.clientY - pointerStart.y)
      : 0;

    if (pointerStart && pointerStart.assetId === asset.id && moved > 8) {
      return;
    }

    setSelectedAsset(asset);
  }

  return (
    <section
      className="dump-view"
      onClick={(event) => {
        event.stopPropagation();
        setSelectedAsset(null);
      }}
    >
      <TransformWrapper
        initialScale={0.88}
        initialPositionX={-240}
        initialPositionY={-120}
        minScale={0.35}
        maxScale={2.5}
        limitToBounds={false}
        centerZoomedOut={false}
        smooth
        wheel={{ step: 0.03, wheelDisabled: true }}
        trackPadPanning={{ disabled: false }}
        pinch={{ step: 1.8 }}
        doubleClick={{ disabled: true }}
        panning={{ velocityDisabled: false }}
      >
        <DumpControls />
        <div className="dump-view__filters" onClick={(event) => event.stopPropagation()}>
          {tags.map((tag) => {
            const active = activeTags.has(tag);

            return (
              <button
                type="button"
                className={`dump-view__filter${active ? ' dump-view__filter--active' : ''}`}
                key={tag}
                onClick={() => toggleTag(tag)}
                aria-pressed={active}
              >
                {tag}
              </button>
            );
          })}
          {activeTags.size > 0 && (
            <button
              type="button"
              className="dump-view__filter-clear"
              onClick={() => {
                setActiveTags(new Set());
                setSelectedAsset(null);
              }}
            >
              clear
            </button>
          )}
        </div>

        <TransformComponent
          wrapperClass="dump-view__viewport"
          contentClass="dump-view__content"
        >
          <div
            className="dump-view__surface"
            style={{ width: worldSize.width, height: worldSize.height }}
          >
            {positionedAssets.map((asset) => (
              <figure
                className={`dump-view__tile${selectedAsset?.id === asset.id ? ' dump-view__tile--selected' : ''}${asset.className ? ` ${asset.className}` : ''}`}
                key={asset.id}
                style={{ left: asset.layoutX, top: asset.layoutY, width: asset.width }}
                role="button"
                tabIndex={0}
                aria-label={`Open ${asset.title}`}
                onClick={(event) => openAsset(asset, event)}
                onPointerDown={(event) => handleTilePointerDown(asset.id, event)}
                onKeyDown={(event) => handleTileKeyDown(event, asset.id)}
              >
                {asset.type === 'pdf' && asset.coverSrc ? (
                  <img src={asset.coverSrc} alt={asset.alt ?? ''} />
                ) : asset.type === 'pdf' ? (
                  <div className="dump-view__pdf-cover" aria-hidden="true">
                    <span className="dump-view__pdf-label">PDF</span>
                    <span className="dump-view__pdf-title">{asset.title}</span>
                    {asset.pageCount && (
                      <span className="dump-view__pdf-pages">{asset.pageCount} pages</span>
                    )}
                  </div>
                ) : asset.type === 'video' ? (
                  <video
                    src={asset.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                ) : (
                  <img src={asset.src} alt={asset.alt ?? ''} />
                )}
                <figcaption className="dump-view__tooltip">
                  <span>{asset.title}</span>
                  <div className="dump-markup dump-markup--tooltip">
                    {renderDumpMarkup(asset.description)}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </TransformComponent>
      </TransformWrapper>

      {selectedAsset && (
        <div className="dump-view__modal-overlay" aria-hidden="true" />
      )}

      {selectedAsset && detailAsset && (
        <aside
          className={`dump-view__detail${detailAsset.type === 'pdf' ? ' dump-view__detail--pdf' : ''}`}
          aria-label={`${detailAsset.title} details`}
          onClick={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            className="dump-view__detail-close"
            onClick={() => setSelectedAsset(null)}
            aria-label="Close details"
          >
            close
          </button>
          {detailAsset.type === 'pdf' ? (
            <PdfFlipbook
              title={detailAsset.title}
              src={detailAsset.src}
              pageCount={detailAsset.pageCount}
            />
          ) : (
            <MediaCarousel
              key={selectedAsset.id}
              items={mediaDetailAssets}
              initialItemId={selectedAsset.id}
              onActiveItemChange={setActiveDetailAsset}
            />
          )}
          <span className="dump-view__detail-id">{detailAsset.id}</span>
          <h2>{detailAsset.title}</h2>
          <div className="dump-markup dump-markup--detail">
            {renderDumpMarkup(detailAsset.description)}
          </div>
          <div className="dump-view__detail-tags">
            {detailAsset.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          {detailAsset.type === 'pdf' && (
            <div className="dump-view__detail-actions">
              <a className="dump-view__download" href={detailAsset.src} download>
                download pdf
              </a>
            </div>
          )}
        </aside>
      )}
    </section>
  );
}

export default Dump;
