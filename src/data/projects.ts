export interface Project {
  type: "project";
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
  "/images/algo/alg.png",
  "/images/algo/algo1.webp",
  "/images/algo/algo2.webp",
  "/images/algo/alg3.png",
  "/images/algo/tiny.png",
];

const brikImages = [
  "/brik/IMG_4479.PNG",
  "/brik/IMG_4480.PNG",
  "/brik/IMG_4481.PNG",
  "/brik/brik.jpeg",
  "/brik/Screenshot%202026-06-16%20at%2014.24.26.png",
];

const photifyImages = [
  "/photify/phot1.jpeg",
  "/photify/phot2.jpeg",
  "/photify/phot3.jpeg",
  "/photify/phot4.jpeg",
  "/photify/phot5.jpg",
];

export const projects: Project[] = [
  {
    type: "project",
    id: "photify",
    title: "Photify",
    year: "2024",
    medium: "product design, frontend development, backend development, product ownership",
    description:
      "A photo-sharing app with AI face recognition that I owned from start to finish, leading the design and building both the frontend and backend experience.",
    links: [
      {
        label: "Photify",
        href: "https://www.photify.studio/",
      },
    ],
    image: photifyImages[0],
    images: photifyImages,
    color: "#F3EDE6",
    accent: "#2E241E",
    tags: ["WORK", "PRODUCT", "FULL STACK", "AI"],
  },
  {
    type: "project",
    id: "brik-application",
    title: "Brik",
    year: "2024–2025",
    medium: "React Native, Expo, AI learning product, mobile development",
    description:
      "Built key features for a React Native learning app, including AI-assisted course experiences, progress tracking, and gamification systems, while helping shape the product from early design to release.",
    links: [
      {
        label: "Brik",
        href: "https://onbrik.com/",
      },
    ],
    image: brikImages[0],
    images: brikImages,
    color: "#F1F4EA",
    accent: "#17251D",
    tags: ["WORK", "MOBILE", "REACT NATIVE", "AI"],
  },
  {
    type: "project",
    id: "algorand-projects",
    title: "Algorand",
    year: "2021–2023",
    medium: "frontend development, wallet integrations, DeFi & Web3 products",
    description:
      "Projects I contributed to while working as part of the frontend team at Hipo Labs, where my DeFi and Web3 experience was shaped through products used by developers, governors, and traders alike across the Algorand ecosystem.",
    links: [
      {
        label: "Algorand Developer Portal",
        href: "https://developer.algorand.org/",
      },
      {
        label: "Algorand Governance Platform",
        href: "https://governance.algorand.foundation/",
      },
      {
        label: "Algorand Metrics Dashboard",
        href: "https://metrics.algorand.org/",
      },
      {
        label: "Tinyman DEX",
        href: "https://app.tinyman.org/",
      },
    ],
    image: algorandImages[0],
    images: algorandImages,
    color: "#D8E9F2",
    accent: "#0F3B57",
    tags: ["WORK", "WEB3", "VISUAL DESIGN", "INTERFACE"],
  },
];
