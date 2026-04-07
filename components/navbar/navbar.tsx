"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Plus,
  ArrowUpRight,
  ArrowRight,
  MessageCircle,
  Mail,
} from "lucide-react";
import styles from "./navbar.module.css";

function getActivePageName(pathname: string): string {
  if (pathname === "/") return "Home";
  const segment = pathname.split("/").filter(Boolean).at(-1) ?? "";
  return segment
    .split("-")
    .filter(Boolean)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default function Navbar() {
  const pathname = usePathname();
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [ecosystemOpen, setEcosystemOpen] = useState(false);
  const activePageName = getActivePageName(pathname);

  useEffect(() => {
    setMenuOpen(false);
    setEcosystemOpen(false);
  }, [pathname]);

  return (
    <motion.header 
      className={styles.navbar}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.logoContainer}>
        <Image 
          src="/images/logo-fullcolor-negative-rgb copy.png" 
          alt="Akaal Logo" 
          width={120}
          height={32}
          className={`${styles.logoImage} ${styles.logoShadow}`}
        />
      </div>

      <div className={styles.mainContainer}>
        <div className={styles.mainGroup}>
          <div className={styles.navBlock}>
            <Link href="/" className={styles.homeLink}>
              {activePageName}
            </Link>
            <motion.button
              className={styles.menuButton}
              onClick={() => setMenuOpen(prev => !prev)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Open menu"
            >
              {menuOpen ? <X className={styles.iconSm} /> : <Menu className={styles.iconSm} />}
            </motion.button>
          </div>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <>
              {/* <motion.button
                type="button"
                aria-label="Close menu overlay"
                className={styles.menuOverlay}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              /> */}
              <motion.div
                className={styles.dropdown}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <div className={styles.dropdownMainLinks}>
                  <Link href="/" className={`${styles.dropdownRow} ${styles.dropdownRow}`}>
                    <span>Home</span>
                    <ArrowRight className={`${styles.iconSm} ${styles.rowArrow}`} />
                  </Link>
                  <Link href="/about" className={styles.dropdownRow}>
                    <span>About</span>
                    <ArrowRight className={`${styles.iconSm} ${styles.rowArrow}`} />
                  </Link>
                  <button
                    type="button"
                    className={`${styles.dropdownRow} ${styles.dropdownSplit} ${styles.ecosystemToggle}`}
                    onClick={() => setEcosystemOpen(prev => !prev)}
                  >
                    <span>AKAAL Ecosystem</span>
                    <Plus className={`${styles.iconSm} ${ecosystemOpen ? styles.iconRotated : ""}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {ecosystemOpen && (
                      <motion.div
                        className={styles.submenuWrap}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Link href="/ecosystem/creative" className={`${styles.dropdownRowMuted} ${styles.submenuButton}`}>
                          <span>
                            <span>AKAAL</span>
                            <span className={styles.dropdownRowAccent}> CREATIVE</span>
                          </span>
                          <ArrowRight className={`${styles.iconSm} ${styles.rowArrow}`} />
                        </Link>
                        <Link href="/ecosystem/studio" className={`${styles.dropdownRowMuted} ${styles.submenuButton}`}>
                          <span>
                            <span>AKAAL</span>
                            <span className={styles.dropdownRowAccent}> STUDIO</span>
                          </span>
                          <ArrowRight className={`${styles.iconSm} ${styles.rowArrow}`} />
                        </Link>
                        <Link href="/ecosystem/tech" className={`${styles.dropdownRowMuted} ${styles.submenuButton}`}>
                          <span>
                            <span>AKAAL</span>
                            <span className={styles.dropdownRowAccent}> TECH</span>
                          </span>
                          <ArrowRight className={`${styles.iconSm} ${styles.rowArrow}`} />
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className={styles.dropdownMeta}>
                  <div className={styles.dropdownMetaCol}>
                    <Link href="/stories" className={styles.dropdownMetaItem}>News</Link>
                    <Link href="/work" className={styles.dropdownMetaItem}>Portofolio</Link>
                  </div>
                  <div className={styles.dropdownMetaCol}>
                    <a href="tel:+62817314245" className={styles.dropdownMetaItem}>[+62] 817 314 245</a>
                    <a href="mailto:admin@akaal.id" className={styles.dropdownMetaItem}>admin@akaal.id</a>
                  </div>
                </div>

                <button
                  className={styles.dropdownStart}
                  onClick={() => setContactModalOpen(true)}
                >
                  <span>Start Now</span>
                  <ArrowUpRight className={`${styles.iconSm} ${styles.dropdownStartIcon}`} />
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
      <div className={styles.startButtonContainer}>
        <motion.button
          className={styles.startButton}
          onClick={() => setContactModalOpen(true)}
          whileTap={{ scale: 0.98 }}
        >
          <span>Start Now</span>
          <ArrowUpRight className={`${styles.iconSm} ${styles.dropdownStartIcon}`} />
        </motion.button>
      </div>
      {/* Contact Modal */}
      <AnimatePresence>
        {contactModalOpen && (
          <motion.div 
            className={styles.contactModalOverlay}
            onClick={() => setContactModalOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className={styles.contactModalCard}
              onClick={e => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <button 
                className={styles.contactModalCloseButton} 
                onClick={() => setContactModalOpen(false)} 
                aria-label="Close"
              >
                <X className={styles.iconCloseSm} />
              </button>
              <h2 className={styles.contactModalTitle}>Contact Us</h2>
              <p className={styles.contactModalSubtitle}>
                Get in touch with our team for your next project
              </p>
              <div className={styles.contactModalButtonsWrap}>
                <a
                  href="https://wa.me/6285117326065"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactModalButtonPrimary}
                >
                  <MessageCircle className={styles.contactModalButtonIcon} />
                  WhatsApp Us Now
                </a>
                <a
                  href="mailto:admin@akaal.id"
                  className={styles.contactModalButtonSecondary}
                >
                  <Mail className={styles.contactModalButtonIcon} />
                  Email Us Now
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
