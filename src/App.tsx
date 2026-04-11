import { useState } from 'react';
import Nav, { type ViewMode } from './components/nav/Nav';
import Header from './components/header/Header';
import Grid from './components/grid/Grid';
import Feed from './components/feed/Feed';
import Detail from './components/detail/Detail';
import MouseTagTrail from './components/mouseTagTrail/MouseTagTrail';
import type { Project } from './data/projects';
import './App.css';

function App() {
  const [view, setView] = useState<ViewMode | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  function handleViewChange(next: ViewMode) {
    setView((prev) => (prev === next ? null : next));
    setSelectedProject(null);
  }

  function handleClose() {
    setView(null);
    setSelectedProject(null);
  }

  const mouseTrailActive = view === null && selectedProject === null;

  return (
    <div className="app">
      <Nav view={view} onViewChange={handleViewChange} />

      <Header />

      {mouseTrailActive && <MouseTagTrail />}

      {view && (
        <div className="app__backdrop" onClick={handleClose} aria-hidden="true" />
      )}

      <div className={`app__overlay${view ? ' app__overlay--open' : ''}`} onClick={handleClose}>
        {view === 'grid' && <Grid onSelect={setSelectedProject} />}
        {view === 'feed' && <Feed onSelect={setSelectedProject} />}
      </div>

      {selectedProject && (
        <Detail project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </div>
  );
}

export default App;
