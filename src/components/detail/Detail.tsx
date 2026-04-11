import { useEffect } from 'react';
import type { ContentItem } from '../../data/content';
import './detail.css';

interface DetailProps {
  item: ContentItem;
  onClose: () => void;
}

function renderMarkdown(content: string) {
  return content.split('\n').map((line, index) => {
    const key = `${index}-${line}`;

    if (line.startsWith('# ')) {
      return <h3 className="detail-markdown__h1" key={key}>{line.slice(2)}</h3>;
    }

    if (line.startsWith('## ')) {
      return <h4 className="detail-markdown__h2" key={key}>{line.slice(3)}</h4>;
    }

    if (line.startsWith('- ')) {
      return <p className="detail-markdown__li" key={key}>{line.slice(2)}</p>;
    }

    if (line.trim() === '') {
      return null;
    }

    return <p className="detail-markdown__p" key={key}>{line}</p>;
  });
}

function Detail({ item, onClose }: DetailProps) {
  const visualImage = item.type === 'article' ? item.image : undefined;
  const hasVisual = item.type === 'project' || Boolean(visualImage);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="detail-backdrop" onClick={onClose}>
      <aside
        className={`detail-drawer${hasVisual ? '' : ' detail-drawer--no-visual'}`}
        onClick={(e) => e.stopPropagation()}
      >

        {hasVisual && (
          <div
            className="detail-visual"
            style={{
              background: visualImage ? `url(${visualImage}) center / cover` : item.color,
            }}
          >
            <div className="detail-visual__diagonal" aria-hidden="true" />
            <div className="detail-visual__checker" aria-hidden="true" />
            <span className="detail-visual__num" aria-hidden="true">{item.id}</span>
            <button className="detail-close" onClick={onClose}>[ esc ]</button>
          </div>
        )}

        {!hasVisual && (
          <button className="detail-close detail-close--floating" onClick={onClose}>[ esc ]</button>
        )}

        <div className="detail-body">
          <span className="detail-id">{item.id} — {item.type}</span>
          <h2 className="detail-title">{item.title}</h2>
          <p className="detail-meta">
            {item.type === 'article' ? item.date : `${item.year} — ${item.medium}`}
          </p>
          <div className="detail-rule" />
          {item.type === 'article' ? (
            <div className="detail-markdown">{renderMarkdown(item.content)}</div>
          ) : (
            <p className="detail-desc">{item.description}</p>
          )}
        </div>

      </aside>
    </div>
  );
}

export default Detail;
