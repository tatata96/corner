# Feed Filtering Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add manual tag-based filtering to the Feed — toggle pills at the top narrow the item list using AND logic.

**Architecture:** `tags: string[]` is added to both data types; `Feed` owns filter state and derives the available tag list from its items; a new stateless `FilterBar` component renders the pills and clear affordance above the card list.

**Tech Stack:** React 19, TypeScript, Vite, CSS (no test framework — verify with `tsc -b` and the dev server)

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `src/data/projects.ts` | Modify | Add `tags` to `Project` interface + all 6 entries |
| `src/data/articles.ts` | Modify | Add `tags` to `Article` interface + all 1 entry |
| `src/components/filterBar/FilterBar.tsx` | Create | Stateless pill row + clear affordance |
| `src/components/filterBar/filterBar.css` | Create | Pill visual styles (inactive / active states) |
| `src/components/feed/Feed.tsx` | Modify | Filter state, tag derivation, filtering logic, render FilterBar |
| `src/components/feed/feed.css` | Modify | Gap between filter bar and card list |

---

### Task 1: Add `tags` to the `Project` type and data

**Files:**
- Modify: `src/data/projects.ts`

- [ ] **Step 1: Update the `Project` interface and all entries**

Replace the entire file content with:

```ts
export interface Project {
  type: 'project';
  id: string;
  title: string;
  year: string;
  medium: string;
  description: string;
  color: string;
  accent: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    type: 'project',
    id: '01',
    title: 'Signal / Noise',
    year: '2024',
    medium: 'video, text, sound',
    description: 'An investigation into the perceptual boundaries between structured communication and entropic dissolution.',
    color: '#D4CFC8',
    accent: '#2A2522',
    tags: ['project', 'video', 'text', 'sound'],
  },
  {
    type: 'project',
    id: '02',
    title: 'Surface Tension',
    year: '2024',
    medium: 'installation, performance',
    description: 'Mapping the liminal space between physical presence and mediated representation across three registers.',
    color: '#C9C4BB',
    accent: '#3B3530',
    tags: ['project', 'installation', 'performance'],
  },
  {
    type: 'project',
    id: '03',
    title: 'After the Archive',
    year: '2023',
    medium: 'print, digital, lecture',
    description: 'Interrogating the politics of preservation and the violence inherent in acts of documentation.',
    color: '#BEB8AE',
    accent: '#1E1A17',
    tags: ['project', 'print', 'digital', 'lecture'],
  },
  {
    type: 'project',
    id: '04',
    title: 'Feedback Loop',
    year: '2023',
    medium: 'video, sculpture',
    description: 'A closed system in which input and output become indistinguishable — form collapses into process.',
    color: '#D8D2C9',
    accent: '#312C28',
    tags: ['project', 'video', 'sculpture'],
  },
  {
    type: 'project',
    id: '05',
    title: 'Threshold Studies',
    year: '2023',
    medium: 'photography, text',
    description: 'Serial documentation of transitional states — thresholds where one medium begins to speak in another\'s register.',
    color: '#C2BDB4',
    accent: '#252220',
    tags: ['project', 'photography', 'text'],
  },
  {
    type: 'project',
    id: '06',
    title: 'Common Ground',
    year: '2022',
    medium: 'performance, radio',
    description: 'Simultaneous transmission across frequency and physical space, testing the coherence of collective listening.',
    color: '#CCC7BE',
    accent: '#1A1714',
    tags: ['project', 'performance', 'radio'],
  },
];
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /Users/tamara/Desktop/new/corner && npx tsc -b --noEmit
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/data/projects.ts
git commit -m "feat: add tags to Project type and entries"
```

---

### Task 2: Add `tags` to the `Article` type and data

**Files:**
- Modify: `src/data/articles.ts`

- [ ] **Step 1: Update the `Article` interface and all entries**

Replace the entire file content with:

```ts
import notesOnListening from '../articles/notes-on-listening.md?raw';

export interface Article {
  type: 'article';
  id: string;
  title: string;
  date: string;
  content: string;
  image?: string;
  color: string;
  accent: string;
  tags: string[];
}

export const articles: Article[] = [
  {
    type: 'article',
    id: 'a01',
    title: 'Notes on Listening',
    date: '2026-04-11',
    content: notesOnListening,
    color: '#D7DBD2',
    accent: '#20251F',
    tags: ['article'],
  },
];
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /Users/tamara/Desktop/new/corner && npx tsc -b --noEmit
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/data/articles.ts
git commit -m "feat: add tags to Article type and entry"
```

---

### Task 3: Create the `FilterBar` component

**Files:**
- Create: `src/components/filterBar/FilterBar.tsx`
- Create: `src/components/filterBar/filterBar.css`

- [ ] **Step 1: Create the CSS file**

Create `src/components/filterBar/filterBar.css`:

