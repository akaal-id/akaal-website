import Footer from "@/app/home/footer/footer";
import { getAllProjects } from "@/lib/api/portfolio";
import { toPortofolioItem } from "@/content/portofolio";
import PortfolioGrid from "./portfolio-grid";

export default async function PortofolioPage() {
  const projects = await getAllProjects();
  const items = projects.map(toPortofolioItem);

  return (
    <>
      <main>
        <PortfolioGrid projects={items} />
      </main>
      <Footer />
    </>
  );
}
