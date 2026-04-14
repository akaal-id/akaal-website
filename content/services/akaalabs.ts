import type { ServiceStaticContent } from "./creative";

export const akaalabsData: ServiceStaticContent = {
  hero: {
    eyebrow: "Akaalabs",
    logo: "/images/logo-labs.svg",
    headline: "Digital Architecture & Engineering.",
  },

  manifesto: {
    label: "[ Akaalabs ]",
    text:
      "We transform complex systems into seamless digital experiences. From high-performance landing pages to intricate operational applications, we engineer the digital foundation your business needs to scale with absolute precision.",
  },

  capabilities: [
    {
      title: "Custom Web Development",
      description:
        "Bespoke front-end and full-stack builds tailored to your product roadmap — performance budgets, accessibility, and maintainable codebases that ship fast and age well.",
    },
    {
      title: "E-Commerce Systems",
      description:
        "Checkout flows, catalog architecture, and integrations that convert — engineered for reliability during traffic spikes and clear operations for your team.",
    },
    {
      title: "UI/UX Design",
      description:
        "Research-led interfaces and design systems that align user goals with business outcomes — from wireframes to high-fidelity prototypes ready for engineering handoff.",
    },
    {
      title: "Corporate Landing Pages",
      description:
        "Campaign and brand landing experiences optimized for clarity and speed — structured content, motion where it matters, and analytics-ready instrumentation.",
    },
  ],

  workflow: [
    {
      step: "01",
      title: "Technical Discovery",
      description:
        "We map constraints, integrations, and success metrics — aligning stakeholders on scope, stack, and delivery risks before a single line of production code.",
    },
    {
      step: "02",
      title: "System Architecture",
      description:
        "Information architecture, data flow, and component boundaries are defined so the build scales — security, performance, and maintainability are designed in, not patched on.",
    },
    {
      step: "03",
      title: "Development & Integration",
      description:
        "Iterative implementation with continuous integration, code review, and environment parity — connecting APIs, auth, payments, and third-party services with confidence.",
    },
    {
      step: "04",
      title: "Deployment & Scale",
      description:
        "Hardened releases, observability, and rollout plans — so your product launches cleanly and stays fast as usage and feature depth grow.",
    },
  ],
};
