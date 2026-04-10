import projectStyles from "@/app/home/projects/projects.module.css";
import type { PortofolioItem } from "@/content/portofolio";

type PortofolioCardProps = {
  project: PortofolioItem;
  isHero?: boolean;
};

export default function PortofolioCard({
  project,
  isHero = false,
}: PortofolioCardProps) {
  return (
    <a
      href={project.href}
      className={`${projectStyles.card} ${isHero ? projectStyles.cardHero : ""}`}
      role="listitem"
    >
      <img
        className={projectStyles.cardImage}
        src={project.image}
        alt={project.title}
        loading="lazy"
        draggable={false}
      />

      <div className={projectStyles.panel}>
        <span className={projectStyles.panelCategory}>[ {project.category} ]</span>
        <div className={projectStyles.panelInfo}>
          <h2 className={projectStyles.panelTitle}>{project.title}</h2>
          <span className={projectStyles.panelArrow} aria-hidden="true">
            ↗
          </span>
        </div>
      </div>
    </a>
  );
}
