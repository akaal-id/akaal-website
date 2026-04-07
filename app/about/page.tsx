import Footer from "@/app/home/footer/footer";
import FinaleCta from "@/app/home/finale-cta";
import homeStyles from "@/app/home/home.module.css";
import Hero from "./hero/hero";
import Pillars from "./pillars/pillars";

export default function AboutPage() {
  return (
    <>
      <main className={homeStyles.pageContent}>
        <Hero />
        <Pillars />
        <FinaleCta />
      </main>
      <Footer />
    </>
  );
}
