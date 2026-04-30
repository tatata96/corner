import { useRef, useState, type KeyboardEvent, type PointerEvent, type WheelEvent } from 'react';
import './dump.css';

type DumpAsset = {
  id: string;
  type: 'image' | 'video';
  src: string;
  alt?: string;
  description: string;
  x: number;
  y: number;
  width: number;
  className?: string;
};

const assets: DumpAsset[] = [
  {
    id: 'briefnew',
    type: 'video',
    src: '/videos/briefnew.mov',
    description: 'motion prototype for a brief-building flow',
    x: 720,
    y: 260,
    width: 430,
  },
  {
    id: 'img1',
    type: 'image',
    src: '/images/img1.jpg',
    alt: 'visual study',
    description: 'visual study exploring layered interface rhythm',
    x: 420,
    y: 360,
    width: 245,
  },
  {
    id: 'metrics',
    type: 'image',
    src: '/videos/metrics.png',
    alt: 'metrics interface',
    description: 'metrics interface sketch with compact comparison states',
    x: 1030,
    y: 470,
    width: 320,
  },
  {
    id: 'gallery-universe',
    type: 'video',
    src: '/videos/gallery-universe.mov',
    description: 'gallery navigation prototype with spatial browsing',
    x: 560,
    y: 570,
    width: 455,
  },
  {
    id: 'brief2',
    type: 'video',
    src: '/videos/brief2.mov',
    description: 'alternate brief interaction pass with denser controls',
    x: 1200,
    y: 230,
    width: 280,
  },
  {
    id: 'img2',
    type: 'image',
    src: '/images/img2.png',
    alt: 'wide interface capture',
    description: 'wide interface capture for an exploratory tool surface',
    x: 880,
    y: 780,
    width: 390,
  },
];

function Dump() {
  const [offset, setOffset] = useState({ x: -320, y: -170 });
  const [pinnedAssetId, setPinnedAssetId] = useState<string | null>(null);
  const dragRef = useRef<{ pointerId: number; x: number; y: number } | null>(null);

  function handlePointerDown(event: PointerEvent<HTMLElement>) {
    dragRef.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    const drag = dragRef.current;

    if (!drag || drag.pointerId !== event.pointerId) {
      return;
    }

    const dx = event.clientX - drag.x;
    const dy = event.clientY - drag.y;
    dragRef.current = { pointerId: event.pointerId, x: event.clientX, y: event.clientY };
    setOffset((current) => ({ x: current.x + dx, y: current.y + dy }));
  }

  function endDrag(event: PointerEvent<HTMLElement>) {
    if (dragRef.current?.pointerId === event.pointerId) {
      dragRef.current = null;
    }
  }

  function handleWheel(event: WheelEvent<HTMLElement>) {
    setOffset((current) => ({
      x: current.x - event.deltaX,
      y: current.y - event.deltaY,
    }));
  }

  function handleTileKeyDown(event: KeyboardEvent<HTMLElement>, assetId: string) {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }

    event.preventDefault();
    setPinnedAssetId((current) => (current === assetId ? null : assetId));
  }

  return (
    <section
      className="dump-view"
      onClick={(event) => {
        event.stopPropagation();
        setPinnedAssetId(null);
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onWheel={handleWheel}
    >
      <div
        className="dump-view__surface"
        style={{ transform: `translate3d(${offset.x}px, ${offset.y}px, 0)` }}
      >
        {assets.map((asset) => (
          <figure
            className={`dump-view__tile${pinnedAssetId === asset.id ? ' dump-view__tile--pinned' : ''}${asset.className ? ` ${asset.className}` : ''}`}
            key={asset.id}
            style={{ left: asset.x, top: asset.y, width: asset.width }}
            role="button"
            tabIndex={0}
            aria-label={asset.description}
            onClick={(event) => {
              event.stopPropagation();
              setPinnedAssetId((current) => (current === asset.id ? null : asset.id));
            }}
            onPointerDown={(event) => event.stopPropagation()}
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
            <figcaption className="dump-view__tooltip">{asset.description}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export default Dump;
