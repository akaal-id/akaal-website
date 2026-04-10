export type PortofolioCategory = "creative" | "labs" | "studio";

export type PortofolioItem = {
  id: string;
  title: string;
  category: PortofolioCategory;
  image: string;
  href: string;
};

export const PORTOFOLIO_PROJECTS: PortofolioItem[] = [
  {
    id: "hegira",
    title: "Hegira - Brand Identity System",
    category: "creative",
    image: "/projects/photo-1.jpg",
    href: "#",
  },
  {
    id: "akaal-web",
    title: "AKAAL - WebGL Experience",
    category: "labs",
    image: "/projects/photo-2.jpg",
    href: "#",
  },
  {
    id: "traveloka",
    title: "Traveloka - Design System",
    category: "studio",
    image: "/projects/photo-3.jpg",
    href: "#",
  },
  {
    id: "helix",
    title: "Helix - Visual Campaign Platform",
    category: "creative",
    image: "/projects/photo-2.jpg",
    href: "#",
  },
  {
    id: "nexa",
    title: "Nexa - Commerce Experience",
    category: "labs",
    image: "/projects/photo-3.jpg",
    href: "#",
  },
  {
    id: "obsidian",
    title: "Obsidian - Product Website",
    category: "studio",
    image: "/projects/photo-1.jpg",
    href: "#",
  },
  {
    id: "atlas",
    title: "Atlas - Social Product Redesign",
    category: "creative",
    image: "/projects/photo-2.jpg",
    href: "#",
  },
  {
    id: "zenith",
    title: "Zenith - Art Direction Series",
    category: "studio",
    image: "/projects/photo-3.jpg",
    href: "#",
  },
];
