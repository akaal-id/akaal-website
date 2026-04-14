import Link from "next/link";
import Footer from "@/app/home/footer/footer";
import { getAllNewsroomContent } from "@/lib/api/newsroom";
import { toNewsroomListItem } from "@/content/newsroom";
import styles from "./newsroom.module.css";

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default async function NewsroomPage() {
  const content = await getAllNewsroomContent();
  const items = content.map(toNewsroomListItem);

  return (
    <>
      <main className={styles.page}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>[ newsroom ]</p>
          <h1 className={styles.title}>Newsroom</h1>
        </header>

        <ul className={styles.grid}>
          {items.map((item) => (
            <li key={item.id} className={styles.card}>
              <Link href={`/newsroom/${item.slug}`} className={styles.cardLink}>
                <div className={styles.imageWrap}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.headerText}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className={styles.cardBody}>
                  <p className={styles.meta}>
                    {item.category} /// {formatDate(item.createdAt)}
                  </p>
                  <h2 className={styles.cardTitle}>{item.headerText}</h2>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
}
