import { getAllProjects } from "@/lib/api/portfolio";
import { toPortofolioItem } from "@/content/portofolio";
import Hero from "./hero/hero";
import Sponsor from "./sponsor/sponsor";
import About from "./about/about";
import Services from "./services/services";
import Projects from "./projects/projects";
import Newsroom from "./newsroom";
import Marquee from "./marquee";
import FinaleCta from "./finale-cta";
import Footer from "./footer";
import styles from "./home.module.css";

export default async function HomePage() {
  const projects = await getAllProjects();
  const featured = projects.slice(0, 3).map((p, i) => ({
    ...toPortofolioItem(p),
    hero: i === 0,
  }));

  return (
    <>
      <main className={styles.pageContent}>
        <Hero />
        <Sponsor />
        <About />
        <Projects items={featured} />
        <Services />

        <Newsroom />
        <Marquee />
        <FinaleCta />
      </main>
      <Footer />
    </>
  );
}
