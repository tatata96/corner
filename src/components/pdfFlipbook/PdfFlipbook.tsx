import { useState } from 'react';
import './pdfFlipbook.css';

interface PdfFlipbookProps {
  title: string;
  src: string;
  pageCount?: number;
}

function PdfFlipbook({ title, src, pageCount = 1 }: PdfFlipbookProps) {
  const [spreadStart, setSpreadStart] = useState(1);
  const [direction, setDirection] = useState<'previous' | 'next'>('next');
  const safePageCount = Math.max(pageCount, 1);
  const spreadPages = [spreadStart, spreadStart + 1].filter((page) => page <= safePageCount);
  const spreadLabel = spreadPages.length > 1 ? `${spreadPages[0]}-${spreadPages[1]}` : `${spreadPages[0]}`;

  function getPdfPageSrc(page: number) {
    return `${src}#page=${page}&toolbar=0&navpanes=0&scrollbar=0&view=Fit`;
  }

  function goToSpread(nextStart: number) {
    const boundedStart = Math.min(Math.max(nextStart, 1), safePageCount);

    if (boundedStart === spreadStart) {
      return;
    }

    setDirection(boundedStart > spreadStart ? 'next' : 'previous');
    setSpreadStart(boundedStart);
  }

  return (
    <div className="pdf-flipbook">
      <div className="pdf-flipbook__book" data-direction={direction}>
        {spreadPages.map((page) => (
          <div className="pdf-flipbook__sheet" key={page}>
            <iframe
              title={`${title} page ${page}`}
              src={getPdfPageSrc(page)}
              className="pdf-flipbook__page"
            />
          </div>
        ))}
      </div>

      <div className="pdf-flipbook__pager" aria-label={`${title} page navigation`}>
        <button
          type="button"
          onClick={() => goToSpread(spreadStart - 2)}
          disabled={spreadStart <= 1}
          aria-label="Previous pages"
        >
          <span aria-hidden="true">←</span>
        </button>
        <span>{spreadLabel} / {safePageCount}</span>
        <button
          type="button"
          onClick={() => goToSpread(spreadStart + 2)}
          disabled={spreadStart + 2 > safePageCount}
          aria-label="Next pages"
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}

export default PdfFlipbook;
