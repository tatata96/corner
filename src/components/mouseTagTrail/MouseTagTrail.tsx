import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { PALE_BLUE_DOT_WORDS } from '../../data/paleBlueDot';
import './mouseTagTrail.css';

const BG_COLORS = ['#ffff00', '#00ff66', '#00aaff', '#ff00aa', '#ff8800', '#ccff00', '#aa66ff'];

type TrailTag = {
  id: number;
  wordIndex: number;
  x: number;
  y: number;
  word: string;
  bg: string;
  exiting: boolean;
};

function navHeightPx(): number {
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--nav-h').trim();
  const n = parseFloat(raw);
  return Number.isFinite(n) ? n : 40;
}

function MouseTagTrail() {
  const [tags, setTags] = useState<TrailTag[]>([]);
  const lastRef = useRef({ x: 0, y: 0, t: 0 });

  useEffect(() => {
    const minIntervalMs = 260;
    const minMovePx = 40;
    const maxVisibleWords = 40;
    /** One mouse event can jump many pixels; space words along that segment. */
    const wordSpacingAlongPathPx = 48;
    const maxWordsPerMove = 12;
    /** Large per-event jumps bypass the time gate so fast sweeps don’t feel “late”. */
    const fastStrokeMinPx = 96;

    function onMove(e: MouseEvent) {
      const navH = navHeightPx();
      if (e.clientY < navH) return;

      const now = performance.now();
      const prev = lastRef.current;
      const cx = e.clientX;
      const cy = e.clientY;
      const dist = Math.hypot(cx - prev.x, cy - prev.y);

      if (prev.t === 0 && prev.x === 0 && prev.y === 0) {
        lastRef.current = { x: cx, y: cy, t: now };
        return;
      }

      const fastStroke = dist >= fastStrokeMinPx;
      if (!fastStroke && now - prev.t < minIntervalMs) return;
      if (dist < minMovePx) return;

      const steps = Math.min(
        maxWordsPerMove,
        Math.max(1, Math.floor(dist / wordSpacingAlongPathPx)),
      );

      lastRef.current = { x: cx, y: cy, t: now };

      setTags((prevTags) => {
        let next = prevTags;
        let wordIndex = next.at(-1)?.wordIndex ?? -1;
        let id = next.at(-1)?.id ?? 0;
        const lx = prev.x;
        const ly = prev.y;

        for (let i = 0; i < steps; i++) {
          if (next.length >= maxVisibleWords) break;

          const t = (i + 1) / steps;
          const x = lx + t * (cx - lx);
          const y = ly + t * (cy - ly);
          if (y < navH) continue;

          wordIndex += 1;
          id += 1;
          const word = PALE_BLUE_DOT_WORDS[wordIndex % PALE_BLUE_DOT_WORDS.length];
          const bg = BG_COLORS[wordIndex % BG_COLORS.length];

          next = [
            ...next,
            {
              id,
              wordIndex,
              x,
              y,
              word,
              bg,
              exiting: false,
            },
          ];
        }

        return next;
      });
    }

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useEffect(() => {
    const fifoTickMs = 12800;

    const intervalId = window.setInterval(() => {
      setTags((prev) => {
        if (prev.length === 0) return prev;
        if (prev[0].exiting) return prev;
        const [head, ...rest] = prev;
        return [{ ...head, exiting: true }, ...rest];
      });
    }, fifoTickMs);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <div className="mouse-tag-trail" aria-hidden="true">
      {tags.map((tag, index) => (
        <span
          key={tag.id}
          className={`mouse-tag-trail__tag${tag.exiting ? ' mouse-tag-trail__tag--exit' : ''}`}
          style={
            {
              left: tag.x,
              top: tag.y,
              backgroundColor: tag.bg,
            } as CSSProperties
          }
          onAnimationEnd={(e) => {
            if (!tag.exiting || index !== 0) return;
            if (!e.animationName.includes('mouse-tag-trail-exit')) return;
            setTags((prev) => {
              if (prev.length === 0 || prev[0].id !== tag.id) return prev;
              return prev.slice(1);
            });
          }}
        >
          {tag.word}
        </span>
      ))}
    </div>
  );
}

export default MouseTagTrail;
