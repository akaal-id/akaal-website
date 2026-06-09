"use client";

import { usePathname } from "next/navigation";
import AdminNavbar from "@/components/admin-navbar";
import styles from "./admin.module.css";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuth = pathname === "/admin/auth";

  if (isAuth) {
    return (
      <div className={styles.authShell}>
        <div className={styles.gridBg} aria-hidden="true" />
        <div className={styles.authContent}>{children}</div>
      </div>
    );
  }

  return (
    <div className={styles.adminContainer}>
      <div className={styles.gridBg} aria-hidden="true" />
      <AdminNavbar />
      <main className={styles.main}>
        <div className={styles.content}>{children}</div>
      </main>
    </div>
  );
}
