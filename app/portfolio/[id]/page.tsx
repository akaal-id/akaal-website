import Link from "next/link";
import { getProjectById } from "@/lib/api/portfolio";
import type { PortfolioProject } from "@/content/portofolio";
import styles from "./portfolio.module.css";

const GALLERY_LAYOUT: Record<number, string> = {
  2: styles.alignLeft,
  3: styles.fullBleed,
  4: styles.alignRight,
  5: styles.fullBleed,
  6: styles.alignLeft,
  7: styles.alignRight,
};

function GalleryBlock({
  index,
  project,
}: {
  index: number;
  project: PortfolioProject;
}) {
  const imageKey = `image_url_${index}` as keyof PortfolioProject;
  const descKey = `desc_${index}` as keyof PortfolioProject;
  const imageUrl = project[imageKey] as string | null;
  const description = project[descKey] as string | null;

  if (!imageUrl) return null;

  return (
    <div className={`${styles.galleryBlock} ${GALLERY_LAYOUT[index] ?? styles.fullBleed}`}>
      <img
        className={styles.galleryImage}
        src={imageUrl}
        alt={`${project.title} — detail ${index - 1}`}
        loading="lazy"
        draggable={false}
      />
      {description && (
        <p className={styles.galleryCaption}>{description}</p>
      )}
    </div>
  );
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

  const galleryIndices = [2, 3, 4, 5, 6, 7] as const;

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <img
          className={styles.heroImage}
          src={project.image_url_1}
          alt={project.title}
          draggable={false}
        />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.heroCategory}>[ {project.category} ]</span>
          <h1 className={styles.heroTitle}>{project.title}</h1>
        </div>
      </section>

      <section className={styles.brief}>
        <div className={styles.briefInner}>
          <span className={styles.briefLabel}>[ The Brief ]</span>
          <p className={styles.briefText}>{project.desc_1}</p>
          <hr className={styles.briefDivider} />
        </div>
      </section>

      <section className={styles.gallery}>
        {galleryIndices.map((i) => (
          <GalleryBlock key={i} index={i} project={project} />
        ))}
      </section>
    </main>
  );
}
