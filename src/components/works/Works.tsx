import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { Project } from '../../data/projects';
import './works.css';

interface WorksProps {
  projects: Project[];
}

function Works({ projects }: WorksProps) {
  const [expandedImage, setExpandedImage] = useState<{ src: string; alt: string } | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!expandedImage) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setExpandedImage(null);
      if (event.key === 'Tab') {
        event.preventDefault();
        closeButtonRef.current?.focus();
      }
    };
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [expandedImage]);

  return (
    <section className="works-view" onClick={(e) => e.stopPropagation()}>
      {projects.length === 0 ? (
        <div className="works-view__empty">works will live here</div>
      ) : (
        <div className="works-view__rows">
          {projects.map((project, i) => (
            <article key={project.id} className="work-row">
              <div className="work-row__index">{String(i + 1).padStart(2, '0')}</div>

              <div className="work-row__main">
                <h2 className="work-row__title">
                  {project.links?.[0] ? (
                    <a
                      className="work-row__title-link"
                      href={project.links[0].href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {project.title}
                    </a>
                  ) : project.title}
                </h2>
                <p className="work-row__description">{project.description}</p>
                <div className="work-row__meta">{project.year} / {project.medium}</div>
                {project.links && project.links.length > 0 && (
                  <div className="work-row__links" aria-label={`${project.title} links`}>
                    {project.links.map((link) => (
                      <a
                        key={link.href}
                        className="work-row__link"
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span>{link.label}</span>
                        <span className="work-row__link-arrow" aria-hidden="true">↗</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {project.images && project.images.length > 0 && (
                <div className="work-row__images" aria-label={`${project.title} images`}>
                  {project.images.map((image, imageIndex) => (
                    <button
                      key={image}
                      className="work-row__image-button"
                      type="button"
                      onClick={() => setExpandedImage({
                        src: image,
                        alt: `${project.title} image ${imageIndex + 1}`,
                      })}
                      aria-label={`Expand ${project.title} image ${imageIndex + 1}`}
                    >
                      <img src={image} alt="" loading="lazy" />
                    </button>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      )}

      {expandedImage && createPortal(
        <div
          className="work-image-viewer"
          role="dialog"
          aria-modal="true"
          aria-label="Expanded project image"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setExpandedImage(null);
          }}
        >
          <button
            ref={closeButtonRef}
            className="work-image-viewer__close"
            type="button"
            onClick={() => setExpandedImage(null)}
          >
            Close
          </button>
          <img src={expandedImage.src} alt={expandedImage.alt} />
        </div>,
        document.body,
      )}
    </section>
  );
}

export default Works;
