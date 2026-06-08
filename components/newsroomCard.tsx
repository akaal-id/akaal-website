import type { NewsroomListItem } from "@/content/newsroom";
import styles from "./newsroomCard.module.css";

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

type NewsroomCardProps = {
  item: NewsroomListItem;
  isWide?: boolean;
};

export default function NewsroomCard({ item, isWide = false }: NewsroomCardProps) {
  return (
    <a
      href={item.href}
      className={`${styles.card} ${isWide ? styles.cardWide : ""}`}
      role="listitem"
      data-newsroom-card=""
    >
      <div className={styles.cardMediaWrap}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.cardImage}
          src={item.image}
          alt={item.headerText}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      </div>
      <div className={styles.cardContent}>
        <span className={styles.cardMeta}>
          [ {formatDate(item.createdAt)} ] /// {item.category}
        </span>
        <h2 className={styles.cardHeadline}>{item.headerText}</h2>
        <div className={styles.cardAction}>
          <span className={styles.cardActionText}>Read Article</span>
          <span className={styles.cardActionArrow} aria-hidden="true">
            ↗
          </span>
        </div>
      </div>
    </a>
  );
}
