import styles from "./slug.module.css";
import FinaleCta from "@/app/home/finale-cta";
import { creativeData } from "@/content/services/creative";
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

  return (
    <main className={styles.page}>
      <Hero data={data.hero} />
      <Manifesto data={data.manifesto} />
      <Capabilities capabilities={data.capabilities} />
      <Workflow workflow={data.workflow} />
      <Showcase projects={data.showcase} />
      <FinaleCta />
    </main>
  );
}
