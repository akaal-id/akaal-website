import type { PortofolioItem } from "@/content/portofolio";

export interface ServiceData {
  hero: {
    eyebrow: string;
    logo: string;
    headline: string;
  };
  manifesto: {
    label: string;
    text: string;
  };
  capabilities: {
    title: string;
    description: string;
  }[];
  workflow: {
    step: string;
    title: string;
    description: string;
  }[];
  showcase: PortofolioItem[];
}

export const creativeData: ServiceData = {
  hero: {
    eyebrow: "Akaal Creative",
    logo: "/images/logo-creative.svg",
    headline: "The Akaalin Philosophy.",
  },

  manifesto: {
    label: "[ The Akaalin Approach ]",
    text: "We don\u2019t decorate \u2014 we engineer perception. Every pixel, every word, every strategic decision is a deliberate act of cultural positioning. The Akaalin methodology fuses raw creative instinct with data-driven precision, building brands that don\u2019t just exist in the market \u2014 they define it. We believe in the power of restraint, the elegance of purpose, and the relentless pursuit of work that refuses to be ignored.",
  },

  capabilities: [
    {
      title: "Social Media Management",
      description:
        "Strategic content ecosystems across platforms. We craft narratives that build communities, drive engagement, and transform followers into brand advocates through data-informed creative direction.",
    },
    {
      title: "Digital Branding",
      description:
        "End-to-end identity systems built for the digital age. From visual language to verbal identity, we create cohesive brand architectures that resonate across every touchpoint and scale with ambition.",
    },
    {
      title: "Content Production",
      description:
        "Editorial-grade visual and written content that commands scroll-stopping attention. Photography, motion, copywriting \u2014 all unified under a singular creative vision that elevates your brand above the noise.",
    },
    {
      title: "Campaign Strategy",
      description:
        "Performance-driven campaigns engineered for cultural impact. We blend creative storytelling with conversion architecture, turning brand moments into measurable market movements.",
    },
  ],

  workflow: [
    {
      step: "01",
      title: "Discovery",
      description:
        "Deep immersion into your brand DNA, audience psychology, and competitive landscape. We uncover the truths that others miss.",
    },
    {
      step: "02",
      title: "Strategy",
      description:
        "Translating insight into a battle-tested creative framework. Positioning, messaging architecture, and a roadmap designed for dominance.",
    },
    {
      step: "03",
      title: "Production",
      description:
        "Where vision meets craft. Our multidisciplinary team brings the strategy to life through design, content, and experiences that move people.",
    },
    {
      step: "04",
      title: "Scaling",
      description:
        "Growth isn\u2019t accidental \u2014 it\u2019s engineered. Ongoing optimization, content evolution, and strategic pivots that compound results over time.",
    },
  ],

  showcase: [
    {
      id: "hegira-brand",
      title: "Hegira \u2014 Brand Identity System",
      category: "creative",
      image: "/projects/photo-1.jpg",
      href: "#",
    },
    {
      id: "helix-campaign",
      title: "Helix \u2014 Visual Campaign Platform",
      category: "creative",
      image: "/projects/photo-2.jpg",
      href: "#",
    },
    {
      id: "atlas-social",
      title: "Atlas \u2014 Social Product Redesign",
      category: "creative",
      image: "/projects/photo-3.jpg",
      href: "#",
    },
    {
      id: "zenith-art",
      title: "Zenith \u2014 Art Direction Series",
      category: "creative",
      image: "/projects/photo-1.jpg",
      href: "#",
    },
  ],
};
