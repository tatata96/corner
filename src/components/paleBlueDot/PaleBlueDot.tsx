import { type CSSProperties } from 'react';
import {
  PALE_BLUE_DOT_COLOR_GROUPS,
  PALE_BLUE_DOT_TAGGED,
  PALE_BLUE_DOT_TEXT,
} from '../../data/paleBlueDot';
import './paleBlueDot.css';

const POEM_PARAGRAPHS = PALE_BLUE_DOT_TEXT.split(/\n\n+/).map((paragraph) => {
  return paragraph.split(/\s+/).filter(Boolean);
});

const COLORIZED_PARAGRAPHS = POEM_PARAGRAPHS.map((paragraph, paragraphIndex) => {
  const previousWordCount = POEM_PARAGRAPHS.slice(0, paragraphIndex).reduce((sum, words) => {
    return sum + words.length;
  }, 0);

  return paragraph.map((word, localWordIndex) => {
    const meta = PALE_BLUE_DOT_TAGGED[previousWordCount + localWordIndex];
    const color = PALE_BLUE_DOT_COLOR_GROUPS[
      meta.colorGroupIndex % PALE_BLUE_DOT_COLOR_GROUPS.length
    ];

    return { color, word };
  });
});

function PaleBlueDot() {
  return (
    <section className="pale-blue-dot-view">
      <article className="pale-blue-dot-panel" onClick={(e) => e.stopPropagation()}>
        <div className="pale-blue-dot-panel__diagonal" aria-hidden="true" />

        <span className="pale-blue-dot-panel__label">pale blue dot</span>
        <div className="pale-blue-dot-panel__body">
          {COLORIZED_PARAGRAPHS.map((paragraph, paragraphIndex) => (
            <p key={paragraphIndex}>
              {paragraph.map(({ color, word }, wordIndex) => (
                <span
                  key={`${word}-${wordIndex}`}
                  className="pale-blue-dot-panel__word"
                  style={{ color } as CSSProperties}
                >
                  {word}{' '}
                </span>
              ))}
            </p>
          ))}
        </div>
      </article>
    </section>
  );
}

export default PaleBlueDot;
