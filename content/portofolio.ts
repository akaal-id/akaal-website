// ---------------------------------------------------------------------------
// Portfolio types & adapters (client-safe — no server imports)
// ---------------------------------------------------------------------------

export type PortofolioCategory = "creative" | "labs" | "studio";

export type PortofolioItem = {
  id: string;
  title: string;
  category: PortofolioCategory;
  image: string;
  href: string;
};

export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  service_slug: string;
  image_url_1: string;
  desc_1: string;
  image_url_2: string | null;
  desc_2: string | null;
  image_url_3: string | null;
  desc_3: string | null;
  image_url_4: string | null;
  desc_4: string | null;
  image_url_5: string | null;
  desc_5: string | null;
  image_url_6: string | null;
  desc_6: string | null;
  image_url_7: string | null;
  desc_7: string | null;
  created_at: string;
}

export function toPortofolioItem(project: PortfolioProject): PortofolioItem {
  return {
    id: project.id,
    title: project.title,
    category: project.category as PortofolioCategory,
    image: project.image_url_1,
    href: `/portfolio/${project.id}`,
  };
}
