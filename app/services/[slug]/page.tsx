import styles from "./slug.module.css";
import FinaleCta from "@/app/home/finale-cta";
import { creativeData } from "@/content/services/creative";
import { getShowcaseByService } from "@/lib/api/portfolio";
import { toPortofolioItem } from "@/content/portofolio";
import Hero from "./hero/hero";
import Manifesto from "./manifesto/manifesto";
import Capabilities from "./capabilities/capabilities";
import Workflow from "./workflow/workflow";
import Showcase from "./showcase/showcase";

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = creativeData;

  const projects = await getShowcaseByService(slug);
  const showcase = projects.map(toPortofolioItem);

  return (
    <main className={styles.page}>
      <Hero data={data.hero} />
      <Manifesto data={data.manifesto} />
      <Capabilities capabilities={data.capabilities} />
      <Workflow workflow={data.workflow} />
      <Showcase projects={showcase} />
      <FinaleCta />
    </main>
  );
}
