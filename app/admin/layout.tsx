import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signOutAction } from "@/app/admin/actions";
import styles from "./admin.module.css";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.adminContainer}>
      <header className={styles.topbar}>
        <p className={styles.brand}>Akaal Admin CMS</p>
        <nav className={styles.nav}>
          <Link className={`${styles.link} ${styles.linkActive}`} href="/admin/portofolio">
            Portfolio
          </Link>
          <form action={signOutAction}>
            <Button type="submit" variant="outline">
              Sign Out
            </Button>
          </form>
        </nav>
      </header>
      <section className={styles.content}>{children}</section>
    </div>
  );
}
