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

export default function HomePage() {
  return (
    <>
      <main className={styles.pageContent}>
        <Hero />
        <Sponsor />
        <About />
        <Projects />
        <Services />

        <Newsroom />
        <Marquee />
        <FinaleCta />
      </main>
      <Footer />
    </>
  );
}

