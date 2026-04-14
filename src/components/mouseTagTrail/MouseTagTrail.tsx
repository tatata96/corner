import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { PALE_BLUE_DOT_COLOR_GROUPS, PALE_BLUE_DOT_TAGGED } from '../../data/paleBlueDot';
import './mouseTagTrail.css';

type TrailTag = {
  id: number;
  wordIndex: number;
  x: number;
  y: number;
  word: string;
  bg: string;
  ink: string;
};

function navHeightPx(): number {
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--nav-h').trim();
  const n = parseFloat(raw);
  return Number.isFinite(n) ? n : 40;
}

function MouseTagTrail() {
  const [tags, setTags] = useState<TrailTag[]>([]);
  const lastRef = useRef({ x: 0, y: 0, t: 0 });
  const wordCursorRef = useRef(0);
  const idRef = useRef(0);

  useEffect(() => {
    const minIntervalMs = 120;
    const minMovePx = 56;
    const maxVisibleWords = 22;
    const wordSpacingAlongPathPx = 88;
    const maxWordsPerMove = 4;
    /** Large per-event jumps bypass the time gate so fast sweeps don’t feel “late”. */
    const fastStrokeMinPx = 160;

    function handleMove(cx: number, cy: number) {
      const navH = navHeightPx();
      if (cy < navH) return;

      const now = performance.now();
      const prev = lastRef.current;
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

      const poemLen = PALE_BLUE_DOT_TAGGED.length;
      const additions: TrailTag[] = [];

      for (let i = 0; i < steps; i++) {
        const t = (i + 1) / steps;
        const x = prev.x + t * (cx - prev.x);
        const y = prev.y + t * (cy - prev.y);
        if (y < navH) continue;

        const wordIndex = wordCursorRef.current;
        wordCursorRef.current = (wordCursorRef.current + 1) % poemLen;
        idRef.current += 1;
        const meta = PALE_BLUE_DOT_TAGGED[wordIndex];
        const colorIndex = meta.colorGroupIndex % PALE_BLUE_DOT_COLOR_GROUPS.length;
        const bg = PALE_BLUE_DOT_COLOR_GROUPS[colorIndex];
        const ink = colorIndex === 2 || colorIndex === 3 ? '#fff' : '#03111d';

        additions.push({
          id: idRef.current,
          wordIndex,
          x,
          y,
          word: meta.word,
          bg,
          ink,
        });
      }

      if (additions.length === 0) return;

      setTags((prevTags) => {
        return [...prevTags.slice(-(maxVisibleWords - additions.length)), ...additions];
      });
    }

    function onMouseMove(e: MouseEvent) { handleMove(e.clientX, e.clientY); }
    function onTouchMove(e: TouchEvent) {
      const touch = e.touches[0];
      if (touch) handleMove(touch.clientX, touch.clientY);
    }

    function onReset() {
      wordCursorRef.current = 0;
      idRef.current = 0;
      setTags([]);
    }

    function onClick(e: MouseEvent) {
      if (e.clientY < navHeightPx()) return;
      onReset();
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('click', onClick, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchstart', onReset, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onClick);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchstart', onReset);
    };
  }, []);

  return (
    <div className="mouse-tag-trail" aria-hidden="true">
      {tags.map((tag) => (
        <span
          key={tag.id}
          className="mouse-tag-trail__tag"
          style={
            {
              left: tag.x,
              top: tag.y,
              //backgroundColor: tag.bg,
              color: tag.bg,
              //color: tag.ink,
            } as CSSProperties
          }
          onAnimationEnd={(e) => {
            if (!e.animationName.includes('mouse-tag-trail-life')) return;
            setTags((prev) => {
              return prev.filter((item) => item.id !== tag.id);
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
