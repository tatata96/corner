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
