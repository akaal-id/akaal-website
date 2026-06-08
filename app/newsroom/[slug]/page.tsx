import type { Metadata } from "next";
import Link from "next/link";
import {
  getAllNewsroomContent,
  getNewsroomContentBySlug,
} from "@/lib/api/newsroom";
import { toNewsroomListItem } from "@/content/newsroom";
import NewsroomCard from "@/components/newsroomCard";
import ShareBar from "@/components/share-bar";
import { absoluteUrl } from "@/lib/utils/site-url";
import styles from "./newsroom-detail.module.css";

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function readingTime(html: string): number {
  const words = stripHtml(html).split(" ").filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await getNewsroomContentBySlug(slug);

  if (!item) {
    return { title: "Article not found | Newsroom" };
  }

  return {
    title: `${item.header_text} | Newsroom`,
    description: stripHtml(item.paragraph_text).slice(0, 160),
  };
}

export default async function NewsroomSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getNewsroomContentBySlug(slug);

  if (!item) {
    return (
      <main className={styles.page}>
        <div className={styles.gridBg} aria-hidden="true" />
        <div className={styles.notFound}>
          <span className={styles.notFoundCode}>404</span>
          <p className={styles.notFoundText}>Newsroom content not found</p>
          <Link href="/newsroom" className={styles.notFoundLink}>
            Back to Newsroom
          </Link>
        </div>
      </main>
    );
  }

  const allContent = await getAllNewsroomContent();
  const related = allContent
    .filter((entry) => entry.slug !== item.slug)
    .slice(0, 2)
    .map(toNewsroomListItem);

  const minutes = readingTime(item.paragraph_text);
  const articleUrl = await absoluteUrl(`/newsroom/${item.slug}`);

  return (
    <main className={styles.page}>
      <div className={styles.gridBg} aria-hidden="true" />

      <article className={styles.article}>
        <Link href="/newsroom" className={styles.backLink}>
          <span aria-hidden="true">←</span> Newsroom
        </Link>

        <header className={styles.header}>
          <div className={styles.metaGlass}>
            <span className={styles.category}>{item.category}</span>
            <span className={styles.metaDot} aria-hidden="true" />
            <time>{formatDate(item.created_at)}</time>
            <span className={styles.metaDot} aria-hidden="true" />
            <span>{minutes} min read</span>
          </div>
          <h1 className={styles.title}>{item.header_text}</h1>
        </header>

        {item.image ? (
          <figure className={styles.imageWrap}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.image} alt={item.header_text} />
          </figure>
        ) : null}

        <div className={styles.bodyGlass}>
          <div
            className={styles.richText}
            dangerouslySetInnerHTML={{ __html: item.paragraph_text }}
          />
        </div>

        <ShareBar url={articleUrl} title={item.header_text} />

        <footer className={styles.footer}>
          <Link href="/newsroom" className={styles.footerLink}>
            <span aria-hidden="true">←</span> Back to all articles
          </Link>
        </footer>
      </article>

      {related.length > 0 ? (
        <section className={styles.related} aria-label="More from the newsroom">
          <span className={styles.relatedLabel}>[newsroom]</span>
          <h2 className={styles.relatedTitle}>More articles</h2>
          <div className={styles.relatedGrid} role="list">
            {related.map((entry) => (
              <NewsroomCard key={entry.id} item={entry} />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
