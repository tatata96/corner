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
  },
];
