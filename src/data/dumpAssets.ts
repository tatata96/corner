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
    description: "PDF publication for Titresim.",
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
      "**Motion prototype** for a [brief-building flow](https://example.com).\n- supports multiple lines\n- supports simple list items",
    tags: ["motion", "interfaces", "web"],
    x: 720,
    y: 260,
    width: 430,
  },
  {
    id: "gallery-universe",
    title: "Gallery Universe",
    type: "video",
    src: "/videos/gallery-universe.mov",
    description: "gallery navigation prototype with spatial browsing",
    tags: ["motion", "web", "digital"],
    x: 560,
    y: 570,
    width: 455,
  },
  {
    id: "train",
    title: "Train Window Study",
    type: "video",
    src: "/videos/train.mov",
    description: "train window study in motion",
    tags: ["video loops", "motion"],
    x: 250,
    y: 710,
    width: 510,
  },
  {
    id: "brief2",
    title: "Brief Controls Pass",
    type: "video",
    src: "/videos/brief2.mov",
    collectionId: "brief-builder",
    description: "alternate brief interaction pass with denser controls",
    tags: ["interfaces", "digital", "web"],
    x: 1200,
    y: 230,
    width: 280,
  },
  {
    id: "work",
    title: "Work Surface Notes",
    type: "video",
    src: "/videos/work.mov",
    description: "work surface capture with interface notes",
    tags: ["interfaces", "paper", "digital"],
    x: 1390,
    y: 560,
    width: 340,
  },
  {
    id: "istanbul",
    title: "Istanbul Street Texture",
    type: "video",
    src: "/videos/istanbul.mov",
    description: "istanbul street texture and movement study",
    tags: ["video loops", "digital"],
    x: 1260,
    y: 860,
    width: 360,
  },
];
