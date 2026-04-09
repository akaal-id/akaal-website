import Footer from "@/app/home/footer/footer";
import FinaleCta from "@/app/home/finale-cta";
import homeStyles from "@/app/home/home.module.css";
import Hero from "./hero/hero";
import Handle from "./handle/handle";
import Pillars from "./pillars/pillars";
import Services from "../home/services/services";

import VisionMission from "./vision-mission/vision-mission";

export default function AboutPage() {
  return (
    <>
      <main className={homeStyles.pageContent}>
        <Hero />
        <Pillars />
        <VisionMission />
        <Services />
        <Handle />
        
        <FinaleCta />
      </main>
      <Footer />
    </>
  );
}
