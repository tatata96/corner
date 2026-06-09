export type DumpAsset = {
  id: string;
  title: string;
  type: 'image' | 'video';
  src: string;
  alt?: string;
  description: string;
  tags: string[];
  x: number;
  y: number;
  width: number;
  className?: string;
};

export const dumpAssets: DumpAsset[] = [
  {
    id: 'briefnew',
    title: 'Brief Builder Motion',
    type: 'video',
    src: '/videos/briefnew.mov',
    description: 'motion prototype for a brief-building flow',
    tags: ['prototype', 'interface', 'motion'],
    x: 720,
    y: 260,
    width: 430,
  },
  {
    id: 'img1',
    title: 'Layered Interface Study',
    type: 'image',
    src: '/images/img1.jpg',
    alt: 'visual study',
    description: 'visual study exploring layered interface rhythm',
    tags: ['visual', 'interface'],
    x: 420,
    y: 360,
    width: 245,
  },
  {
    id: 'metrics',
    title: 'Metrics Comparison',
    type: 'image',
    src: '/videos/metrics.png',
    alt: 'metrics interface',
    description: 'metrics interface sketch with compact comparison states',
    tags: ['interface', 'data'],
    x: 1030,
    y: 470,
    width: 320,
  },
  {
    id: 'gallery-universe',
    title: 'Gallery Universe',
    type: 'video',
    src: '/videos/gallery-universe.mov',
    description: 'gallery navigation prototype with spatial browsing',
    tags: ['prototype', 'spatial', 'motion'],
    x: 560,
    y: 570,
    width: 455,
  },
  {
    id: 'train',
    title: 'Train Window Study',
    type: 'video',
    src: '/videos/train.mov',
    description: 'train window study in motion',
    tags: ['motion', 'film'],
    x: 250,
    y: 710,
    width: 510,
  },
  {
    id: 'brief2',
    title: 'Brief Controls Pass',
    type: 'video',
    src: '/videos/brief2.mov',
    description: 'alternate brief interaction pass with denser controls',
    tags: ['prototype', 'interface'],
    x: 1200,
    y: 230,
    width: 280,
  },
  {
    id: 'work',
    title: 'Work Surface Notes',
    type: 'video',
    src: '/videos/work.mov',
    description: 'work surface capture with interface notes',
    tags: ['process', 'interface'],
    x: 1390,
    y: 560,
    width: 340,
  },
  {
    id: 'img2',
    title: 'Exploratory Tool Surface',
    type: 'image',
    src: '/images/img2.png',
    alt: 'wide interface capture',
    description: 'wide interface capture for an exploratory tool surface',
    tags: ['visual', 'tool'],
    x: 880,
    y: 780,
    width: 390,
  },
  {
    id: 'istanbul',
    title: 'Istanbul Street Texture',
    type: 'video',
    src: '/videos/istanbul.mov',
    description: 'istanbul street texture and movement study',
    tags: ['film', 'motion'],
    x: 1260,
    y: 860,
    width: 360,
  },
];
