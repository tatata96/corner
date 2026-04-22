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

export const projects: Project[] = [];
