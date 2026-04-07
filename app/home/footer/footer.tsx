import Image from "next/image";
import Link from "next/link";
import styles from "./footer.module.css";

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/akaal.id/",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/asia-karya-lumina",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/62817314245",
  },
  {
    label: "Email",
    href: "mailto:admin@akaal.id",
  },
] as const;

export default function Footer() {
  return (
    <footer className={styles.footer} aria-label="Site footer">
      <div className={styles.footerTop}>
        <div className={styles.footerBrand}>
          <Link
            href="/"
            className={styles.brandLogoLink}
            aria-label="Akaal — Home"
          >
            <Image
              src="/images/logo-fullcolor-negative-rgb copy.png"
              alt=""
              width={120}
              height={32}
              className={styles.footerLogo}
            />
          </Link>
        </div>
        <nav className={styles.footerSocial} aria-label="Contact links">
          <ul className={styles.socialList}>
            {SOCIALS.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className={styles.socialLink}
                  {...(item.href.startsWith("mailto:")
                    ? {}
                    : { target: "_blank", rel: "noopener noreferrer" })}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className={styles.footerMid} aria-hidden="true">
        <div className={styles.footerGlow} />
      </div>

      <div className={styles.footerBottom}>
        <p className={styles.copyright}>
          © 2026 Akaal. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