```css
.filter-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  padding-bottom: 2px;
}

.filter-bar__pill {
  font-family: var(--font-mono);
  font-size: 0.58rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 3px 8px;
  border: 1px solid rgba(0, 0, 0, 0.85);
  background: transparent;
  color: var(--ink);
  cursor: pointer;
  transition: background 0.12s ease, color 0.12s ease;
  line-height: 1.4;
}

.filter-bar__pill:hover {
  background: rgba(0, 0, 0, 0.06);
}

.filter-bar__pill--active {
  background: rgba(0, 0, 0, 0.85);
  color: #ffffff;
}

.filter-bar__pill--active:hover {
  background: rgba(0, 0, 0, 0.75);
}

.filter-bar__clear {
  font-family: var(--font-mono);
  font-size: 0.58rem;
  font-weight: 400;
  color: var(--ink-muted);
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 2px;
  margin-left: 2px;
  background: none;
  border: none;
  padding: 0;
}

.filter-bar__clear:hover {
  color: var(--ink);
}
```

- [ ] **Step 2: Create the component file**

Create `src/components/filterBar/FilterBar.tsx`:

```tsx
import './filterBar.css';

interface FilterBarProps {
  tags: string[];
  activeTags: Set<string>;
  onToggle: (tag: string) => void;
  onClear: () => void;
}

function FilterBar({ tags, activeTags, onToggle, onClear }: FilterBarProps) {
  return (
    <div className="filter-bar">
      {tags.map((tag) => (
        <button
          key={tag}
          className={`filter-bar__pill${activeTags.has(tag) ? ' filter-bar__pill--active' : ''}`}
          onClick={() => onToggle(tag)}
          aria-pressed={activeTags.has(tag)}
        >
          {tag}
        </button>
      ))}
      {activeTags.size > 0 && (
        <button className="filter-bar__clear" onClick={onClear}>
          clear
        </button>
      )}
    </div>
  );
}

export default FilterBar;
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
cd /Users/tamara/Desktop/new/corner && npx tsc -b --noEmit
```

Expected: no errors

- [ ] **Step 4: Commit**

```bash
git add src/components/filterBar/FilterBar.tsx src/components/filterBar/filterBar.css
git commit -m "feat: add FilterBar component"
```

---

### Task 4: Wire filtering into `Feed`

**Files:**
- Modify: `src/components/feed/Feed.tsx`
- Modify: `src/components/feed/feed.css`

- [ ] **Step 1: Update `feed.css` to add gap between filter bar and cards**

Replace the entire file content with:

```css
.feed-view {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 6px;
  max-width: 680px;
  margin: 0 auto;
}

.feed-view__cards {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
```

- [ ] **Step 2: Update `Feed.tsx` with filter state and logic**

Replace the entire file content with:

```tsx
import { useState } from 'react';
import type { Article } from '../../data/articles';
import type { ContentItem } from '../../data/content';
import type { Project } from '../../data/projects';
import FilterBar from '../filterBar/FilterBar';
import ProjectCard from '../projectCard/ProjectCard';
import './feed.css';

interface FeedProps {
  projects: Project[];
  articles: Article[];
  onSelect: (item: ContentItem) => void;
}

function Feed({ projects, articles, onSelect }: FeedProps) {
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set());

  const items: ContentItem[] = [...projects, ...articles];

  const allTags = Array.from(
    new Set(items.flatMap((item) => item.tags))
  ).sort();

  const visibleItems =
    activeTags.size === 0
      ? items
      : items.filter((item) =>
          Array.from(activeTags).every((tag) => item.tags.includes(tag))
        );

  function handleToggle(tag: string) {
    setActiveTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) {
        next.delete(tag);
      } else {
        next.add(tag);
      }
      return next;
    });
  }

  function handleClear() {
    setActiveTags(new Set());
  }

  return (
    <section className="feed-view">
      <FilterBar
        tags={allTags}
        activeTags={activeTags}
        onToggle={handleToggle}
        onClear={handleClear}
      />
      <div className="feed-view__cards">
        {visibleItems.map((item) => (
          <ProjectCard key={item.id} item={item} variant="feed" onSelect={onSelect} />
        ))}
      </div>
    </section>
  );
}

export default Feed;
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
cd /Users/tamara/Desktop/new/corner && npx tsc -b --noEmit
```

Expected: no errors

- [ ] **Step 4: Start the dev server and verify manually**

```bash
cd /Users/tamara/Desktop/new/corner && npm run dev
```

Open the feed view and verify:
- Filter pills appear above the card list
- Each pill label matches tags from the data
- Clicking a pill activates it (dark fill)
- Clicking an active pill deactivates it
- "clear" link appears only when a tag is active, clicking resets all
- With two tags active, only items matching BOTH are shown
- With no tags active, all items are shown

- [ ] **Step 5: Commit**

```bash
git add src/components/feed/Feed.tsx src/components/feed/feed.css
git commit -m "feat: wire tag filtering into Feed"
```
