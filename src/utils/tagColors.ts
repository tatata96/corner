import { PALE_BLUE_DOT_COLOR_GROUPS } from '../data/paleBlueDot';

export function createTagColorMap(tags: string[]) {
  return new Map(
    tags.map((tag, index) => [
      tag,
      PALE_BLUE_DOT_COLOR_GROUPS[index % PALE_BLUE_DOT_COLOR_GROUPS.length],
    ])
  );
}

export function getItemTagColor(
  itemTags: string[],
  tagColorMap: Map<string, string>,
  activeTags?: Set<string>
) {
  const activeTag = activeTags
    ? itemTags.find((tag) => activeTags.has(tag))
    : undefined;
  const tag = activeTag ?? itemTags[0];

  return tagColorMap.get(tag) ?? PALE_BLUE_DOT_COLOR_GROUPS[0];
}
