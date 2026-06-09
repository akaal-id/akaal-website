"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUp } from "lucide-react";
import { SITE_DESCRIPTION, SITE_LOGO_NEGATIVE, SITE_LOGO_POSITIVE } from "@/lib/constants/brand";
import { useTheme } from "@/components/theme/theme-provider";
import styles from "./footer.module.css";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Newsroom", href: "/newsroom" },
] as const;

const ECOSYSTEM_LINKS = [
  { label: "AKAAL Creative", href: "/services/creative" },
  { label: "AKAAL Studio", href: "/services/studio" },
  { label: "AKAAL Labs", href: "/services/akaalabs" },
] as const;

const CONNECT_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/akaal.id/", external: true },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/asia-karya-lumina", external: true },
  { label: "WhatsApp", href: "https://wa.me/62817314245", external: true },
  { label: "Email", href: "mailto:admin@akaal.id", external: false },
  { label: "[+62] 817 314 245", href: "tel:+62817314245", external: false },
] as const;

export default function Footer() {
  const pathname = usePathname();
  const { theme } = useTheme();
  const isAdminRoute =
    pathname.startsWith("/admin") || pathname.startsWith("/app/admin");
  const footerLogo =
    theme === "dark" ? SITE_LOGO_NEGATIVE : SITE_LOGO_POSITIVE;

  if (isAdminRoute) return null;

  return (
    <footer className={styles.footer} aria-label="Site footer">
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.grid}>
          {/* Brand column */}
          <div className={styles.column}>
            <Link href="/" className={styles.logoLink} aria-label="Akaal — Home">
              <Image
                src={footerLogo}
                alt="Akaal"
                width={120}
                height={32}
                className={styles.logo}
                priority
              />
            </Link>
            <p className={styles.tagline}>{SITE_DESCRIPTION}</p>
          </div>

          {/* Navigate column */}
          <div className={styles.column}>
            <p className={styles.columnLabel}>Navigate</p>
            <nav className={styles.columnLinks} aria-label="Footer navigation">
              {NAV_LINKS.map((item) => (
                <Link key={item.href} href={item.href} className={styles.navLink}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Ecosystem column */}
          <div className={styles.column}>
            <p className={styles.columnLabel}>Ecosystem</p>
            <div className={styles.columnLinks}>
              {ECOSYSTEM_LINKS.map((item) => (
                <Link key={item.href} href={item.href} className={styles.navLink}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Connect column */}
          <div className={styles.column}>
            <p className={styles.columnLabel}>Connect</p>
            <div className={styles.columnLinks}>
              {CONNECT_LINKS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={styles.socialLink}
                  {...(item.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} Akaal
          </p>

          <button
            type="button"
            className={styles.backToTop}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Back to top
            <ArrowUp className={styles.backArrow} aria-hidden="true" />
          </button>

          <a href="mailto:admin@akaal.id" className={styles.email}>
            admin@akaal.id
          </a>
        </div>
      </div>
    </footer>
  );
}
