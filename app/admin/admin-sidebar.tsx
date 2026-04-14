"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./admin.module.css";

const ADMIN_MENU = [{ label: "Portfolio", href: "/admin/portofolio" }];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <nav className={styles.sidebarNav} aria-label="Admin navigation">
      {ADMIN_MENU.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`${styles.sidebarLink} ${isActive ? styles.sidebarLinkActive : ""}`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
