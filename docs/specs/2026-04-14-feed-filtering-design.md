# Feed Filtering Design

**Date:** 2026-04-14

## Overview

Add tag-based filtering to the Feed component. Users select toggle pills at the top of the feed to narrow visible items. Projects and articles each carry a `tags` array; active tags are AND-filtered against that array.

---

## Data Layer

### Changes to type interfaces

Both `Project` (src/data/projects.ts) and `Article` (src/data/articles.ts) gain a required field:

```ts
tags: string[];
```

The `ContentItem` union in `src/data/content.ts` requires no change.

### Default tags

- Every `Project` entry includes `"project"` as a tag by default.
- Every `Article` entry includes `"article"` as a tag by default.
- Additional custom tags may be added per item (e.g. `"video"`, `"sound"`, `"installation"`).

### Existing data entries

All existing entries in `projects.ts` and `articles.ts` must be updated to include a `tags` array. The project author will define the custom tags; `"project"` / `"article"` are always present.

---

## Component Architecture

### Filter state location

State lives in `Feed`. Feed already owns the items, so filtering is a natural extension with no need to lift state further.

### `FilterBar` component (new)

- **Location:** `src/components/filterBar/FilterBar.tsx`
- **Props:**
  - `tags: string[]` — full sorted, deduped list of all tags from current items
  - `activeTags: Set<string>` — currently selected tags
  - `onToggle: (tag: string) => void` — called when a pill is clicked
  - `onClear: () => void` — called when "clear" is clicked
- **Renders:** a row of toggle pills + a conditional "clear" affordance
- **No internal state**

### `Feed` changes

- Derive `allTags` from items: collect all tags, dedupe, sort alphabetically.
- Hold `activeTags: Set<string>` in state, starting empty.
- Render `<FilterBar>` above the card list.
- Filter items: when `activeTags` is non-empty, show only items where every active tag is present in `item.tags`. When empty, show all items.

---

## Filter Logic

```
activeTags = {} (empty)     → show all items
activeTags = {"video"}      → show items where tags includes "video"
activeTags = {"video","sound"} → show items where tags includes both "video" AND "sound"
```

Toggling an already-active tag removes it. Toggling an inactive tag adds it.

---

## Visual Design

### Layout

- `FilterBar` sits above the card list within the same `max-width: 680px` column.
- Gap between filter bar and first card matches existing feed gap: `6px`.

### Pills

- Small, typographic, minimal — consistent with the site's geometric aesthetic.
- **Inactive state:** border outline, transparent/muted background, dark text.
- **Active state:** filled dark accent background, light text.
- Smooth transition between states.

### Clear affordance

- A "clear" text link (or `×`) appears only when `activeTags` is non-empty.
- Clicking it resets `activeTags` to empty (show all).

---

## Files to Create / Modify

| File | Action |
|------|--------|
| `src/data/projects.ts` | Add `tags: string[]` to `Project` interface and all entries |
| `src/data/articles.ts` | Add `tags: string[]` to `Article` interface and all entries |
| `src/components/filterBar/FilterBar.tsx` | Create new component |
| `src/components/filterBar/filterBar.css` | Create styles |
| `src/components/feed/Feed.tsx` | Add filter state, tag derivation, filtering logic, render FilterBar |
| `src/components/feed/feed.css` | Minor layout additions for filter bar spacing |
