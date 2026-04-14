import makingComplexDataSimple from '../articles/making-complex-data.md?raw';
import slowDown from '../articles/slow-down.md?raw';

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
    title: 'Making Complex Data Simple',
    date: '2026-04-14',
    content: makingComplexDataSimple,
    color: '#D7DBD2',
    accent: '#1f1f25ff',
    tags: ['article', 'Frontend', 'Process'],
  },
  {
    type: 'article',
    id: 'a02',
    title: 'Slow Down Before You Code',
    date: '2026-04-14',
    content: slowDown,
    color: '#D7DBD2',
    accent: '#20251F',
    tags: ['article', 'Process','ai'],
  },
];
