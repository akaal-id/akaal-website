"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowUpRight, LogOut } from "lucide-react";
import { signOutAction } from "@/app/admin/actions";
import { SITE_LOGO_NEGATIVE } from "@/lib/constants/brand";
import styles from "./admin-navbar.module.css";

const ADMIN_LINKS = [
  { label: "Portfolio", href: "/admin/portofolio" },
  { label: "Newsroom", href: "/admin/newsroom" },
] as const;

export default function AdminNavbar() {
  const pathname = usePathname();

  return (
    <header className={styles.navbar}>
      <div className={styles.inner}>
        <Link href="/admin/portofolio" className={styles.logoLink} aria-label="Admin home">
          <Image
            src={SITE_LOGO_NEGATIVE}
            alt="Akaal"
            width={108}
            height={28}
            className={styles.logo}
            priority
          />
        </Link>

        <nav className={styles.navLinks} aria-label="Admin navigation">
          {ADMIN_LINKS.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className={styles.spacer} aria-hidden />

        <div className={styles.actions}>
          <Link href="/" className={styles.viewSiteLink}>
            <span>View Site</span>
            <ArrowUpRight className={styles.iconSm} aria-hidden />
          </Link>
          <form action={signOutAction}>
            <button type="submit" className={styles.signOutBtn}>
              <LogOut className={styles.iconSm} aria-hidden />
              <span>Sign Out</span>
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
