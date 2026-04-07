import Image from "next/image";
import {
  ABOUT_MISSION_ITEMS,
  ABOUT_MISSION_LEAD,
  ABOUT_MISSION_PILL,
  ABOUT_VISION_PILL,
  ABOUT_VISION_TEXT,
  VISION_BG_IMAGE,
} from "@/content/about";
import styles from "./vision-mission.module.css";

export default function VisionMission() {
  return (
    <section className={styles.section} aria-label="Vision and mission">
      <div className={styles.inner}>
        <header className={styles.visionBlock}>
          <p className={styles.labelVision}>{ABOUT_VISION_PILL}</p>
          <div className={styles.pullquoteWrap}>
            <div className={styles.pullquoteGlow} aria-hidden />
            <blockquote className={styles.pullquote}>
              <p>{ABOUT_VISION_TEXT}</p>
            </blockquote>
          </div>
        </header>

        <div className={styles.bleedBand} aria-hidden>
          <Image
            src={VISION_BG_IMAGE}
            alt=""
            fill
            sizes="100vw"
            className={styles.bandImage}
          />
          <div className={styles.bandScrim} />
        </div>

        <div className={styles.missionBlock}>
          <div className={styles.missionHeader}>
            <p className={styles.labelMission}>{ABOUT_MISSION_PILL}</p>
            <p className={styles.missionLead}>{ABOUT_MISSION_LEAD}</p>
          </div>
          <ol className={styles.missionList}>
            {ABOUT_MISSION_ITEMS.map((item, index) => (
              <li key={item.title} className={styles.missionRow}>
                <span className={styles.missionNum} aria-hidden>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className={styles.missionCopy}>
                  <h3 className={styles.missionTitle}>{item.title}</h3>
                  <p className={styles.missionSub}>{item.sub}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
