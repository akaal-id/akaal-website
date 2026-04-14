export const ABOUT_LABEL = "[about]";

/** Lead segment (word-scrub animation); no HTML. */
export const ABOUT_STATEMENT_LEAD =
  "We are a collective of strategists, designers, and engineers who build digital experiences that move culture forward. We don't just make brands look good —";

/** Emphasized closing segment (stronger weight in CSS + same scrub). */
export const ABOUT_STATEMENT_EMPHASIS = "we make them unforgettable.";

export const ABOUT_STATEMENT_FULL = `${ABOUT_STATEMENT_LEAD} ${ABOUT_STATEMENT_EMPHASIS}`;

export const ABOUT_CARD_IMAGE = "/images/about-card.png";

export const ABOUT_PILLARS = [
  {
    title: "We're a Proven Partner",
    sub: "Over 100 brands have successfully grown with us, building trust through consistent results and long-term partnerships.",
  },
  {
    title: "We Make Their Brand Speak",
    sub: "Transforming brands into powerful and influential voices that resonate with audiences and drive meaningful connections.",
  },
  {
    title: "We Create Loyalists",
    sub: "Building emotional connections that create loyal customers who become advocates for your brand and drive long-term growth.",
  },
  {
    title: "We Increase Value",
    sub: "Optimizing strategies to enhance competitiveness and value, delivering impactful measurable results.",
  },
] as const;

/** Build span markup for GSAP word scrub (static copy only). */
export function buildAboutStatementInnerHTML(
  wordClass: string,
  emphasisWordClass: string
): string {
  const leadWords = ABOUT_STATEMENT_LEAD.trim().split(/\s+/).filter(Boolean);
  const emphWords = ABOUT_STATEMENT_EMPHASIS.trim().split(/\s+/).filter(Boolean);
  const leadHtml = leadWords
    .map((w) => `<span class="${wordClass}">${escapeText(w)} </span>`)
    .join("");
  const emphHtml = emphWords
    .map(
      (w) =>
        `<span class="${wordClass} ${emphasisWordClass}">${escapeText(w)} </span>`
    )
    .join("");
  return leadHtml + emphHtml;
}

function escapeText(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// --- About page: intro, vision/mission, teaser, journeys ---

export const INTRO_IMAGE = "/images/studio.png";

export const ABOUT_INTRO_PILL = "About AKAAL";

export const ABOUT_INTRO_HEADLINE_BEFORE =
  "Be the Game Changer with One Stop Digi-Solution,";

export const ABOUT_INTRO_HEADLINE_GRADIENT =
  "driving innovation and transformation.";

export const ABOUT_INTRO_BODY =
  "AKAAL is an innovative partner ready to bring businesses into the digital era with cutting-edge technology. Based in Jakarta, we provide the best solutions in digital marketing, creative branding, IT solutions, and AI automation, custom-designed to meet each client's unique needs. As a strategic partner, we are committed to driving digital success through expertise, creativity, and the latest technology.";

export const VISION_BG_IMAGE = "/images/vision-bg.png";

export const ABOUT_VISION_PILL = "Our Vision";

export const ABOUT_VISION_TEXT =
  "To build a collaborative, integrated, and innovative digital ecosystem that creates a wider positive impact.";

export const ABOUT_MISSION_PILL = "Our Mission";

export const ABOUT_MISSION_LEAD =
  "We are committed to delivering innovative digital solutions, fostering strategic partnerships, and empowering businesses through technology and creativity.";

export const ABOUT_MISSION_ITEMS = [
  {
    title: "Creating Digital Solutions",
    sub: "Developing technologies that align with the evolving needs of businesses, industries, and communities.",
  },
  {
    title: "Building Long-Term Partnerships",
    sub: "Providing excellent services to establish sustainable business relationships and connections.",
  },
  {
    title: "Becoming a Strategic Partner",
    sub: "Leading digital transformation to boost productivity and strengthen business competitiveness.",
  },
  {
    title: "Innovating for Social Impact",
    sub: "Designing applications that support entrepreneurship growth and address social challenges.",
  },
  {
    title: "Integrating Sales & Marketing",
    sub: "Optimizing digital strategies with precise data-driven insights for more effective results.",
  },
] as const;

export const SERVICES_TEASER_PILL = "Our Services";

export const SERVICES_TEASER_HEADLINE = "Comprehensive Digital Solutions";

export const SERVICES_TEASER_HEADLINE_ACCENT = "for Your Business";

export const SERVICES_TEASER_BODY =
  "Technology-driven solutions designed to strengthen your business digital foundation, optimize operations, and create captivating visual experiences that drive growth and engagement.";

export const SERVICES_TEASER_HREF = "/#services";

export const SERVICES_TEASER_CTA = "Explore services";

export const JOURNEYS_PILL = "How AKAAL Handle Your Brand";

export const JOURNEYS_HEADLINE = "Crafting Experiences,";

export const JOURNEYS_HEADLINE_ACCENT = "Empowering Impact.";

export const JOURNEYS_INTRO =
  "AKAAL helps brands grow through creative journeys, marketing strategies, and strong visual identity. We bring ideas to life, build emotional connections, and create impactful campaigns. Every step we design delivers authentic and memorable brand newsroom.";

export const ABOUT_JOURNEYS = [
  {
    title: "Creative Journey",
    sub: "From mood boards to prototypes – we make ideas tangible",
    image: "/images/creative.png",
  },
  {
    title: "Marketing Journey",
    sub: "Omnichannel campaigns that blend storytelling and ROI",
    image: "/images/lab.png",
  },
  {
    title: "Branding Journey",
    sub: "Building emotional connections through logos, voice, and visual ecosystems",
    image: "/images/studio.png",
  },
] as const;
