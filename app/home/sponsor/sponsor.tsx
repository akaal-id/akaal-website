import styles from "./sponsor.module.css";

const LOGO_SRC = "/images/frame-64.png";
const LOGO_ALT = "Sponsor logo";
const LOGO_COUNT = 10;

const logos = Array.from({ length: LOGO_COUNT }, (_, index) => ({
  id: `logo-${index}`,
  src: LOGO_SRC,
}));

export default function Sponsor() {
  const marqueeItems = [...logos, ...logos];

  return (
    <section className={styles.mainContainer} aria-label="Sponsors">
      <div className={styles.marquee}>
        <div className={styles.track}>
          {marqueeItems.map((logo, index) => (
            <img
              key={`${logo.id}-${index}`}
              src={logo.src}
              alt={LOGO_ALT}
              className={styles.logo}
              draggable={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
