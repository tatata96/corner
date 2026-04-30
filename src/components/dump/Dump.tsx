import { useRef, useState, type PointerEvent, type WheelEvent } from 'react';
import './dump.css';

type DumpAsset = {
  id: string;
  type: 'image' | 'video';
  src: string;
  alt?: string;
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
    x: 720,
    y: 260,
    width: 430,
  },
  {
    id: 'img1',
    type: 'image',
    src: '/images/img1.png',
    alt: 'visual study',
    x: 420,
    y: 360,
    width: 245,
  },
  {
    id: 'metrics',
    type: 'image',
    src: '/videos/metrics.png',
    alt: 'metrics interface',
    x: 1030,
    y: 470,
    width: 320,
  },
  {
    id: 'gallery-universe',
    type: 'video',
    src: '/videos/gallery-universe.mov',
    x: 560,
    y: 570,
    width: 455,
  },
  {
    id: 'brief2',
    type: 'video',
    src: '/videos/brief2.mov',
    x: 1200,
    y: 230,
    width: 280,
  },
  {
    id: 'img2',
    type: 'image',
    src: '/images/img2.png',
    alt: 'wide interface capture',
    x: 880,
    y: 780,
    width: 390,
  },
];

function Dump() {
  const [offset, setOffset] = useState({ x: -320, y: -170 });
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

  return (
    <section
      className="dump-view"
      onClick={(event) => event.stopPropagation()}
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
            className={`dump-view__tile${asset.className ? ` ${asset.className}` : ''}`}
            key={asset.id}
            style={{ left: asset.x, top: asset.y, width: asset.width }}
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
          </figure>
        ))}
      </div>
    </section>
  );
}

export default Dump;
