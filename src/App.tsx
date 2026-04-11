import { useState } from 'react';
import Nav, { type ViewMode } from './components/nav/Nav';
import Header from './components/header/Header';
import About from './components/about/About';
import Feed from './components/feed/Feed';
import Detail from './components/detail/Detail';
import MouseTagTrail from './components/mouseTagTrail/MouseTagTrail';
import { projects } from './data/projects';
import { articles } from './data/articles';
import type { ContentItem } from './data/content';
import './App.css';

function App() {
  const [view, setView] = useState<ViewMode | null>(null);
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);

  function handleViewChange(next: ViewMode) {
    setView((prev) => (prev === next ? null : next));
    setSelectedItem(null);
  }

  function handleClose() {
    setView(null);
    setSelectedItem(null);
  }

  const mouseTrailActive = view === null && selectedItem === null;

  return (
    <div className="app">
      <Nav view={view} onViewChange={handleViewChange} />

      <Header />

      {mouseTrailActive && <MouseTagTrail />}

      {view && (
        <div className="app__backdrop" onClick={handleClose} aria-hidden="true" />
      )}

      <div className={`app__overlay${view ? ' app__overlay--open' : ''}`} onClick={handleClose}>
        {view === 'about' && <About />}
        {view === 'feed' && <Feed projects={projects} articles={articles} onSelect={setSelectedItem} />}
      </div>

      {selectedItem && (
        <Detail item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
}

export default App;
