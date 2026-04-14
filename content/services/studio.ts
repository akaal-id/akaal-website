import type { ServiceStaticContent } from "./creative";

export const studioData: ServiceStaticContent = {
  hero: {
    eyebrow: "Akaal Studio",
    logo: "/images/logo-lens.svg",
    headline: "Pure Visual Fidelity.",
  },

  manifesto: {
    label: "[ Akaal Studio ]",
    text:
      "We believe in the power of visual truth. Through high-fidelity image capture and human-centric storytelling, we craft cinematic visuals that communicate the absolute highest quality of your brand's narrative.",
  },

  capabilities: [
    {
      title: "Product Photography",
      description:
        "Lighting, composition, and color discipline that make products feel tangible — from hero stills to modular sets built for campaigns and catalogs.",
    },
    {
      title: "Cinematic Videography",
      description:
        "Motion that breathes — pacing, lensing, and sound design aligned to a single creative direction, whether for launch films, social cuts, or long-form brand newsroom.",
    },
    {
      title: "Visual Storytelling",
      description:
        "Narrative arcs that connect emotion to offer — treatments, storyboards, and shot plans that translate strategy into frames people remember.",
    },
    {
      title: "Editorial & Lookbooks",
      description:
        "Cohesive visual languages for seasonal drops and print — art direction, styling coordination, and post that keeps every frame on-brand.",
    },
  ],

  workflow: [
    {
      step: "01",
      title: "Visual Strategy",
      description:
        "We align references, tone, and deliverables with your positioning — defining the look, formats, and production requirements before cameras roll.",
    },
    {
      step: "02",
      title: "Pre-Production",
      description:
        "Shot lists, locations, talent, and gear plans — schedules and contingencies so the shoot day stays focused on performance, not firefighting.",
    },
    {
      step: "03",
      title: "The Shoot",
      description:
        "On-set direction with disciplined capture — consistent exposure, purposeful coverage, and the flexibility to chase the unexpected when it elevates the story.",
    },
    {
      step: "04",
      title: "Post-Production",
      description:
        "Edit, grade, sound, and delivery specs — polished outputs for every channel, with versioning and masters your team can reuse with confidence.",
    },
  ],
};
