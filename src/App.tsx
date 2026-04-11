import { useState } from 'react';
import Nav, { type ViewMode } from './components/nav/Nav';
import Header from './components/header/Header';
import Grid from './components/grid/Grid';
import Feed from './components/feed/Feed';
import './App.css';

function App() {
  const [view, setView] = useState<ViewMode | null>(null);

  function handleViewChange(next: ViewMode) {
    setView((prev) => (prev === next ? null : next));
  }

  function handleClose() {
    setView(null);
  }

  return (
    <div className="app">
      <Nav view={view} onViewChange={handleViewChange} />

      <Header />

      {view && (
        <div className="app__backdrop" onClick={handleClose} aria-hidden="true" />
      )}

      <div className={`app__overlay${view ? ' app__overlay--open' : ''}`}>
        {view === 'grid' && <Grid />}
        {view === 'feed' && <Feed />}
      </div>
    </div>
  );
}

export default App;
