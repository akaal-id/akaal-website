import Image from "next/image";
import { Button } from "@/components/ui/button";
import { signOutAction } from "@/app/admin/actions";
import AdminSidebar from "./admin-sidebar";
import styles from "./admin.module.css";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.adminContainer}>
      <aside className={styles.sidebar}>
        
          <div className={styles.brand}>
            <Image
              className={styles.brandLogo}
              src="/images/logo-fullcolor-negative-rgb copy.png"
              alt="Akaal"
              width={140}
              height={36}
              priority
            />
          </div>
          <AdminSidebar />
        
        <div className={styles.sidebarFooter}>
          <form action={signOutAction}>
            <Button className={styles.signOutButton} type="submit" variant="outline">
              Sign Out
            </Button>
          </form>
        </div>
      </aside>
      <section className={styles.main}>
        <header className={styles.mobileHeader}>
          <Image
            className={styles.mobileLogo}
            src="/images/logo-fullcolor-negative-rgb copy.png"
            alt="Akaal"
            width={116}
            height={30}
          />
        </header>
        <div className={styles.content}>{children}</div>
      </section>
    </div>
  );
}
