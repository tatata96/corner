import { useEffect } from 'react';
import type { Project } from '../../data/projects';
import './detail.css';

interface DetailProps {
  project: Project;
  onClose: () => void;
}

function Detail({ project, onClose }: DetailProps) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="detail-backdrop" onClick={onClose}>
      <aside className="detail-drawer" onClick={(e) => e.stopPropagation()}>

        <div className="detail-visual" style={{ background: project.color }}>
          <div className="detail-visual__diagonal" aria-hidden="true" />
          <div className="detail-visual__checker" aria-hidden="true" />
          <span className="detail-visual__num" aria-hidden="true">{project.id}</span>
          <button className="detail-close" onClick={onClose}>[ esc ]</button>
        </div>

        <div className="detail-body">
          <span className="detail-id">{project.id} —</span>
          <h2 className="detail-title">{project.title}</h2>
          <p className="detail-meta">{project.year} — {project.medium}</p>
          <div className="detail-rule" />
          <p className="detail-desc">{project.description}</p>
        </div>

      </aside>
    </div>
  );
}

export default Detail;
