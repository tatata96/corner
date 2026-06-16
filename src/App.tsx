import { useEffect, useState } from 'react';
import Nav, { type ViewMode } from './components/nav/Nav';
import Header from './components/header/Header';
import About from './components/about/About';
import PaleBlueDot from './components/paleBlueDot/PaleBlueDot';
import Feed from './components/feed/Feed';
import Works from './components/works/Works';
import Detail from './components/detail/Detail';
import Dump from './components/dump/Dump';
import MouseTagTrail from './components/mouseTagTrail/MouseTagTrail';
import { projects } from './data/projects';
import { articles } from './data/articles';
import type { ContentItem } from './data/content';
import './App.css';

const items: ContentItem[] = [...projects, ...articles];

const viewPaths: Record<ViewMode, string> = {
  about: '/about',
  feed: '/writing',
  works: '/works',
  'pale-blue-dot': '/pale-blue-dot',
  dump: '/playground',
};

function getItemPath(item: ContentItem) {
  return item.type === 'article' ? `/writing/${item.id}` : `/projects/${item.id}`;
}

function findItem(type: ContentItem['type'], id: string) {
  return items.find((item) => item.type === type && item.id === id) ?? null;
}

function getRouteFromLocation() {
  const segments = window.location.pathname.split('/').filter(Boolean);

  if (segments.length === 0) {
    return { view: null, selectedItem: null };
  }

  if (segments[0] === 'about') {
    return { view: 'about' as const, selectedItem: null };
  }

  if (segments[0] === 'pale-blue-dot') {
    return { view: 'pale-blue-dot' as const, selectedItem: null };
  }

  if (segments[0] === 'playground') {
    return { view: 'dump' as const, selectedItem: null };
  }

  if (segments[0] === 'writing') {
    const selectedItem = segments[1] ? findItem('article', segments[1]) : null;
    return { view: 'feed' as const, selectedItem };
  }

  if (segments[0] === 'works') {
    return { view: 'works' as const, selectedItem: null };
  }

  if (segments[0] === 'projects') {
    const selectedItem = segments[1] ? findItem('project', segments[1]) : null;
    return { view: 'works' as const, selectedItem };
  }

  return { view: null, selectedItem: null };
}

function pushRoute(path: string) {
  if (window.location.pathname !== path) {
    window.history.pushState(null, '', path);
  }
}

function App() {
  const initialRoute = getRouteFromLocation();
  const [view, setView] = useState<ViewMode | null>(initialRoute.view);
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(initialRoute.selectedItem);

  function applyRoute() {
    const route = getRouteFromLocation();
    setView(route.view);
    setSelectedItem(route.selectedItem);
  }

  function handleViewChange(next: ViewMode) {
    const nextView = view === next ? null : next;
    setView(nextView);
    setSelectedItem(null);
    pushRoute(nextView ? viewPaths[nextView] : '/');
  }

  function handleClose() {
    setView(null);
    setSelectedItem(null);
    pushRoute('/');
  }

  function handleOpenPaleBlueDot() {
    setView('pale-blue-dot');
    setSelectedItem(null);
    pushRoute(viewPaths['pale-blue-dot']);
  }

  function handleSelectItem(item: ContentItem) {
    setView(item.type === 'article' ? 'feed' : 'works');
    setSelectedItem(item);
    pushRoute(getItemPath(item));
  }

  function handleCloseDetail() {
    setSelectedItem(null);
    pushRoute(selectedItem?.type === 'project' ? viewPaths.works : viewPaths.feed);
  }

  const mouseTrailActive = view === null && selectedItem === null;

  useEffect(() => {
    window.addEventListener('popstate', applyRoute);
    return () => window.removeEventListener('popstate', applyRoute);
  }, []);

  useEffect(() => {
    const title = selectedItem
      ? `${selectedItem.title} | tamara kozok`
      : 'tamara kozok';

    document.title = title;
  }, [selectedItem]);

  useEffect(() => {
    const { documentElement, body } = document;
    const previousHtmlOverflow = documentElement.style.overflow;
    const previousBodyOverflow = body.style.overflow;

    if (mouseTrailActive) {
      documentElement.style.overflow = 'hidden';
      body.style.overflow = 'hidden';
    } else {
      documentElement.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
    }

    return () => {
      documentElement.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
    };
  }, [mouseTrailActive]);

  return (
    <div className="app">
      <Nav view={view} onViewChange={handleViewChange} onHome={handleClose} />

      <Header onOpenPaleBlueDot={handleOpenPaleBlueDot} />

      {mouseTrailActive && <MouseTagTrail />}

      {view && (
        <div className="app__backdrop" onClick={handleClose} aria-hidden="true" />
      )}

      <div className={`app__overlay${view ? ' app__overlay--open' : ''}`} onClick={handleClose}>
        {view === 'about' && <About />}
        {view === 'pale-blue-dot' && <PaleBlueDot />}
        {view === 'feed' && <Feed projects={[]} articles={articles} onSelect={handleSelectItem} />}
        {view === 'works' && <Works projects={projects} onSelect={handleSelectItem} />}
        {view === 'dump' && <Dump />}
      </div>

      {selectedItem && (
        <Detail item={selectedItem} onClose={handleCloseDetail} />
      )}
    </div>
  );
}

export default App;
