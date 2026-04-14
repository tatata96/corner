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
    tags: ['project', 'UX', 'Process'],
  },
];
