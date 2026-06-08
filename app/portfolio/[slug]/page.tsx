import Link from "next/link";
import { redirect } from "next/navigation";
import PortofolioCard from "@/components/portofolioCard";
import { toPortofolioItem } from "@/content/portofolio";
import {
  getAllProjects,
  getProjectById,
  getProjectBySlug,
} from "@/lib/api/portfolio";
import type { PortfolioProject } from "@/content/portofolio";
import { isUuid, toSlug } from "@/lib/utils/slug";
import projectStyles from "@/app/home/projects/projects.module.css";
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
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let project = await getProjectBySlug(slug);

  if (!project && isUuid(slug)) {
    const legacyProject = await getProjectById(slug);
    if (legacyProject) {
      redirect(`/portfolio/${toSlug(legacyProject.title)}`);
    }
  }

  if (!project) {
    return (
      <main className={styles.page}>
        <div className={styles.gridBg} aria-hidden="true" />
        <div className={styles.pageContent}>
          <div className={styles.notFound}>
            <span className={styles.notFoundCode}>404</span>
            <p className={styles.notFoundText}>Project not found</p>
            <Link href="/" className={styles.notFoundLink}>
              Return Home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const slots = buildCaseSlots(project);
  const allProjects = await getAllProjects();
  const otherPortfolios = allProjects
    .filter((entry) => entry.id !== project.id)
    .slice(0, 3)
    .map(toPortofolioItem);

  return (
    <main className={styles.page}>
      <div className={styles.gridBg} aria-hidden="true" />
      <div className={styles.pageContent}>
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
      </div>

      {otherPortfolios.length > 0 ? (
        <section
          className={styles.otherPortfolios}
          aria-label="Other portfolios"
        >
          <span className={styles.otherLabel}>[portofolio]</span>
          <h2 className={styles.otherTitle}>Other portfolios</h2>
          <div className={projectStyles.grid} role="list">
            {otherPortfolios.map((entry, index) => (
              <PortofolioCard
                key={entry.id}
                project={entry}
                isHero={index === 0}
              />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
