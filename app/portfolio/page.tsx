import { getAllProjects } from "@/lib/api/portfolio";
import { toPortofolioItem } from "@/content/portofolio";
import PortfolioGrid from "./portofolio-grid";

export default async function PortfolioPage() {
  const projects = await getAllProjects();
  const items = projects.map(toPortofolioItem);

  return (
    <main>
      <PortfolioGrid projects={items} />
    </main>
  );
}
