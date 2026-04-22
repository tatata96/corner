import makingComplexDataSimple from '../articles/making-complex-data.md?raw';
import exploringInterfacesBeyondTheFlatScreen from '../articles/exploring-interfaces-beyond-the-flat-screen.md?raw';
import slowDown from '../articles/slow-down.md?raw';

export interface Article {
  type: 'article';
  id: string;
  title: string;
  date: string;
  content: string;
  image?: string;
  video?: string;
  color: string;
  accent: string;
  tags: string[];
}

export const articles: Article[] = [
  {
    type: 'article',
    id: 'a03',
    title: 'Exploring interfaces beyond the flat screen',
    date: '2026-04-22',
    content: exploringInterfacesBeyondTheFlatScreen,
    video: '/videos/gallery-universe.mov',
    color: '#D7DBD2',
    accent: '#20251F',
    tags: ['FRONTEND', 'UX', 'AI', 'PROJECT', 'ARTICLE'],
  },
  {
    type: 'article',
    id: 'a01',
    title: 'Making Complex Data Simple',
    date: '2026-04-14',
    content: makingComplexDataSimple,
    image: '/videos/metrics.png',
    color: '#D7DBD2',
    accent: '#1f1f25ff',
    tags: ['ARTICLE', 'FRONTEND', 'PROCESS'],
  },
  {
    type: 'article',
    id: 'a02',
    title: 'Slow Down Before You Code',
    date: '2026-04-14',
    content: slowDown,
    color: '#D7DBD2',
    accent: '#20251F',
    tags: ['ARTICLE', 'PROCESS', 'AI'],
  },
];
