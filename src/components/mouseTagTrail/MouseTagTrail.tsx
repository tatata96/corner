import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { PALE_BLUE_DOT_TAGGED } from '../../data/paleBlueDot';
import './mouseTagTrail.css';

const BG_COLORS = ['#9ed8ff', '#5fb7ff', '#2f7ed8', '#174f9a', '#b7e3ff', '#6aa6e8', '#c8f0ff'];
//const BG_COLORS = ['#ffff00', '#00ff66', '#00aaff', '#ff00aa', '#ff8800', '#ccff00', '#aa66ff'];


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
        const colorIndex = meta.sentenceIndex % BG_COLORS.length;
        const bg = BG_COLORS[colorIndex];
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

    function onClick(e: MouseEvent) {
      if (e.clientY < navHeightPx()) return;
      wordCursorRef.current = 0;
      idRef.current = 0;
      setTags([]);
    }

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('click', onClick, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('click', onClick);
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
              backgroundColor: tag.bg,
              color: tag.ink,
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
