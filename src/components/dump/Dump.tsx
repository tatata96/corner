import {
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import { TransformComponent, TransformWrapper, useControls } from 'react-zoom-pan-pinch';
import { dumpAssets, type DumpAsset } from '../../data/dumpAssets';
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
                {asset.type === 'video' ? (
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
                  {asset.description}
                </figcaption>
              </figure>
            ))}
          </div>
        </TransformComponent>
      </TransformWrapper>

      {selectedAsset && (
        <aside
          className="dump-view__detail"
          aria-label={`${selectedAsset.title} details`}
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
          <div className="dump-view__detail-media">
            {selectedAsset.type === 'video' ? (
              <video
                src={selectedAsset.src}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
            ) : (
              <img src={selectedAsset.src} alt={selectedAsset.alt ?? ''} />
            )}
          </div>
          <span className="dump-view__detail-id">{selectedAsset.id}</span>
          <h2>{selectedAsset.title}</h2>
          <p>{selectedAsset.description}</p>
          <div className="dump-view__detail-tags">
            {selectedAsset.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </aside>
      )}
    </section>
  );
}

export default Dump;
