import Link from "next/link";
import { getNewsroomContentBySlug } from "@/lib/api/newsroom";
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

  return (
    <main className={styles.page}>
      <article className={styles.article}>
        <p className={styles.meta}>
          {item.category} /// {formatDate(item.created_at)}
        </p>
        <h1 className={styles.title}>{item.header_text}</h1>
        <div className={styles.imageWrap}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.image} alt={item.header_text} />
        </div>
        <section
          className={styles.richText}
          dangerouslySetInnerHTML={{ __html: item.paragraph_text }}
        />
      </article>
    </main>
  );
}
