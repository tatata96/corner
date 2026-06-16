export type DumpAsset = {
  id: string;
  title: string;
  type: "image" | "video" | "pdf";
  src: string;
  coverSrc?: string;
  alt?: string;
  mediaWidth?: number;
  mediaHeight?: number;
  pageCount?: number;
  collectionId?: string;
  description: string;
  tags: string[];
  x: number;
  y: number;
  width: number;
  className?: string;
};

export const dumpAssets: DumpAsset[] = [
  {
    id: "titresim",
    title: "Titresim",
    type: "pdf",
    src: "/pdf/titresim.pdf",
    coverSrc: "/images/titresim.png",
    alt: "Titresim cover",
    pageCount: 19,
    description:
      "Titresim is what I'm choosing to call a graphic novel. It's 12 pages long, written and illustrated entirely by hand, and began life as a stack of ink-covered A4 sheets. I printed ten copies for friends and family.",
    tags: ["posters", "paper", "digital"],
    x: 260,
    y: 230,
    width: 260,
  },
  {
    id: "briefnew",
    title: "Brief Builder Motion",
    type: "video",
    src: "/videos/briefnew.mov",
    collectionId: "brief-builder",
    description:
      "A landing page experiment for an agency website, built around Three.js interactions.\nThe page used falling interactive elements as a playful way to make the brief-building flow feel more physical.",
    tags: ["motion", "interfaces", "web", "digital"],
    x: 720,
    y: 260,
    width: 430,
  },
  {
    id: "gallery-universe",
    title: "Gallery Universe",
    type: "video",
    src: "/videos/gallery-universe.mov",
    description:
      "A package I built to explore a different way of browsing large collections. The idea, process, and implementation are documented here: [tamaraelf.xyz/writing/a03](https://tamaraelf.xyz/writing/a03).",
    tags: ["motion", "web", "digital"],
    x: 560,
    y: 570,
    width: 455,
  },
  {
    id: "train",
    title: "Ink to Motion",
    type: "video",
    src: "/videos/train.mov",
    description:
      "A hand-drawn poster that I later tried to bring to life in After Effects.",
    tags: ["video loops", "motion"],
    x: 250,
    y: 710,
    width: 510,
  },
  {
    id: "brief2",
    title: "Brief Builder Motion",
    type: "video",
    src: "/videos/brief2.mov",
    collectionId: "brief-builder",
    description:
      "A landing page experiment for an agency website, built around Three.js interactions.\nThe page used falling interactive elements as a playful way to make the brief-building flow feel more physical.",
    tags: ["motion", "interfaces", "web", "digital"],
    x: 1200,
    y: 230,
    width: 280,
  },
  {
    id: "work",
    title: "Where My Drawings Lived",
    type: "video",
    src: "/videos/work.mov",
    description:
      "I built this website years ago as a home for my gouache paintings, watercolor pieces, and drawings. The site itself is long gone, but this video remains-a small archive of the work and the interface that held it together.",
    tags: ["interfaces", "web", "digital", "paper"],
    x: 1390,
    y: 560,
    width: 340,
  },
  {
    id: "istanbul",
    title: "Istanbul Photography Project",
    type: "video",
    src: "/videos/istanbul.mov",
    description:
      "A landing page concept for a photography website, built around the colors and textures of Istanbul.",
    tags: ["video loops", "digital"],
    x: 1260,
    y: 860,
    width: 360,
  },
];
