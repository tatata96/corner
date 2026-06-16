export interface Project {
  type: 'project';
  id: string;
  title: string;
  year: string;
  medium: string;
  description: string;
  links?: {
    label: string;
    href: string;
  }[];
  image?: string;
  images?: string[];
  color: string;
  accent: string;
  tags: string[];
}

const algorandImages = [
  '/images/algo/alg.png',
  '/images/algo/algo1.webp',
  '/images/algo/algo2.webp',
  '/images/algo/alg3.png',
  '/images/algo/tiny.png',
];

export const projects: Project[] = [
  {
    type: 'project',
    id: 'algorand-projects',
    title: 'Algorand Projects',
    year: '2021–2023',
    medium: 'frontend development, wallet integrations, DeFi & Web3 products',
    description:
      'Projects I contributed to while working as part of the frontend team at Hipo Labs, where my DeFi and Web3 experience was shaped through products used by developers, governors, and traders alike across the Algorand ecosystem.',
    links: [
      {
        label: 'Algorand Developer Portal',
        href: 'https://developer.algorand.org/',
      },
      {
        label: 'Algorand Governance Platform',
        href: 'https://governance.algorand.foundation/',
      },
      {
        label: 'Algorand Metrics Dashboard',
        href: 'https://metrics.algorand.org/',
      },
      {
        label: 'Tinyman DEX',
        href: 'https://app.tinyman.org/',
      },
    ],
    image: algorandImages[0],
    images: algorandImages,
    color: '#D8E9F2',
    accent: '#0F3B57',
    tags: ['WORK', 'WEB3', 'VISUAL DESIGN', 'INTERFACE'],
  },
];
