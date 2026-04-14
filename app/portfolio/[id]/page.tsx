import Link from "next/link";
import { getProjectById } from "@/lib/api/portfolio";
import type { PortfolioProject } from "@/content/portofolio";
import styles from "./portfolio.module.css";

type CaseSlot = {
  index: number;
  imageUrl: string | null;
  description: string | null;
};

function buildCaseSlots(project: PortfolioProject): CaseSlot[] {
  const slots: CaseSlot[] = [];
  for (let i = 1; i <= 7; i += 1) {
    const imageKey = `image_url_${i}` as keyof PortfolioProject;
    const descKey = `desc_${i}` as keyof PortfolioProject;
    const rawImg = project[imageKey] as string | null;
    const rawDesc = project[descKey] as string | null;
    const imageUrl =
      typeof rawImg === "string" && rawImg.trim() ? rawImg.trim() : null;
    const description =
      typeof rawDesc === "string" && rawDesc.trim() ? rawDesc.trim() : null;
    if (!imageUrl && !description) continue;
    slots.push({ index: i, imageUrl, description });
  }
  return slots;
}

export default async function PortfolioCaseStudyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    return (
      <main className={styles.page}>
        <div className={styles.notFound}>
          <span className={styles.notFoundCode}>404</span>
          <p className={styles.notFoundText}>Project not found</p>
          <Link href="/" className={styles.notFoundLink}>
            Return Home
          </Link>
        </div>
      </main>
    );
  }

  const slots = buildCaseSlots(project);

  return (
    <main className={styles.page}>
      <header className={styles.caseHeader}>
        <p className={styles.caseEyebrow}>[ {project.category} ]</p>
        <h1 className={styles.caseTitle}>{project.title}</h1>
      </header>

      <ul className={styles.caseList}>
        {slots.map((slot) => (
          <li key={slot.index} className={styles.caseListItem}>
            {slot.imageUrl ? (
              <div className={styles.caseImageWrap}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slot.imageUrl}
                  alt={
                    slot.index === 1
                      ? project.title
                      : `${project.title} — frame ${slot.index}`
                  }
                  loading={slot.index === 1 ? "eager" : "lazy"}
                  decoding="async"
                  draggable={false}
                />
              </div>
            ) : null}
            {slot.description ? (
              <div className={styles.caseDescWrap}>
                <p className={styles.caseDescText}>{slot.description}</p>
              </div>
            ) : null}
          </li>
        ))}
      </ul>
    </main>
  );
}
